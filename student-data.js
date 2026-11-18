(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.TrilumeStudentData=factory();})(typeof window!=='undefined'?window:this,function(){
'use strict';
const lists=['baselines','plans','sessions','responses','helpEvents','events','literacySessions','dailyRules','gameSessions','gameResponses','timings'];
function clear(original,studentId,removeProfile=false){const st=JSON.parse(JSON.stringify(original)),ids=new Set([studentId]);for(const key of lists)for(const x of st[key]||[])if(x.studentId===studentId){ids.add(x.id);for(const k of ['items','slots','tasks','responses'])for(const t of x[k]||[])ids.add(t.id);}
for(const key of lists)if(Array.isArray(st[key]))st[key]=st[key].filter(x=>x.studentId!==studentId);if(st.gamification?.goals)st.gamification.goals=st.gamification.goals.filter(x=>x.studentId!==studentId);if(removeProfile)st.students=st.students.filter(s=>s.id!==studentId);
for(const key of Object.keys(st.drafts||{}))if(key.split(':').some(p=>ids.has(p)))delete st.drafts[key];if(st.settings?.selectedId===studentId&&removeProfile)st.settings.selectedId=st.students[0]?.id||'';if(st.settings?.retryFocus?.studentId===studentId)delete st.settings.retryFocus;return st;}
function counts(st,id){return {baselines:(st.baselines||[]).filter(x=>x.studentId===id).length,sessions:(st.sessions||[]).filter(x=>x.studentId===id).length,responses:[...(st.responses||[]),...(st.gameResponses||[])].filter(x=>x.studentId===id).length};}
return {clear,counts};});
