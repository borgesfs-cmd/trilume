'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const E=require('../engine.js'),A=require('../assessment.js'),catalog=require('../data/catalog.json').skills;
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');
function boot(state=E.blank(),view='home',options={}){
const handlers={},windowHandlers={},nodes=new Map(),storage=new Map([['trilume.v1',options.raw??JSON.stringify(state)]]),classes=new Set();
const node=id=>{if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',hidden:false,dataset:{},value:'',open:false,className:'',focus(){},click(){},setAttribute(){},addEventListener(type,fn){this[type]=fn;},classList:{toggle(){},remove(){}},showModal(){this.open=true;},close(){this.open=false;},querySelector(){return {value:'',hidden:false};}});return nodes.get(id);};
class FormDataMock{
constructor(form){this.data=Object.entries(form.values||{}).flatMap(([k,v])=>Array.isArray(v)?v.map(x=>[k,x]):[[k,v]]);}
[Symbol.iterator](){return this.data[Symbol.iterator]();}
keys(){return this.data.map(([k])=>k)[Symbol.iterator]();}
getAll(name){return this.data.filter(([k])=>k===name).map(([,v])=>v);}
}
const document={getElementById:node,querySelectorAll(){return [];},addEventListener(type,fn){handlers[type]=fn;},body:{classList:{toggle(name,on){on?classes.add(name):classes.delete(name);},remove(name){classes.delete(name);}}}};
const location={search:'',hash:'#'+view};
const window={TrilumeEngine:E,TRILUME_CATALOG:catalog,addEventListener(type,fn){windowHandlers[type]=fn;},scrollTo(){},print(){}};
const sandbox={window,document,location,history:{pushState(data,title,hash){location.hash=hash;}},localStorage:{getItem:k=>storage.get(k)||null,setItem(k,v){if(options.failWrites?.(k,v))throw Error('Quota excedida.');storage.set(k,v);}},URLSearchParams,FormData:FormDataMock,setTimeout(){return 1;},clearTimeout(){},console};
const context=vm.createContext(sandbox);
for(const file of ['support.js','quick-forms.js','repertoire.js','data/repertoire.js'])vm.runInContext(read(file),context);vm.runInContext(read('nilo.js'),context);vm.runInContext(read('storage.js'),context);vm.runInContext(read('library-tools.js'),context);vm.runInContext(read('word-lab.js'),context);vm.runInContext(read('assessment.js'),context);vm.runInContext(read('data/early-childhood.js'),context);vm.runInContext(read('gamification.js'),context);vm.runInContext(read('insights.js'),context);vm.runInContext(read('areas.js'),context);vm.runInContext(read('app.js'),context);
return {node,classes,window,document,storage,html:()=>node('page').innerHTML,state:()=>JSON.parse(storage.get('trilume.v1')),async click(action,id){await handlers.click({target:{closest(){return {dataset:{action,id}};}}});},submit(name,values){const form={dataset:{form:name},values};handlers.submit({target:form,preventDefault(){}});},location,handlers};
}
function studentState(){
const state=E.blank();state.students.push({id:'student-1',name:'Estudante de teste',year:1,access:''});state.settings.selectedId='student-1';return state;
}
const target=catalog.find(s=>s.id==='CUR-01-01'),choice=target.activities.find(a=>a.type==='choice');
function activeFixture(activity=choice){
const state=studentState(),base=A.create(state,state.students[0],catalog,[A.key(target.id,activity.id)],{educator:'Tutor',instructions:'Leia com calma.'});
state.baselines.push(base);state.settings.assessmentMode='student';return {state,base};
}
test('as oito páginas apresentam o Nilo, inclusive quando ainda não há estudante',()=>{
for(const view of ['home','students','baseline','trail','study','library','progress','guide'])assert.ok(boot(E.blank(),view).html().includes('nilo-card'),view);
});
test('o tutor encontra questões estruturadas e pode criar novos itens',()=>{
const ui=boot(studentState(),'baseline');assert.ok(ui.html().includes('Múltipla escolha'));assert.ok(ui.html().includes('name="questionKeys"'));assert.ok(ui.html().includes('new-baseline-question'));
});
test('salvar o planejamento abre uma atividade sem gabaritos ou critérios de correção',()=>{
const ui=boot(studentState(),'baseline');ui.submit('start-baseline',{questionKeys:[A.key(target.id,choice.id)],educator:'Tutor',conditions:'',instructions:'Leia com calma.'});
assert.equal(ui.state().baselines.length,1);assert.equal(ui.state().settings.assessmentMode,'student');
assert.ok(ui.html().includes('type="radio"'));assert.equal(ui.html().includes('Gabarito'),false);assert.equal(ui.html().includes('Referência:'),false);assert.equal(ui.html().includes('Correta independente'),false);assert.ok(ui.classes.has('assessment-student'));
});
test('a tela do aluno guarda a resposta sem antecipar a correção',async()=>{
const {state,base}=activeFixture(),ui=boot(state,'baseline');ui.submit('baseline-answer',{slotId:base.slots[0].id,answer:choice.answer});
assert.equal(ui.state().baselines[0].responses[0].outcome,'independent');assert.equal(ui.html().includes('Correta independente'),false);
await ui.click('confirm-finish-baseline');assert.equal(ui.state().baselines[0].status,'completed');assert.ok(ui.html().includes('A avaliação foi guardada.'));
});
test('uma produção aberta volta ao tutor como pendente e só depois libera a evidência',async()=>{
const human=target.activities.find(a=>a.phase==='baseline'&&a.type==='human'),{state,base}=activeFixture(human),ui=boot(state,'baseline');
ui.submit('baseline-answer',{slotId:base.slots[0].id,answer:'Produção oral registrada.'});await ui.click('confirm-finish-baseline');await ui.click('assessment-tutor');await ui.click('nav','progress');
assert.ok(ui.html().includes('produções para analisar'));assert.equal(E.hasBaseline(ui.state(),'student-1'),false);
const b=ui.state().baselines[0],r=b.responses[0];ui.submit('review-baseline',{baselineId:b.id,responseId:r.id,outcome:'independent',educator:'Tutor',note:'Realizou sem pista.'});
assert.equal(E.hasBaseline(ui.state(),'student-1'),true);assert.equal(ui.state().baselines[0].responses[0].reviews.length,1);
});
test('a trilha continua bloqueada enquanto não há observação válida',()=>{
assert.ok(boot(studentState(),'trail').html().includes('Primeiro, conheça o ponto de partida'));
});
test('o Nilo permanece nas opções de foco e usa doze contextos distintos',async()=>{
const ui=boot(studentState(),'guide');assert.equal(Object.keys(ui.window.TrilumeNilo.poses).length,12);
await ui.click('toggle-focus');assert.ok(ui.html().includes('nilo-card'));
await ui.click('toggle-nilo');assert.ok(ui.classes.has('compact-nilo'));assert.ok(ui.html().includes('nilo-card'));assert.equal(ui.classes.has('hide-nilo'),false);
});
test('as questões criadas pelo tutor aceitam múltipla escolha com índice correto',()=>{
const ui=boot(studentState(),'baseline');ui.submit('activity',{skillId:target.id,phase:'baseline',prompt:'Qual é a letra inicial de BOLA?',type:'choice',options:'B\nP\nT',correctOption:'1',answer:'',rubric:'Observar a escolha e o apoio.',reference:'A letra inicial é B.'});
const edited=ui.state().catalogEdits[0];assert.ok(edited);assert.equal(edited.activities.at(-1).answer,'0');assert.equal(edited.activities.at(-1).options.length,3);
});
test('a prática de estudo também apresenta alternativas e corrige a resposta',()=>{
const {state,base}=activeFixture();A.record(base,base.slots[0].id,{answer:choice.answer});A.complete(base);state.settings.assessmentMode='tutor';
const plan=E.makePlan(state,state.students[0],catalog,{skillIds:[target.id],educator:'Tutor',minutes:15});
const session=E.startSession(plan),task=session.items.find(t=>t.phase==='independent');task.activity={...choice,id:'practice-new',phase:'practice'};session.index=session.items.indexOf(task);state.plans.push(plan);state.sessions.push(session);
const ui=boot(state,'study');assert.ok(ui.html().includes('type="radio"'));
ui.submit('study-answer',{answer:choice.answer,access:''});assert.equal(ui.state().responses.at(-1).outcome,'independent');assert.ok(ui.node('toast').innerHTML.includes('celebrar'));
});
test('o estilo principal mantém contraste para leitura de texto comum',()=>{
function luminance(hex){const values=hex.match(/[0-9a-f]{2}/gi).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return values[0]*.2126+values[1]*.7152+values[2]*.0722;}
function contrast(a,b){const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
const css=read('styles.css');for(const [fg,bg] of [['35445e','fffefa'],['43516a','fffefa'],['ffffff','5947c5'],['342c53','eae5fa']]){assert.ok(css.includes('#'+fg)||fg==='ffffff');assert.ok(contrast(fg,bg)>=4.5);}
assert.ok(css.includes('.focus-mode .nilo-card{display:grid}'));
});

test('a jornada abre com metas e mantém a avaliação separada do XP',async()=>{const ui=boot(studentState(),'journey');assert.ok(ui.html().includes('XP hoje'));assert.ok(ui.html().includes('não mede competência'));await ui.click('journey-goal');ui.submit('journey-goal',{targetXp:'40'});assert.equal(ui.state().gamification.goals.at(-1).targetXp,40);assert.ok(ui.html().includes('40 XP combinados'));});

test('a ficha EI mostra observação e não apresenta o critério numérico escolar',async()=>{const ui=boot(E.blank(),'library');await ui.click('skill-detail','EI03ET07');const html=ui.node('dialog-body').innerHTML;assert.ok(html.includes('Crianças pequenas'));assert.ok(html.includes('Observação na Educação Infantil'));assert.equal(html.includes('80% de respostas independentes'),false);});

test('cadastro por toque preserva múltiplos objetivos, recursos e interesses ao editar',async()=>{const ui=boot();ui.submit('student',{year:'EI03',name:'',goalChoices:['Comunicar ideias','Participar de brincadeiras'],accessChoices:['Responder por toque','Fazer pausas'],interestChoices:['Animais','Música'],educatorRole:'Mãe/pai ou responsável'});const s=ui.state().students[0];assert.equal(s.name,'Aprendiz 1');assert.equal(s.goalChoices.length,2);assert.equal(s.accessChoices.length,2);assert.equal(s.interestChoices.length,2);await ui.click('edit-student',s.id);assert.match(ui.node('dialog-body').innerHTML,/value="Música" checked/);});
test('plano pode ser aprovado com seletores e materiais sem digitação',()=>{const {state,base}=activeFixture();A.record(base,base.slots[0].id,{answer:choice.answer});A.complete(base);const ui=boot(state,'trail');ui.submit('plan',{skillIds:[target.id],dayChoice:'Terça-feira',periodChoice:'Tarde',minutes:'15',locationChoice:'Em casa',materialChoices:['Papel e lápis','Figuras e cartões'],educatorRole:'Mãe/pai ou responsável',approved:'on',materialReady:'on',mode:'teaching'});const p=ui.state().plans[0];assert.ok(p);assert.equal(p.when,'Terça-feira; Tarde');assert.equal(p.approvedBy,'Mãe/pai ou responsável');assert.equal(p.scheduleChoices.materials.length,2);});
test('retirar alternativa registra apoio sem erro e preserva 8 XP ao responder',async()=>{const {state,base}=activeFixture();A.record(base,base.slots[0].id,{answer:choice.answer});A.complete(base);const p=E.makePlan(state,state.students[0],catalog,{skillIds:[target.id],educator:'Tutor',minutes:15}),session=E.startSession(p),t=session.items.find(t=>t.phase==='independent');session.index=session.items.indexOf(t);state.plans.push(p);state.sessions.push(session);const ui=boot(state,'study');await ui.click('eliminate-task');let now=ui.state();assert.equal(now.responses.length,0);assert.equal(now.helpEvents.length,1);assert.notEqual(now.helpEvents[0].optionIndex,Number(t.activity.answer));ui.submit('study-answer',{answer:t.activity.answer});now=ui.state();assert.equal(now.responses[0].outcome,'assisted');assert.equal(now.responses[0].xpAward.earned,8);assert.equal(now.responses[0].recognitionOnly,true);});
test('observações por toque concluem a aplicação e podem ser confirmadas depois',async()=>{const st=studentState(),ui=boot(st,'repertoire');ui.submit('repertoire-plan',{repertoireAreas:['REP-CORPO'],repertoireForm:'initial',educatorRole:'Professor(a)',materialReady:'on'});let b=ui.state().baselines[0];assert.equal(b.slots.length,3);for(const slot of b.slots)ui.submit('baseline-answer',{slotId:slot.id,observation:'alone'});await ui.click('confirm-finish-baseline');await ui.click('assessment-tutor');b=ui.state().baselines[0];assert.equal(b.responses[0].outcome,'pending');await ui.click('confirm-observations',b.id);assert.equal(ui.state().baselines[0].responses[0].outcome,'independent');assert.equal(E.hasBaseline(ui.state(),'student-1'),true);});

test('as sugestões iniciais do 1º ano não pré-selecionam tarefas transversais mais complexas',()=>{const ui=boot(studentState(),'baseline'),checked=[...ui.html().matchAll(/<input type="checkbox" name="questionKeys" value="([^"]+)" checked/g)].map(m=>m[1]);assert.equal(checked.length,2);assert.ok(checked.every(x=>x.includes('CUR-01-')));assert.equal(boot(studentState(),'trail').html().includes('Lateralidade'),false);});
test('uma dica continua visível depois da retirada de um distrator',async()=>{const {state,base}=activeFixture();A.record(base,base.slots[0].id,{answer:choice.answer});A.complete(base);const p=E.makePlan(state,state.students[0],catalog,{skillIds:[target.id],educator:'Tutor',minutes:15}),ss=E.startSession(p),t=ss.items.find(t=>t.phase==='independent');ss.index=ss.items.indexOf(t);state.plans.push(p);state.sessions.push(ss);const ui=boot(state,'study');await ui.click('help-task');const message=ui.state().helpEvents[0].message;await ui.click('eliminate-task');assert.ok(ui.html().includes(message));assert.equal(ui.state().responses.length,0);assert.ok(ui.html().includes('Até 6 XP'));});

test('as abas Estudante, Tutor e Geral apresentam menus próprios',async()=>{const ui=boot(studentState(),'learner');assert.match(ui.node('area-tabs').innerHTML,/Estudante/);assert.match(ui.node('area-menu').innerHTML,/Meu estudo/);assert.doesNotMatch(ui.node('area-menu').innerHTML,/Gamificação|Estudantes/);assert.equal(ui.node('student-switch').hidden,true);await ui.click('area','tutor');assert.match(ui.html(),/Painel do tutor/);assert.match(ui.node('area-menu').innerHTML,/Gamificação/);assert.equal(ui.node('student-switch').hidden,false);await ui.click('area','general');assert.match(ui.html(),/Dados do acervo/);assert.match(ui.node('area-menu').innerHTML,/Biblioteca e exercícios/);});
test('estudante tem seis períodos e não configura metas no próprio painel',async()=>{const ui=boot(studentState(),'student-progress');for(const label of ['Diário','Semanal','Mensal','Bimestral','Semestral','Anual'])assert.ok(ui.html().includes(label));assert.doesNotMatch(ui.html(),/Revisar registro|Analisar resposta|Ajustar minha meta/);await ui.click('nav','journey');assert.doesNotMatch(ui.html(),/Ajustar minha meta/);await ui.click('area','tutor');await ui.click('nav','gamification');assert.match(ui.html(),/Meta diária do estudante/);ui.submit('journey-goal',{targetXp:'40'});assert.equal(ui.state().gamification.goals.at(-1).targetXp,40);});
test('oficina sem sessão preparada não mostra planejamento ao estudante',()=>{const s=studentState();s.settings.menuArea='student';const ui=boot(s,'lab');assert.doesNotMatch(ui.html(),/data-form="lab-plan"/);assert.match(ui.html(),/O tutor vai combinar/);});
test('trocar de aba não elimina cadastros ou histórico',async()=>{const st=studentState(),before=JSON.stringify(st.students),ui=boot(st,'learner');await ui.click('area','tutor');await ui.click('area','general');await ui.click('area','student');assert.equal(JSON.stringify(ui.state().students),before);assert.equal(ui.state().settings.menuArea,'student');});

test('submenu móvel do tutor preserva os destinos e permite abrir a gamificação',async()=>{const ui=boot(studentState(),'tutor');assert.match(ui.node('mobile-area-view').innerHTML,/Gamificação/);ui.handlers.change({target:{id:'mobile-area-view',value:'gamification',closest(){return null;}}});assert.match(ui.html(),/Meta diária do estudante/);assert.equal(ui.node('area-menu-label').textContent,'Tutor');});
