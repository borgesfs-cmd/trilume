(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./engine.js'));else root.TrilumeAssessment=factory(root.TrilumeEngine);})(typeof window!=='undefined'?window:this,function(E){
'use strict';
const validOutcomes=['independent','assisted','incorrect','not_assessed','pending'];
const key=(skillId,activityId)=>JSON.stringify([skillId,activityId]);
const readingTarget=(skill,activity)=>Boolean(skill.readingTarget||activity.readingTarget);
function text(response){
if(response.type==='choice'||Array.isArray(response.options)){
const option=response.options?.[Number(response.answer)];
return response.answer!==''&&option!==undefined?option:response.answer||'Sem resposta registrada.';
}
return response.answer||'Sem resposta registrada.';
}
function create(state,student,catalog,keys,input){
if(!student)throw Error('Escolha um estudante antes de preparar a avaliação.');
if(state.baselines.some(b=>b.studentId===student.id&&b.status==='active'))throw Error('Retome ou encerre a avaliação em andamento.');
const selected=[...new Set(keys)];
if(!selected.length||selected.length>24)throw Error('Escolha de 1 a 24 questões para uma aplicação breve.');
if(!String(input.educator||'').trim())throw Error('Informe o tutor responsável pela avaliação.');
const lookup=new Map(catalog.flatMap(s=>s.activities.filter(a=>a.phase==='baseline').map(a=>[key(s.id,a.id),{s,a}])));
const questions=selected.map(k=>{const q=lookup.get(k);if(!q)throw Error('Questão de avaliação não encontrada. Atualize o planejamento.');return q;});
if(new Set(questions.map(q=>q.s.id)).size>6)throw Error('Selecione até seis habilidades nesta aplicação.');
const seen=new Set([
...state.baselines.filter(b=>b.studentId===student.id).flatMap(b=>b.slots.filter(slot=>b.responses.some(r=>r.slotId===slot.id&&r.outcome!=='not_assessed')).map(slot=>key(slot.skillId,slot.activity.id)+'@'+slot.activity.version)),
...state.responses.filter(r=>r.studentId===student.id).map(r=>key(r.skillId,r.activityId)+'@'+r.itemVersion)
]);
return {id:E.uid(),studentId:student.id,studentYear:student.year,status:'active',createdAt:new Date().toISOString(),educator:String(input.educator).trim(),conditions:String(input.conditions||'').trim(),instructions:String(input.instructions||'Leia uma questão de cada vez. Você pode fazer uma pausa.').trim(),cursor:0,paused:false,responses:[],slots:questions.map(({s,a})=>({id:E.uid(),skillId:s.id,skillTitle:s.title,skillVersion:s.version,readingTarget:readingTarget(s,a),activity:E.copy(a),repeated:seen.has(key(s.id,a.id)+'@'+a.version)}))};
}
function record(base,slotId,input){
if(base.status!=='active'||base.paused)throw Error('Retome a avaliação antes de registrar uma resposta.');
const slot=base.slots.find(s=>s.id===slotId);if(!slot)throw Error('Questão não encontrada nesta avaliação.');
if(base.responses.some(r=>r.slotId===slot.id))throw Error('Esta resposta já foi registrada.');
const a=slot.activity,answer=String(input.answer??'').trim(),helped=Boolean(input.helped||slot.helped),notAssessed=Boolean(input.notAssessed);
if(!notAssessed&&!answer)throw Error('Escolha ou registre sua resposta antes de continuar.');
if(!notAssessed&&a.type==='choice'&&(!/^\d+$/.test(answer)||!a.options?.[Number(answer)]))throw Error('Escolha uma das alternativas apresentadas.');
const outcome=notAssessed?'not_assessed':a.type==='human'?'pending':E.score(answer,a.answer,helped);
const response={id:E.uid(),slotId:slot.id,skillId:slot.skillId,skillTitle:slot.skillTitle,skillVersion:slot.skillVersion,activityId:a.id,itemVersion:a.version,type:a.type,prompt:a.prompt,options:a.options?E.copy(a.options):undefined,answer,outcome,helped,educator:base.educator,access:String(input.access||base.conditions||'').trim(),note:String(input.note||'').trim(),repeated:Boolean(slot.repeated),at:new Date().toISOString()};
base.responses.push(response);return response;
}
function complete(base){
if(base.status==='completed')return base;
for(const slot of base.slots)if(!base.responses.some(r=>r.slotId===slot.id))base.responses.push({id:E.uid(),slotId:slot.id,skillId:slot.skillId,skillTitle:slot.skillTitle,skillVersion:slot.skillVersion,activityId:slot.activity.id,itemVersion:slot.activity.version,type:slot.activity.type,prompt:slot.activity.prompt,options:slot.activity.options?E.copy(slot.activity.options):undefined,answer:'',outcome:'not_assessed',helped:false,at:new Date().toISOString(),educator:base.educator,access:base.conditions||'',note:'Avaliação encerrada antes da realização desta questão.'});
base.status='completed';base.paused=false;base.endedAt=new Date().toISOString();return base;
}
function review(base,responseId,input){
if(base.status!=='completed')throw Error('Encerre a aplicação antes de analisar as respostas.');
const r=base.responses.find(r=>r.id===responseId);if(!r)throw Error('Resposta não encontrada.');
if(!validOutcomes.includes(input.outcome)||input.outcome==='pending')throw Error('Escolha o resultado observado.');
if(!String(input.educator||'').trim()||!String(input.note||'').trim())throw Error('Informe o tutor e a justificativa da análise.');
if(!r.answer&&input.outcome!=='not_assessed')throw Error('Sem resposta registrada, esta questão permanece não aferida. Prepare outra aplicação.');
const old={outcome:r.outcome,helped:Boolean(r.helped),access:r.access||'',note:r.note||''};
r.helped=Boolean(r.helped||input.helped);
r.outcome=input.outcome==='independent'&&r.helped?'assisted':input.outcome;
r.access=String(input.access||r.access||'').trim();
r.review={educator:String(input.educator).trim(),note:String(input.note).trim(),at:new Date().toISOString(),previousOutcome:old.outcome};
r.reviews=[...(r.reviews||[]),{...r.review,previous:old}];
return r;
}
function fields(activity,value='',required=true){
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
if(activity.type==='choice')return '<fieldset class="answer-options"><legend>Escolha uma resposta</legend>'+activity.options.map((option,i)=>'<label class="answer-option"><input type="radio" name="answer" value="'+i+'" '+(String(value)===String(i)?'checked ':'')+(required?'required':'')+'><span class="option-letter" aria-hidden="true">'+String.fromCharCode(65+i)+'</span><span>'+esc(option)+'</span></label>').join('')+'</fieldset>';
return '<label>Sua resposta<textarea name="answer" rows="4" maxlength="5000" '+(required?'required':'')+' placeholder="Digite sua resposta ou peça ao tutor que registre o que você falou ou fez.">'+esc(value)+'</textarea></label>';
}
return {key,text,readingTarget,create,record,complete,review,fields};
});
