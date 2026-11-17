(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./engine.js'));else root.TrilumeWordLab=factory(root.TrilumeEngine);})(typeof window!=='undefined'?window:this,function(E){
'use strict';
const words=[
{id:'bola',word:'BOLA',picture:'⚽',alternate:'🏀',meaning:'Qual objeto podemos usar para brincar de chutar?',sentence:'A BOLA caiu no jardim.'},
{id:'pato',word:'PATO',picture:'🦆',alternate:'🦆',meaning:'Qual animal tem bico e costuma nadar?',sentence:'O PATO entrou na água.'},
{id:'mala',word:'MALA',picture:'🧳',alternate:'🧳',meaning:'Em qual objeto podemos guardar roupas para uma viagem?',sentence:'A MALA ficou perto da porta.'},
{id:'sapo',word:'SAPO',picture:'🐸',alternate:'🐸',meaning:'Qual animal pode saltar e coaxar?',sentence:'O SAPO saltou perto da lagoa.'},
{id:'gato',word:'GATO',picture:'🐈',alternate:'🐱',meaning:'Qual animal costuma miar?',sentence:'O GATO dormiu na almofada.'},
{id:'bolo',word:'BOLO',picture:'🎂',alternate:'🍰',meaning:'Qual alimento pode ser servido em uma festa de aniversário?',sentence:'O BOLO ficou sobre a mesa.'}
];
const relationNames={AB:'Som → figura',AC:'Som → palavra escrita',BC:'Figura → palavra escrita',CB:'Palavra escrita → figura',CC:'Palavra → palavra',FC:'Função → palavra escrita',TC:'Frase → figura',ORAL:'Leitura em voz alta'};
const modes={baseline:'Conhecer as relações atuais',teaching:'Ensinar com apoio planejado',probe:'Verificar relações sem treino direto',context:'Usar palavras em contexto'};
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function shuffle(a){const out=a.slice();for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;}
function makeSession(student,selected,input={}){
if(!student)throw Error('Cadastre ou selecione um estudante.');
if(student.stage==='ei'&&student.ageBand!=='EI03')throw Error('Para este grupo, use as vivências mediadas da Educação Infantil. A oficina de palavras é oferecida às crianças pequenas e aos estudantes do Fundamental e Médio, conforme interesse e repertório.');
const ids=[...new Set(selected)],chosen=ids.map(id=>words.find(w=>w.id===id));
if(chosen.length<3||chosen.length>6||chosen.some(w=>!w))throw Error('Escolha de três a seis palavras para criar alternativas distintas.');
if(!String(input.educator||'').trim()||!input.approved)throw Error('O tutor precisa revisar e aprovar a oficina.');
if(!Object.hasOwn(modes,input.mode))throw Error('Finalidade da oficina inválida.');
const tasks=[],add=(w,relation,promptLevel=0)=>{
const position=tasks.length%chosen.length,distractors=shuffle(chosen.filter(x=>x.id!==w.id)),options=distractors.slice();options.splice(position,0,w);
tasks.push({id:E.uid(),target:w.id,relation,promptLevel,options:options.map(x=>x.id),audioDelivered:false,helped:promptLevel>0,answer:null});};
if(input.mode==='teaching')for(const relation of ['AB','AC'])for(const level of [2,0])for(const w of chosen)add(w,relation,level);
else if(input.mode==='context')for(const relation of ['FC','TC','ORAL'])for(const w of chosen)add(w,relation);
else for(const relation of input.mode==='probe'?['CC','BC','CB']:['BC','CB'])for(const w of chosen)add(w,relation);
return {id:E.uid(),studentId:student.id,mode:input.mode,educator:input.educator.trim(),approvedAt:new Date().toISOString(),access:String(input.access||'').trim(),wordIds:ids,priorRelations:String(input.priorRelations||'').trim(),tasks,index:0,status:'active',paused:false,createdAt:new Date().toISOString(),responses:[],events:[]};
}
function current(state,studentId){return (state.literacySessions||[]).filter(s=>s.studentId===studentId&&s.status==='active').slice(-1)[0]||null;}
function record(session,answer){
if(!session||session.status!=='active'||session.paused)throw Error('Retome a oficina antes de responder.');
const task=session.tasks[session.index];if(!task||task.answer!==null)throw Error('Esta tarefa já foi registrada.');
if(['AB','AC','FC'].includes(task.relation)&&!task.audioDelivered)throw Error('Ouça o estímulo ou peça ao tutor que confirme sua apresentação oral antes de responder.');
if(task.relation!=='ORAL'&&!task.options.includes(answer))throw Error('Escolha uma das alternativas apresentadas.');
if(task.relation==='ORAL'&&!String(answer||'').trim())throw Error('O tutor precisa transcrever a leitura ou registrar a comunicação observada.');
const result={id:E.uid(),taskId:task.id,target:task.target,relation:task.relation,promptLevel:task.promptLevel,helped:task.helped,answer:String(answer),outcome:task.relation==='ORAL'?'pending':answer===task.target?(task.helped?'assisted':'independent'):'incorrect',at:new Date().toISOString()};
task.answer=String(answer);session.responses.push(result);return result;
}
function finish(session){if(session.status==='ended')return session;session.status='ended';session.paused=false;session.endedAt=new Date().toISOString();return session;}
function summary(session,history=[]){
const trained=new Set(history.filter(s=>s.studentId===session.studentId&&s.mode==='teaching'&&Date.parse(s.createdAt)<=Date.parse(session.createdAt)).flatMap(s=>s.responses.map(r=>r.target+'::'+r.relation)));
return {mode:session.mode,completed:session.responses.length,total:session.tasks.length,independent:session.responses.filter(r=>r.outcome==='independent').length,assisted:session.responses.filter(r=>r.outcome==='assisted').length,incorrect:session.responses.filter(r=>r.outcome==='incorrect').length,pending:session.responses.filter(r=>r.outcome==='pending').length,relations:session.responses.map(r=>({...r,trainedInProgram:trained.has(r.target+'::'+r.relation),emergentCandidate:session.mode==='probe'&&['BC','CB'].includes(r.relation)&&r.outcome==='independent'&&!trained.has(r.target+'::'+r.relation)&&!session.priorRelations}))};
}
function material(task){
const w=words.find(w=>w.id===task.target),r=task.relation;
if(['AB','AC','FC'].includes(r))return '<div class="word-lab-sample"><span aria-hidden="true">🔊</span><button type="button" class="primary" data-action="lab-audio">'+(r==='FC'?'Ouvir a situação':'Ouvir a palavra')+'</button><p>'+(task.audioDelivered?'Estímulo apresentado. Você pode ouvir novamente.':'Primeiro, ouça com calma.')+'</p></div>';
if(r==='BC')return '<div class="word-lab-sample" role="img" aria-label="Figura de '+esc(w.word)+'"><span class="word-picture" aria-hidden="true">'+w.picture+'</span></div>';
return '<div class="word-lab-sample"><strong class="word-written">'+esc(r==='TC'?w.sentence:w.word)+'</strong></div>';
}
function render(c){
const student=c.student;if(!student)return c.nilo('Primeiro vamos cadastrar quem vai participar.',true)+c.button('Cadastrar estudante','nav','primary','students');
if(student.stage==='ei'&&student.ageBand!=='EI03')return '<section class="card"><h1>Brincadeiras e encontros com o adulto</h1><p>Para este grupo, escolha vivências com corpo, objetos, histórias e interação presencial. A tela ajuda o adulto a planejar e registrar.</p>'+c.nilo('Vamos brincar com pessoas e materiais do mundo ao redor.',true,'curioso')+c.button('Explorar experiências','nav','primary','library')+'</section>';
const session=current(c.state,student.id),history=(c.state.literacySessions||[]).filter(s=>s.studentId===student.id);
if(!session)return '<div class="page-heading"><div><span class="eyebrow">OFICINA DE PALAVRAS · PLANEJAMENTO DO TUTOR</span><h1>Som, imagem, escrita e significado</h1><p>Atividades autorais de discriminação condicional. Sondas ficam separadas do ensino e não certificam, sozinhas, equivalência ou leitura com compreensão.</p></div></div>'+c.nilo('Você escolhe as palavras com o tutor, conhece o combinado e pode pausar. Vamos observar como as relações aparecem.',true,'planejar')+
'<section class="card"><h2>Combinar uma oficina</h2><form data-form="lab-plan"><div class="skill-choices">'+words.map((w,i)=>'<label class="check-card"><input type="checkbox" name="wordIds" value="'+w.id+'" '+(i<3?'checked':'')+'><span class="word-picture-small">'+w.picture+'</span><span><strong>'+w.word+'</strong></span></label>').join('')+'</div><label>Finalidade<select name="mode">'+Object.entries(modes).map(([k,v])=>'<option value="'+k+'">'+v+'</option>').join('')+'</select></label><label>Tutor responsável<input name="educator" required maxlength="100"></label><label>Recursos de acesso e condições<input name="access" maxlength="600" value="'+esc(student.access||'')+'"></label><label>Relações que já foram ensinadas fora da oficina<textarea name="priorRelations" rows="2" maxlength="1000" placeholder="Registre o que é conhecido. Não preencher só significa ausência de informação."></textarea></label><label class="inline-check"><input type="checkbox" name="approved" required>Revisei as imagens, o áudio ou a leitura pelo tutor, os alvos e a adequação desta atividade ao estudante.</label><p class="form-note">Ensino: som–figura e som–escrita, com apoio antecedente e tentativa sem pista. Verificação: identidade escrita e relações figura–escrita e escrita–figura, sem correção durante as sondas. Contexto: função, frase e leitura oral registrada pelo tutor. O número de tarefas fica fechado ao iniciar.</p><button class="primary" type="submit">Revisar combinado e preparar oficina</button></form></section>'+
'<section class="card"><h2>Registros da oficina</h2>'+history.slice().reverse().map(s=>{const x=summary(s,history);return '<details><summary>'+modes[s.mode]+' · '+x.completed+' de '+x.total+' tarefas</summary><p>'+x.independent+' independentes, '+x.assisted+' com apoio, '+x.incorrect+' ainda não demonstradas, '+x.pending+' para análise oral.</p><p>Acertar relações treinadas não prova emergência. Os candidatos a relações não ensinadas no programa exigem revisão do histórico externo e novas sondas.</p><div class="table-wrap"><table><thead><tr><th>Palavra</th><th>Relação</th><th>Resposta</th><th>Condição</th></tr></thead><tbody>'+x.relations.map(r=>'<tr><th>'+esc(words.find(w=>w.id===r.target)?.word)+'</th><td>'+esc(relationNames[r.relation])+'</td><td>'+esc(r.answer)+'</td><td>'+esc(r.outcome)+(r.emergentCandidate?' · candidato a relação não ensinada no programa':'')+'</td></tr>').join('')+'</tbody></table></div></details>';}).join('')+'</section>';
if(session.paused)return '<section class="empty"><h1>A pausa faz parte do combinado.</h1><p>As tarefas e respostas ficaram guardadas.</p>'+c.nilo('Podemos continuar depois, do mesmo lugar.',true,'encerrar')+'<div class="actions">'+c.button('Retomar oficina','lab-resume')+c.button('Encerrar por hoje','lab-end','secondary')+'</div></section>';
const task=session.tasks[session.index],target=words.find(w=>w.id===task.target),response=session.responses.find(r=>r.taskId===task.id),testing=['baseline','probe'].includes(session.mode),wordOptions=['AC','BC','CC','FC'].includes(task.relation);
if(!session.started)return '<section class="card"><h1>Nosso combinado</h1><p>'+esc(modes[session.mode])+': '+session.tasks.length+' tarefas, com estas palavras: '+session.wordIds.map(id=>esc(words.find(w=>w.id===id).word)).join(', ')+'.</p><p>Nenhuma tarefa será acrescentada automaticamente. Você pode pausar ou encerrar.</p>'+c.nilo('O tutor acompanha. Você pode escolher se quer começar agora ou guardar para outra hora.',true,'apresentar')+'<div class="actions">'+c.button('Quero começar','lab-begin')+c.button('Guardar para depois','lab-pause','secondary')+'</div></section>';
return '<div class="page-heading"><div><span class="eyebrow">OFICINA · '+(session.index+1)+' / '+session.tasks.length+'</span><h1>'+esc(testing?'Vamos observar uma relação':'Uma descoberta de cada vez')+'</h1><p>'+session.responses.length+' tarefas registradas do combinado.</p></div><div class="actions">'+c.button('Pausar','lab-pause','secondary')+c.button('Encerrar por hoje','lab-end','text-button')+'</div></div><div class="columns wide-left"><section class="card word-lab-task">'+material(task)+
(response?'<div class="result-box"><h2>Resposta guardada</h2><p>'+(testing?'O tutor vai analisar após a oficina.':response.outcome==='independent'?'Você respondeu sem pista nesta tarefa.':response.outcome==='assisted'?'O apoio fez parte desta resposta.':response.outcome==='pending'?'A leitura ficou registrada para análise do tutor.':'Vamos rever com o tutor: a referência desta tarefa é '+esc(target.word)+'.')+'</p></div>'+c.button(session.index+1<session.tasks.length?'Próxima tarefa':'Concluir o combinado','lab-next'):
task.relation==='ORAL'?'<form data-form="lab-oral"><label>Tutor: registre a leitura ou comunicação observada<textarea name="answer" rows="3" required maxlength="2000"></textarea></label><button type="submit" class="primary">Guardar registro</button></form>':
'<p class="caption">'+(task.promptLevel>0?'Nesta tarefa de ensino, a pista mostra uma possibilidade antes da resposta. O acerto ficará registrado com apoio.':'Escolha a alternativa que se relaciona ao que foi apresentado.')+'</p><div class="word-lab-options">'+task.options.map(id=>{const w=words.find(w=>w.id===id);return '<button type="button" class="word-option '+(task.promptLevel>0&&id===task.target?'planned-prompt':'')+'" data-action="lab-answer" data-id="'+id+'" aria-label="'+esc(wordOptions?w.word:'Figura de '+w.word)+'">'+(wordOptions?'<span class="word-written">'+w.word+'</span>':'<span class="word-picture" aria-hidden="true">'+(task.relation==='TC'?w.alternate:w.picture)+'</span>')+'</button>';}).join('')+'</div>')+
(['AB','AC','FC'].includes(task.relation)?'<details><summary>Apresentação oral pelo tutor</summary><p>Se o áudio não funcionar, o tutor pode apresentar o estímulo e registrar essa condição.</p>'+c.button('Ver estímulo e registrar leitura do tutor','lab-adult-audio','secondary')+'</details>':'')+'</section><aside>'+c.nilo(testing?'Escolha com calma. As respostas ficam guardadas para depois da atividade.':task.promptLevel?'Veja a pista, observe a relação e escolha. Em outra tarefa, tentaremos com menos apoio.':'Agora, experimente sem uma pista que mostre a resposta.',true,testing?'refletir':task.promptLevel?'ajudar':'curioso')+'</aside></div>';
}
function action(c,action,id){
const s=current(c.state,c.student?.id);if(!s)return;
const t=s.tasks[s.index],target=words.find(w=>w.id===t.target);
if(action==='lab-begin')s.started=true;
else if(action==='lab-pause'){s.paused=true;s.events.push({type:'pause',at:new Date().toISOString()});if(typeof window!=='undefined'&&window.speechSynthesis)window.speechSynthesis.cancel();}
else if(action==='lab-resume')s.paused=false;
else if(action==='lab-end'){finish(s);}
else if(action==='lab-next'){if(t.answer===null)throw Error('Registre esta tarefa antes de continuar.');if(s.index+1<s.tasks.length)s.index++;else finish(s);}
else if(action==='lab-answer'){record(s,id);}
else if(action==='lab-audio'){
if(typeof window==='undefined'||!window.speechSynthesis||!window.SpeechSynthesisUtterance){c.announce('O áudio não está disponível. Use a apresentação oral pelo tutor.',true);return;}
window.speechSynthesis.cancel();const u=new window.SpeechSynthesisUtterance(t.relation==='FC'?target.meaning:target.word);u.lang='pt-BR';u.rate=.85;u.onend=()=>{t.audioDelivered=true;t.audioMode='speechSynthesis';c.persist();c.render();};u.onerror=()=>c.announce('Não foi possível concluir o áudio. O tutor pode apresentá-lo oralmente.',true);window.speechSynthesis.speak(u);return;
}else if(action==='lab-adult-audio'){c.openDialog('Estímulo para apresentação pelo tutor','<p>'+esc(t.relation==='FC'?target.meaning:target.word)+'</p>'+c.button('Li o estímulo para o estudante','lab-confirm-audio','primary'));return;}
else if(action==='lab-confirm-audio'){t.audioDelivered=true;t.audioMode='adult';if(typeof document!=='undefined')document.getElementById('dialog').close();}
else return;
c.persist();c.render();
}
return {words,relationNames,modes,makeSession,current,record,finish,summary,render,action};
});
