(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./engine.js'));else root.TrilumeStorage=factory(root.TrilumeEngine);})(typeof window!=='undefined'?window:this,function(E){
'use strict';
function open(storage,key,validate=E.validateBackup){
let previous=null,protectedRaw=null,readError='';
const conflict='Os registros foram alterados em outra aba. Exporte o trabalho desta aba e recarregue antes de continuar salvando.';
function read(){try{previous=storage.getItem(key);if(previous===null)return {state:E.blank(),warning:''};try{return {state:validate(JSON.parse(previous)),warning:''};}catch(error){protectedRaw=previous;const recovery=storage.getItem(key+'.recovery');if(recovery===null)storage.setItem(key+'.recovery',previous);else if(recovery!==previous)throw Error('Já existe outra cópia de recuperação.');return {state:E.blank(),warning:'O arquivo local precisa de recuperação. Uma cópia original foi preservada; exporte os dados para recuperação em Como usar antes de importar um backup válido.'};}}catch(error){readError=error.message||'Armazenamento indisponível.';return {state:E.blank(),warning:'Não foi possível abrir os registros locais. Exporte um backup do trabalho desta aba antes de sair.'};}}
function save(state){if(readError)throw Error('O navegador não conseguiu abrir os registros. Exporte um backup desta aba.');if(protectedRaw!==null)throw Error('Os dados anteriores estão protegidos para recuperação. Exporte a cópia e importe um backup válido para voltar a salvar.');if(storage.getItem(key)!==previous)throw Error(conflict);const next=JSON.stringify(state);storage.setItem(key,next);previous=next;return true;}
function replace(candidate,previousState){const clean=validate(candidate),next=JSON.stringify(clean),current=storage.getItem(key);if(current!==previous)throw Error(conflict);if(current!==null)storage.setItem(key+'.previous',protectedRaw!==null?current:previousState?JSON.stringify(previousState):current);storage.setItem(key,next);previous=next;protectedRaw=null;readError='';return clean;}
function resetStudent(candidate,studentId,transform){
if(readError||protectedRaw!==null)throw Error('Recupere o arquivo local antes de limpar registros individuais.');const current=storage.getItem(key);if(current!==previous)throw Error(conflict);const clean=validate(candidate),writes=[[key,JSON.stringify(clean)]],before=new Map([[key,current]]);
for(const suffix of ['.previous','.recovery']){const name=key+suffix,raw=storage.getItem(name);if(raw===null)continue;let old;try{old=validate(JSON.parse(raw));}catch{throw Error('Há uma cópia local antiga que precisa de recuperação antes da limpeza individual.');}before.set(name,raw);writes.push([name,JSON.stringify(validate(transform(old,studentId)))]);}
const written=[];try{for(const [name,value]of writes){storage.setItem(name,value);written.push(name);}}catch(error){let rollback=true;for(const name of written.reverse())try{storage.setItem(name,before.get(name));}catch{rollback=false;}throw Error(rollback?'A limpeza não foi concluída; os dados anteriores foram preservados.':'Não foi possível confirmar a limpeza e sua reversão. Confira os registros antes de continuar.');}previous=writes[0][1];return clean;
}
function rawRecovery(){try{return protectedRaw??storage.getItem(key+'.recovery');}catch{return protectedRaw;}}
return {read,save,replace,resetStudent,rawRecovery};
}
return {open};
});
