(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./engine'),require('./gamification'));else root.TrilumeInsights=factory(root.TrilumeEngine,root.TrilumeJourney);})(typeof window!=='undefined'?window:this,function(E,J){
'use strict';
const dayCache=new Map();function localDay(at,zone){const key=(zone||'local')+'|'+at;if(dayCache.has(key))return dayCache.get(key);const value=E.dayKey(at,zone);if(dayCache.size>15000)dayCache.clear();dayCache.set(key,value);return value;}
const periods={day:'Diário',week:'Semanal',month:'Mensal',bimester:'Bimestral',semester:'Semestral',year:'Anual'};
const iso=d=>d.toISOString().slice(0,10),date=s=>new Date(s+'T12:00:00Z'),valid=t=>typeof t==='string'&&Number.isFinite(Date.parse(t)),format=d=>d.split('-').reverse().join('/');
function windowFor(kind='week',offset=0,now=new Date(),zone){
if(!Object.hasOwn(periods,kind)||!Number.isInteger(offset)||offset>0||offset< -100)throw Error('Período de acompanhamento inválido.');
zone=zone||new Intl.DateTimeFormat().resolvedOptions().timeZone;
const today=localDay(now.toISOString(),zone),d=date(today);let start,end;
if(kind==='day'){d.setUTCDate(d.getUTCDate()+offset);start=iso(d);end=start;}
else if(kind==='week'){d.setUTCDate(d.getUTCDate()-(d.getUTCDay()+6)%7+7*offset);start=iso(d);d.setUTCDate(d.getUTCDate()+6);end=iso(d);}
else{const width={month:1,bimester:2,semester:6,year:12}[kind],month=Math.floor(d.getUTCMonth()/width)*width;d.setUTCDate(1);d.setUTCMonth(month+width*offset);start=iso(d);d.setUTCMonth(d.getUTCMonth()+width);d.setUTCDate(0);end=iso(d);}
return {kind,offset,start,end,through:end<today?end:today,today,zone,now:now.toISOString(),label:start===end?format(start):format(start)+' a '+format(end),current:offset===0};
}
function contains(w,at){if(!valid(at)||Date.parse(at)>Date.parse(w.now))return false;const day=localDay(at,w.zone);return day>=w.start&&day<=w.through;}
function records(state,studentId){
const list=[],seen=new Set(),put=(key,r)=>{if(seen.has(key))return;seen.add(key);list.push({...r,key});};
for(const r of state.responses.filter(r=>r.studentId===studentId))put('study:'+r.sessionId+':'+(r.taskId||r.id),{...r,source:'study'});
for(const b of state.baselines.filter(b=>b.studentId===studentId&&b.status==='completed'))for(const r of b.responses)put('baseline:'+b.id+':'+(r.slotId||r.id),{...r,source:'baseline',baselineId:b.id,form:b.repertoireForm||'curricular'});
for(const s of (state.literacySessions||[]).filter(s=>s.studentId===studentId))for(const r of s.responses)put('word:'+s.id+':'+r.taskId,{...r,source:'word',skillId:null,skillTitle:'Oficina de palavras',labMode:s.mode});
return list;
}
function steps(state,studentId,w){
const groups=[];
for(const s of state.sessions.filter(s=>s.studentId===studentId)){
const items=s.items.map(t=>{const response=state.responses.find(r=>r.studentId===studentId&&r.sessionId===s.id&&r.taskId===t.id),event=state.events.find(e=>e.type==='instruction_observed'&&e.detail?.sessionId===s.id&&e.detail?.taskId===t.id),at=response?.at||event?.at||t.completedAt||(t.status==='done'?(s.endedAt||s.startedAt):null);return {taskId:t.id,skillId:t.skillId,title:t.skillTitle,at,done:t.status==='done'&&contains(w,at),estimated:t.status==='done'&&!response&&!event&&!t.completedAt};});
if(contains(w,s.startedAt)||items.some(t=>t.done)||w.current&&s.status==='active'&&valid(s.startedAt)&&Date.parse(s.startedAt)<=Date.parse(w.now))groups.push({id:s.id,source:'study',items});
}
for(const s of (state.literacySessions||[]).filter(s=>s.studentId===studentId&&(s.started||s.responses.length))){const items=s.tasks.map(t=>{const r=s.responses.find(r=>r.taskId===t.id);return {taskId:t.id,skillId:null,title:'Oficina de palavras',at:r?.at,done:!!r&&contains(w,r.at),estimated:false};});if(contains(w,s.createdAt)||items.some(t=>t.done)||w.current&&s.status==='active'&&valid(s.createdAt)&&Date.parse(s.createdAt)<=Date.parse(w.now))groups.push({id:s.id,source:'word',items});}
const all=groups.flatMap(g=>g.items);return {planned:all.length,done:all.filter(t=>t.done).length,percent:all.length?Math.round(all.filter(t=>t.done).length/all.length*100):0,sessions:groups.length,contents:[...new Set(all.filter(t=>t.done).map(t=>t.skillId||'word'))],estimated:all.filter(t=>t.done&&t.estimated).length};
}
function buckets(w,selected){
const bins=[],months=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
if(['bimester','semester','year'].includes(w.kind)){const d=date(w.start);while(iso(d)<=w.end){const start=iso(d),label=months[d.getUTCMonth()];d.setUTCMonth(d.getUTCMonth()+1);const last=new Date(d);last.setUTCDate(last.getUTCDate()-1);bins.push({start,end:iso(last),label});}}
else{const d=date(w.start),width=w.kind==='month'?7:1;while(iso(d)<=w.end){const start=iso(d);d.setUTCDate(d.getUTCDate()+width-1);const end=iso(d)>w.end?w.end:iso(d);bins.push({start,end,label:width===1?start.slice(8):start.slice(8)+'–'+end.slice(8)});d.setUTCDate(d.getUTCDate()+1);}}
return bins.map(b=>({...b,count:selected.filter(r=>{const day=localDay(r.at,w.zone);return day>=b.start&&day<=b.end&&r.outcome!=='not_assessed'&&String(r.answer||'').trim();}).length,future:b.start>w.today}));
}
function summary(state,student,catalog,w){
const all=records(state,student.id),selected=all.filter(r=>contains(w,r.at)),participation=selected.filter(r=>r.outcome!=='not_assessed'&&String(r.answer||'').trim()),validRows=selected.filter(r=>['independent','assisted','incorrect'].includes(r.outcome)),bySkill=[];
for(const id of [...new Set(selected.map(r=>r.skillId).filter(Boolean))]){const sk=catalog.find(s=>s.id===id),rs=selected.filter(r=>r.skillId===id);bySkill.push({id,title:sk?.title||id,subject:sk?.subject||'',records:rs.length,independent:rs.filter(r=>r.outcome==='independent'&&!r.helped).length,assisted:rs.filter(r=>r.outcome==='assisted'||r.outcome==='independent'&&r.helped).length,incorrect:rs.filter(r=>r.outcome==='incorrect').length,pending:rs.filter(r=>r.outcome==='pending').length,notAssessed:rs.filter(r=>r.outcome==='not_assessed').length,recognition:rs.filter(r=>r.recognitionOnly).length,baseline:rs.filter(r=>r.source==='baseline').length,study:rs.filter(r=>r.source==='study').length,mastery:sk?E.mastery(state,student.id,sk):null});}
const entries=J.ledger(state,student.id).filter(x=>contains(w,x.at)),days=new Set(participation.map(r=>localDay(r.at,w.zone)));for(const e of entries)days.add(localDay(e.at,w.zone));
return {window:w,selected,participation:participation.length,valid:validRows.length,independent:validRows.filter(r=>r.outcome==='independent'&&!r.helped).length,assisted:validRows.filter(r=>r.outcome==='assisted'||r.outcome==='independent'&&r.helped).length,incorrect:validRows.filter(r=>r.outcome==='incorrect').length,pending:selected.filter(r=>r.outcome==='pending').length,notAssessed:selected.filter(r=>r.outcome==='not_assessed').length,pendingAll:all.filter(r=>r.outcome==='pending').length,xp:entries.reduce((n,x)=>n+x.xp,0),days:days.size,bySkill,steps:steps(state,student.id,w),series:buckets(w,selected),supports:state.helpEvents.filter(h=>h.studentId===student.id&&contains(w,h.at)).length+(state.literacySessions||[]).filter(s=>s.studentId===student.id).flatMap(s=>s.tasks.flatMap(t=>t.supports||[])).filter(h=>contains(w,h.at)).length,baselineCount:state.baselines.filter(b=>b.studentId===student.id&&b.status==='completed'&&contains(w,b.endedAt||b.createdAt)).length};
}
function bank(catalog){const types={choice:0,human:0,short:0},phases={baseline:0,practice:0,transfer:0,maintenance:0},groups=new Map();for(const s of catalog){const key=s.repertoireDomain?'Repertórios básicos':s.stage==='ei'?'Educação Infantil · '+s.ageBand:s.year===0?'Fundamentos transversais':s.year<=9?s.year+'º ano EF':s.year-9+'ª série EM';if(!groups.has(key))groups.set(key,{label:key,skills:0,activities:0,choice:0,human:0,short:0,bncc:0});const row=groups.get(key);row.skills++;row.bncc+=Boolean(s.bnccCode);for(const a of s.activities){types[a.type]=(types[a.type]||0)+1;phases[a.phase]=(phases[a.phase]||0)+1;row.activities++;row[a.type]++;}}
return {skills:catalog.length,activities:catalog.reduce((n,s)=>n+s.activities.length,0),subjects:new Set(catalog.map(s=>s.subject)).size,types,phases,groups:[...groups.values()],coded:catalog.filter(s=>s.bnccCode).length,health:E.catalogHealth(catalog)};}
return {periods,windowFor,contains,records,steps,summary,bank,format};});
