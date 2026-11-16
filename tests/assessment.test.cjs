'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const E=require('../engine.js'),A=require('../assessment.js');
const catalog=require('../data/catalog.json').skills;
const student={id:'student-a',name:'Estudante teste',year:1};
const sk=catalog.find(s=>s.id==='CUR-01-01');
const choice=sk.activities.find(a=>a.type==='choice');
function fixture(activities=[choice]){
const state=E.blank();state.students.push({...student});
const base=A.create(state,student,catalog,activities.map(a=>A.key(sk.id,a.id)),{educator:'Tutor teste',conditions:'Teclado',instructions:'Uma questão de cada vez.'});
state.baselines.push(base);return {state,base};
}
test('o tutor precisa selecionar questões e identificar o responsável',()=>{
assert.throws(()=>A.create(E.blank(),student,catalog,[],{educator:'Tutor'}),/questões/);
assert.throws(()=>A.create(E.blank(),student,catalog,[A.key(sk.id,choice.id)],{}),/responsável/);
});
test('o planejamento preserva enunciado, alternativas e versão',()=>{
const {base}=fixture();const before=choice.prompt;
assert.notEqual(base.slots[0].activity,choice);
base.slots[0].activity.prompt='Alteração local';
assert.equal(choice.prompt,before);
assert.equal(base.slots[0].activity.version,choice.version);
});
test('não se abre uma segunda aplicação para o mesmo estudante',()=>{
const {state}=fixture();assert.throws(()=>A.create(state,student,catalog,[A.key(sk.id,choice.id)],{educator:'Tutor'}),/em andamento/);
});
test('uma resposta correta de múltipla escolha é registrada sem erro de índice',()=>{
const {base}=fixture();const r=A.record(base,base.slots[0].id,{answer:choice.answer});
assert.equal(r.outcome,'independent');assert.equal(A.text(r),choice.options[Number(choice.answer)]);
});
test('o acerto com pista mantém a identificação de ajuda',()=>{
const {base}=fixture();assert.equal(A.record(base,base.slots[0].id,{answer:choice.answer,helped:true}).outcome,'assisted');
});
test('alternativas incorretas e alternativas inválidas têm tratamentos distintos',()=>{
const {base}=fixture();assert.throws(()=>A.record(base,base.slots[0].id,{answer:'99'}),/alternativas/);
assert.equal(base.responses.length,0);
assert.equal(A.record(base,base.slots[0].id,{answer:String((Number(choice.answer)+1)%choice.options.length)}).outcome,'incorrect');
});
test('produções abertas aguardam análise humana',()=>{
const human=sk.activities.find(a=>a.type==='human'&&a.phase==='baseline'),{base}=fixture([human]);
assert.equal(A.record(base,base.slots[0].id,{answer:'Resposta oral transcrita.'}).outcome,'pending');
});
test('a pausa impede registros até a retomada e não apaga respostas',()=>{
const {base}=fixture();base.paused=true;assert.throws(()=>A.record(base,base.slots[0].id,{answer:choice.answer}),/Retome/);
assert.equal(base.responses.length,0);base.paused=false;A.record(base,base.slots[0].id,{answer:choice.answer});assert.equal(base.responses.length,1);
});
test('uma questão não admite duas respostas durante a aplicação',()=>{
const {base}=fixture();A.record(base,base.slots[0].id,{answer:choice.answer});
assert.throws(()=>A.record(base,base.slots[0].id,{answer:choice.answer}),/já foi registrada/);assert.equal(base.responses.length,1);
});
test('o encerramento mantém respostas e identifica itens não aferidos',()=>{
const {base}=fixture(sk.activities.filter(a=>a.phase==='baseline').slice(0,2));
const r=A.record(base,base.slots[0].id,{answer:'Produção observada.'});
A.complete(base);assert.equal(base.responses[0].id,r.id);assert.equal(base.responses[1].outcome,'not_assessed');
const snapshot=JSON.stringify(base);A.complete(base);assert.equal(JSON.stringify(base),snapshot);
});
test('a análise só ocorre depois do encerramento e registra o tutor',()=>{
const {base}=fixture(),r=A.record(base,base.slots[0].id,{answer:choice.answer});
assert.throws(()=>A.review(base,r.id,{outcome:'independent',educator:'Tutor',note:'Observado.'}),/Encerre/);
A.complete(base);assert.throws(()=>A.review(base,r.id,{outcome:'independent'}),/justificativa/);
});
test('a revisão não transforma ajuda registrada em independência',()=>{
const {base}=fixture(),r=A.record(base,base.slots[0].id,{answer:choice.answer,helped:true});A.complete(base);
A.review(base,r.id,{outcome:'independent',educator:'Tutor',note:'Resposta correta.',helped:false});
assert.equal(r.outcome,'assisted');assert.equal(r.helped,true);assert.equal(r.reviews.length,1);
});
test('ausência de resposta não pode virar habilidade demonstrada na revisão',()=>{
const {base}=fixture();A.complete(base);
assert.throws(()=>A.review(base,base.responses[0].id,{outcome:'independent',educator:'Tutor',note:'Sem resposta.'}),/não aferida/);
});
test('uma aplicação complementar não apaga a evidência de outra habilidade',()=>{
const {state,base}=fixture();A.record(base,base.slots[0].id,{answer:choice.answer});A.complete(base);
const other=catalog.find(s=>s.id==='CUR-01-02'),a=other.activities.find(a=>a.phase==='baseline');
const second=A.create(state,student,catalog,[A.key(other.id,a.id)],{educator:'Tutor'});state.baselines.push(second);A.complete(second);
assert.equal(E.baselineEvidence(state,student.id,sk.id).independent,1);
assert.equal(E.baselineEvidence(state,student.id,sk.id).baselineId,base.id);
});
test('reapresentação é identificada sem alterar o registro anterior',()=>{
const {state,base}=fixture();A.record(base,base.slots[0].id,{answer:choice.answer});A.complete(base);
const second=A.create(state,student,catalog,[A.key(sk.id,choice.id)],{educator:'Tutor'});assert.equal(second.slots[0].repeated,true);
assert.equal(base.responses[0].repeated,false);
});
test('o campo de resposta do aluno não inclui gabarito nem rubrica',()=>{
const html=A.fields({...choice,rubric:'CRITÉRIO PRIVADO',reference:'REFERÊNCIA PRIVADA'});
assert.ok(html.includes('type="radio"'));assert.equal(html.includes('CRITÉRIO PRIVADO'),false);assert.equal(html.includes('REFERÊNCIA PRIVADA'),false);assert.equal(html.includes('checked'),false);
});
test('o alvo de leitura pode pertencer à questão específica',()=>{
assert.equal(A.readingTarget({readingTarget:false},{readingTarget:true}),true);
});
test('as 104 novas questões têm alternativas válidas e podem ser corrigidas',()=>{
const choices=catalog.flatMap(s=>s.activities.filter(a=>a.type==='choice').map(a=>({s,a})));assert.equal(choices.length,104);
for(const {s,a} of choices){E.validateSkill(s);assert.equal(E.score(a.answer,a.answer,false),'independent');}
});
test('a importação rejeita alternativa duplicada e gabarito fora dos limites',()=>{
const bad=E.copy(sk),a=bad.activities.find(a=>a.type==='choice');a.options=[a.options[0],a.options[0]];assert.throws(()=>E.validateSkill(bad),/escolha inválida/);
a.options=['Um','Dois'];a.answer='2';assert.throws(()=>E.validateSkill(bad),/escolha inválida/);
});
test('novas avaliações continuam compatíveis com os backups existentes',()=>{
const {state,base}=fixture();A.record(base,base.slots[0].id,{answer:choice.answer});A.complete(base);assert.equal(E.validateBackup(state).baselines.length,1);
});
