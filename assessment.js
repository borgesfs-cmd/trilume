(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./engine.js'),require('./support.js'));else root.TrilumeAssessment=factory(root.TrilumeEngine,root.TrilumeSupport);})(typeof window!=='undefined'?window:this,function(E,H){
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
if(questions.some(q=>E.needsMaterial(q.a))&&!input.materialReady)throw Error('Prepare os textos, dados ou materiais citados nas questões e confirme que estão disponíveis ao estudante.');
const selectedContent=new Set();for(const {s,a} of questions){const k=key(s.id,E.contentKey(a));if(!s.repertoireDomain&&selectedContent.has(k))throw Error('Duas questões repetem o mesmo enunciado nesta habilidade. Escolha apenas uma forma de apresentação.');selectedContent.add(k);}
const observed=E.observedItems(state,student.id),repeated=(s,a)=>observed.some(r=>r.skillId===s.id&&(r.activityId===a.id&&r.itemVersion===a.version||r.prompt&&E.contentKey(r)===E.contentKey(a)));
return {id:E.uid(),studentId:student.id,studentYear:student.year,status:'active',createdAt:new Date().toISOString(),educator:String(input.educator).trim(),conditions:String(input.conditions||'').trim(),instructions:String(input.instructions||'Leia uma questão de cada vez. Você pode fazer uma pausa.').trim(),cursor:0,paused:false,responses:[],slots:questions.map(({s,a})=>({id:E.uid(),skillId:s.id,skillTitle:s.title,skillVersion:s.version,readingTarget:readingTarget(s,a),activity:E.copy(a),repeated:repeated(s,a)}))};
}
function record(base,slotId,input){
if(base.status!=='active'||base.paused)throw Error('Retome a avaliação antes de registrar uma resposta.');
const slot=base.slots.find(s=>s.id===slotId);if(!slot)throw Error('Questão não encontrada nesta avaliação.');
if(base.responses.some(r=>r.slotId===slot.id))throw Error('Esta resposta já foi registrada.');
const a=slot.activity,observed=a.type==='human'?H.observation(input.observation):null,answer=observed?observed.answer:String(input.answer??'').trim(),helped=Boolean(input.helped||slot.helped||observed?.helped),notAssessed=Boolean(input.notAssessed||observed?.outcome==='not_assessed');
if(!notAssessed&&a.audioRequired&&!slot.audioDelivered&&!input.audioPresented)throw Error('Apresente o áudio ou confirme a apresentação oral antes de registrar.');if(input.audioPresented){slot.audioDelivered=true;slot.audioMode='tutor';}
if(!notAssessed&&!answer)throw Error('Escolha ou registre sua resposta antes de continuar.');
if(!notAssessed&&a.type==='choice'&&(!/^(0|[1-9][0-9]*)$/.test(answer)||!a.options?.[Number(answer)]))throw Error('Escolha uma das alternativas apresentadas.');
const outcome=notAssessed?'not_assessed':a.type==='human'?'pending':E.score(answer,a.answer,helped);
const response={id:E.uid(),slotId:slot.id,skillId:slot.skillId,skillTitle:slot.skillTitle,skillVersion:slot.skillVersion,activityId:a.id,itemVersion:a.version,type:a.type,prompt:a.prompt,options:a.options?E.copy(a.options):undefined,answer:notAssessed?'':answer,outcome,helped,observationCode:observed?input.observation:undefined,stimulusKey:a.stimulusKey,recognitionOnly:Boolean(a.recognitionOnly),learnerPrompt:a.learnerPrompt,educator:base.educator,access:String(input.access||base.conditions||'').trim(),note:String(input.note||(observed?input.answer:'')||'').trim(),repeated:Boolean(slot.repeated),at:new Date().toISOString()};
base.responses.push(response);return response;
}
function complete(base){
if(base.status==='completed')return base;
for(const slot of base.slots)if(!base.responses.some(r=>r.slotId===slot.id))base.responses.push({id:E.uid(),slotId:slot.id,skillId:slot.skillId,skillTitle:slot.skillTitle,skillVersion:slot.skillVersion,activityId:slot.activity.id,itemVersion:slot.activity.version,type:slot.activity.type,prompt:slot.activity.prompt,options:slot.activity.options?E.copy(slot.activity.options):undefined,answer:'',outcome:'not_assessed',helped:false,at:new Date().toISOString(),educator:base.educator,access:base.conditions||'',note:'Avaliação encerrada antes da realização desta questão.'});
base.status='completed';base.paused=false;base.endedAt=new Date().toISOString();return base;
}
function review(base,responseId,input){if(base.status!=='completed')throw Error('Encerre a aplicação antes de analisar as respostas.');const r=base.responses.find(r=>r.id===responseId);if(!r)throw Error('Resposta não encontrada.');return E.reviewResponse(r,input);}
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function fields(activity,value='',required=true,observer=false,removed=[]){
if(activity.type==='choice')return '<fieldset class="answer-options '+(activity.presentation==='visual'?'picture-options':'')+'"><legend>Escolha uma resposta</legend>'+activity.options.map((option,i)=>removed.includes(i)?'<div class="answer-eliminated">Alternativa '+String.fromCharCode(65+i)+' retirada com apoio</div>':'<label class="answer-option"><input type="radio" name="answer" value="'+i+'" '+(String(value)===String(i)?'checked ':'')+(required?'required':'')+'><span class="option-letter" aria-hidden="true">'+String.fromCharCode(65+i)+'</span><span>'+(activity.visualKind==='size'?'<svg class="size-stimulus" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="'+(option==='Grande'?34:13)+'" fill="#5947c5"/></svg><span class="sr-only">'+esc(option)+'</span>':esc(option))+'</span></label>').join('')+'</fieldset>';
if(activity.type==='human')return '<details class="adult-record"><summary>Tutor: registrar por toque</summary><p>Observe o que a criança fez. O registro descreve a ação; não é uma escolha feita pela criança.</p><fieldset class="answer-options"><legend>O que você observou?</legend>'+[['alone','Realizou sem pista'],['help','Realizou com ajuda'],['not_yet','Ainda não demonstrou nesta situação'],['not_observed','Não foi possível observar']].map(([code,label])=>'<label class="answer-option"><input type="radio" name="observation" value="'+code+'"><span>'+label+'</span></label>').join('')+'</fieldset><label>Detalhe opcional<textarea name="answer" rows="2" maxlength="5000">'+esc(value)+'</textarea></label></details>';
return '<label>Sua resposta<textarea name="answer" rows="4" maxlength="5000" '+(required?'required':'')+'>'+esc(value)+'</textarea></label>';
}
function material(a){
if(a?.audioRequired)return '<p class="notice">Ouça as duas palavras. O tutor pode apresentá-las oralmente.</p>';
if(a?.visualKind==='position'){const v=a.positionIndex;return '<svg class="position-stimulus" viewBox="0 0 230 200" role="img" aria-label="Bolinha e quadrado para observar a posição"><rect x="85" y="80" width="60" height="60" fill="none" stroke="#35445e" stroke-width="4"/><circle cx="'+(v===2?185:115)+'" cy="'+(v===0?35:v===1?175:110)+'" r="16" fill="#5947c5"/></svg>';}
return a?.studentMaterial?'<section class="student-material"><h3>Olhe aqui</h3>'+esc(a.studentMaterial)+'</section>':'';
}
return {key,text,readingTarget,create,record,complete,review,fields,material,observerInput:H.observation};
});
