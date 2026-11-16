(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.TrilumeEngine=factory();})(typeof window!=='undefined'?window:this,function(){
'use strict';
const VERSION=1;
const copy=x=>JSON.parse(JSON.stringify(x));
const uid=()=>typeof crypto!=='undefined'&&crypto.randomUUID?crypto.randomUUID():'t-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
const normalize=v=>String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim().replace(/\s+/g,' ').replace(/^[.,;:!?\s]+|[.,;:!?\s]+$/g,'');
const outcomes=['independent','assisted','incorrect','not_assessed','pending'];
const blank=()=>({schemaVersion:VERSION,students:[],baselines:[],plans:[],sessions:[],responses:[],helpEvents:[],events:[],catalogEdits:[],settings:{largeText:false,focus:false,hideNilo:false}});
function score(answer,expected,helped=false){const a=normalize(answer),values=Array.isArray(expected)?expected:[expected];const ok=values.some(x=>normalize(x)===a);return ok?(helped?'assisted':'independent'):'incorrect';}
function validateStudent(input){const errors=[];if(!String(input.name||'').trim())errors.push('Informe um apelido ou código para o estudante.');if(!Number.isInteger(Number(input.year))||Number(input.year)<1||Number(input.year)>12)errors.push('Escolha um ano escolar válido.');return errors;}
function evidence(baseline,skillId){const list=(baseline?.responses||[]).filter(r=>r.skillId===skillId),valid=list.filter(r=>['independent','assisted','incorrect'].includes(r.outcome));return {valid:valid.length,independent:valid.filter(r=>r.outcome==='independent').length,assisted:valid.filter(r=>r.outcome==='assisted').length,incorrect:valid.filter(r=>r.outcome==='incorrect').length,pending:list.filter(r=>r.outcome==='pending').length,notAssessed:list.filter(r=>r.outcome==='not_assessed').length,percent:valid.length?Math.round(valid.filter(r=>r.outcome==='independent').length/valid.length*100):null};}
function latestBaseline(state,studentId){return state.baselines.filter(b=>b.studentId===studentId&&b.status==='completed').slice(-1)[0]||null;}
function hasBaseline(state,studentId){return state.baselines.some(b=>b.studentId===studentId&&b.status==='completed'&&b.responses.some(r=>['independent','assisted','incorrect'].includes(r.outcome)));}
function baselineEvidence(state,studentId,skillId){const bases=state.baselines.filter(b=>b.studentId===studentId&&b.status==='completed').slice().reverse();const b=bases.find(b=>evidence(b,skillId).valid>0)||bases.find(b=>b.slots.some(s=>s.skillId===skillId));return {...evidence(b,skillId),baselineId:b?.id||null};}
function propose(state,student,catalog){
const base=latestBaseline(state,student.id);if(!hasBaseline(state,student.id))throw Error('Conclua a avaliação inicial com ao menos uma observação válida antes de preparar a trilha.');
return catalog.filter(s=>s.lane==='foundation'||s.year===student.year).map(s=>{const e=baselineEvidence(state,student.id,s.id);let action='Avaliar antes de personalizar';if(e.valid){action=e.independent===e.valid?'Verificar em novos exemplos':e.assisted?'Ensinar e reduzir ajuda':'Ensinar com demonstração';}return {skillId:s.id,lane:s.lane,action,evidence:e,eligible:e.valid>0,reason:e.valid?e.independent+' resposta(s) independente(s) em '+e.valid+' oportunidade(s) válida(s).':'Habilidade ainda não aferida; isso não significa dificuldade.'};}).sort((a,b)=>Number(b.eligible)-Number(a.eligible)||(a.evidence.percent??101)-(b.evidence.percent??101));
}
function unused(skill,phase,responses,studentId){const seen=new Set(responses.filter(r=>r.studentId===studentId).map(r=>r.activityId+'@'+r.itemVersion));return skill.activities.find(a=>a.phase===phase&&!seen.has(a.id+'@'+a.version));}
function makePlan(state,student,catalog,input){
if(!hasBaseline(state,student.id))throw Error('A avaliação inicial vem antes da trilha.');
if(!String(input.educator||'').trim())throw Error('Informe o nome do educador que revisou e aprovou o plano.');
const selected=[...new Set(input.skillIds||[])];if(!selected.length||selected.length>2)throw Error('Selecione uma ou duas habilidades para uma sessão breve.');
const base=latestBaseline(state,student.id);let items=[];
for(const skillId of selected){const s=catalog.find(x=>x.id===skillId);if(!s)throw Error('Habilidade não encontrada.');if(!baselineEvidence(state,student.id,skillId).valid)throw Error('Avalie a habilidade '+s.title+' antes de individualizar seu ensino.');
if(input.mode==='maintenance'){const review=unused(s,'maintenance',state.responses,student.id);if(!review)throw Error('Cadastre um novo item de retenção para '+s.title+' na biblioteca. A revisão usa uma tarefa inédita antes de qualquer explicação.');items.push({id:uid(),phase:'maintenance',title:'Ver o que se mantém',skillId:s.id,skillTitle:s.title,skillVersion:s.version,content:s.content,model:s.model,objective:s.objective,readingTarget:Boolean(s.readingTarget),activity:copy(review),status:'open'});continue;}
const verify=unused(s,'practice',state.responses,student.id),transfer=unused(s,'transfer',state.responses,student.id);if(!verify)throw Error('Cadastre um novo item de verificação para '+s.title+'. Os itens já utilizados não comprovam aprendizagem nova.');
const baseline=s.activities.find(a=>a.phase==='baseline');
const stages=[['explain','Entender o objetivo',null],['model','Ver um exemplo',baseline],['guided','Praticar com apoio',baseline],['independent','Tentar com menos ajuda',verify]];
if(transfer)stages.push(['transfer','Aplicar em outra situação',transfer]);
for(const [phase,title,activity]of stages)items.push({id:uid(),phase,title,skillId:s.id,skillTitle:s.title,skillVersion:s.version,content:s.content,model:s.model,objective:s.objective,readingTarget:Boolean(s.readingTarget),activity:activity?copy(activity):null,status:'open'});
}
const minutes=Number(input.minutes);if(!Number.isFinite(minutes)||minutes<5||minutes>120)throw Error('A duração estimada deve ficar entre 5 e 120 minutos.');
return {id:uid(),studentId:student.id,baselineId:base.id,baselineIds:[...new Set(selected.map(id=>baselineEvidence(state,student.id,id).baselineId))],createdAt:new Date().toISOString(),approvedBy:input.educator.trim(),when:String(input.when||'No horário combinado'),location:String(input.location||'Em um lugar confortável e com os materiais necessários'),minutes,skillIds:selected,mode:input.mode||'teaching',items:copy(items),version:1};
}
function startSession(plan){return {id:uid(),planId:plan.id,studentId:plan.studentId,startedAt:new Date().toISOString(),status:'active',items:copy(plan.items),when:plan.when,location:plan.location,minutes:plan.minutes,index:0,paused:false,endedAt:null};}
function finishSession(session){if(session.status==='ended')return copy(session);return {...copy(session),status:'ended',paused:false,endedAt:new Date().toISOString(),completed:session.items.filter(t=>t.status==='done').length,total:session.items.length};}
function mastery(state,studentId,skill){
const valid=state.responses.filter(r=>r.studentId===studentId&&r.skillId===skill.id&&['independent','transfer','maintenance'].includes(r.phase)&&['independent','assisted','incorrect'].includes(r.outcome)).slice().sort((a,b)=>a.at.localeCompare(b.at));
const unique=new Map();for(const r of valid){const key=r.activityId+'@'+r.itemVersion;if(!unique.has(key))unique.set(key,r);}
const all=[...unique.values()],list=all.filter(r=>r.phase!=='maintenance'),c=skill.criterion||{threshold:.8,minTrials:5,minSessions:2,reviewDays:[2,7,21]},sessions=new Set(list.map(r=>r.sessionId));
const independent=list.filter(r=>r.outcome==='independent').length,ratio=list.length?independent/list.length:0,mastered=list.length>=c.minTrials&&sessions.size>=c.minSessions&&ratio>=c.threshold;
let acquiredAt=null;
for(let i=0;i<list.length;i++){const part=list.slice(0,i+1);if(part.length>=c.minTrials&&new Set(part.map(r=>r.sessionId)).size>=c.minSessions&&part.filter(r=>r.outcome==='independent').length/part.length>=c.threshold){acquiredAt=list[i].at;break;}}
const after=acquiredAt?all.filter(r=>r.at>acquiredAt&&r.outcome==='independent'):[];
const contexts=new Set(after.filter(r=>r.phase==='transfer'&&r.context).map(r=>normalize(r.context))),days=new Set(after.filter(r=>r.phase==='maintenance').map(r=>r.at.slice(0,10)));
const reviews=acquiredAt?(c.reviewDays||[2,7,21]).map(day=>({day,dueAt:new Date(new Date(acquiredAt).getTime()+day*86400000).toISOString()})):[];
return {label:mastered?'Critério inicial atingido':list.length?'Em aprendizagem':'Evidência insuficiente',mastered,valid:list.length,independent,assisted:list.filter(r=>r.outcome==='assisted').length,percent:list.length?Math.round(ratio*100):null,sessions:sessions.size,generalized:mastered&&contexts.size>=2,maintained:mastered&&days.size>=2,criterion:c,acquiredAt,reviews};
}
function validateBackup(value){
if(!value||value.schemaVersion!==VERSION)throw Error('Versão de arquivo incompatível.');
for(const key of ['students','baselines','plans','sessions','responses','helpEvents','events','catalogEdits'])if(!Array.isArray(value[key]))throw Error('Arquivo incompleto: '+key+'.');
const ids=new Set();for(const s of value.students){if(typeof s.name!=='string'||validateStudent(s).length||typeof s.id!=='string'||ids.has(s.id)||typeof s.year!=='number')throw Error('Cadastro inválido no arquivo.');ids.add(s.id);}
for(const b of value.baselines){if(!ids.has(b.studentId)||!Array.isArray(b.slots)||!b.slots.length||!Array.isArray(b.responses)||!['active','completed'].includes(b.status)||typeof b.createdAt!=='string')throw Error('Avaliação inválida no arquivo.');for(const slot of b.slots)if(!slot.activity||typeof slot.activity.prompt!=='string'||typeof slot.skillId!=='string')throw Error('Tarefa de avaliação inválida.');for(const r of b.responses)if(!outcomes.includes(r.outcome))throw Error('Resultado de avaliação inválido.');}
for(const p of value.plans)if(!ids.has(p.studentId)||!Array.isArray(p.items)||!p.items.length||!Array.isArray(p.skillIds))throw Error('Plano inválido no arquivo.');
for(const s of value.sessions){if(!ids.has(s.studentId)||!Array.isArray(s.items)||!s.items.length||!Number.isInteger(s.index)||s.index<0||s.index>=s.items.length||!['active','ended'].includes(s.status))throw Error('Sessão inválida no arquivo.');for(const task of s.items)if(typeof task.skillId!=='string'||typeof task.title!=='string'||!['explain','model','guided','independent','transfer','maintenance'].includes(task.phase))throw Error('Etapa de sessão inválida.');}
for(const r of value.responses)if(!ids.has(r.studentId)||!outcomes.includes(r.outcome)||typeof r.skillId!=='string'||typeof r.answer!=='string'||typeof r.at!=='string'||!Number.isFinite(Date.parse(r.at))||(r.outcome==='independent'&&r.helped))throw Error('Resposta inválida no arquivo.');
for(const s of value.catalogEdits)validateSkill(s);
const result=copy(value);result.settings=result.settings&&typeof result.settings==='object'&&!Array.isArray(result.settings)?result.settings:{};
return result;
}
function validateSkill(s){
if(!s||typeof s.id!=='string'||!s.id.trim()||s.id.length>160)throw Error('Identificação da habilidade inválida.');
for(const field of ['title','subject','content','objective','model'])if(typeof s[field]!=='string'||!s[field].trim())throw Error('A habilidade precisa de título, componente, objetivo, conteúdo e exemplo.');
if(!(s.year===0||(Number.isInteger(s.year)&&s.year>=1&&s.year<=12)))throw Error('Ano escolar inválido na habilidade.');
if(!Number.isInteger(s.version)||s.version<1)throw Error('Versão de habilidade inválida.');
if(!Array.isArray(s.activities)||s.activities.length>1000||!s.activities.some(a=>a.phase==='baseline')||!s.activities.some(a=>a.phase==='practice'))throw Error('Inclua ao menos uma sonda inicial e uma verificação.');
const acts=new Set();for(const a of s.activities){if(typeof a.id!=='string'||!a.id||acts.has(a.id)||typeof a.prompt!=='string'||!a.prompt.trim()||!Number.isInteger(a.version)||a.version<1||!['baseline','practice','transfer','maintenance'].includes(a.phase)||!['human','short','choice'].includes(a.type))throw Error('Atividade inválida ou repetida.');if(a.type==='short'&&(a.answer===undefined||a.answer===null||String(a.answer).trim()===''))throw Error('Questão objetiva sem gabarito.');if(a.type==='choice'&&(a.answer===undefined||a.answer===null||String(a.answer).trim()===''||!Array.isArray(a.options)||a.options.length<2||a.options.length>6||a.options.some(x=>typeof x!=='string'||!x.trim())||!Number.isInteger(Number(a.answer))||Number(a.answer)<0||Number(a.answer)>=a.options.length))throw Error('Questão de múltipla escolha inválida.');acts.add(a.id);}
if(s.prerequisites&&(!Array.isArray(s.prerequisites)||s.prerequisites.some(x=>typeof x!=='string')))throw Error('Pré-requisito inválido.');
if(s.criterion&&(!(s.criterion.threshold>0&&s.criterion.threshold<=1)||!Number.isInteger(s.criterion.minTrials)||s.criterion.minTrials<1||!Number.isInteger(s.criterion.minSessions)||s.criterion.minSessions<1))throw Error('Critério de aprendizagem inválido.');
return copy(s);
}
function exportCatalog(catalog){return {schemaVersion:VERSION,title:'Trilume — biblioteca de habilidades',skills:copy(catalog)};}
return {VERSION,uid,copy,normalize,blank,score,validateStudent,evidence,baselineEvidence,latestBaseline,hasBaseline,propose,unused,makePlan,startSession,finishSession,mastery,validateBackup,validateSkill,exportCatalog};
});
