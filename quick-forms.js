(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.TrilumeQuickForms=factory();})(typeof window!=='undefined'?window:this,function(){
'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const goals=['Compreender instruções','Explorar sons e letras','Ler palavras e textos','Contar e comparar quantidades','Resolver situações de matemática','Comunicar ideias','Participar de brincadeiras','Organizar o estudo e pedir ajuda'];
const access=['Ler a instrução com o adulto','Letra maior','Uma etapa por vez','Responder por toque','Apontar ou usar gestos','Responder falando ao adulto','Usar comunicação alternativa','Fazer pausas'];
const interests=['Animais','Histórias','Música','Desenho e arte','Natureza','Esportes e movimento','Construções','Tecnologia','Situações do cotidiano'];
const materials=['Objetos grandes para contar','Papel e lápis','Figuras e cartões','Texto preparado','Áudio ou apresentação oral','Espaço para movimento','Recursos de comunicação'];
const roles=['Professor(a)','Tutor(a)','Mãe/pai ou responsável','Outro educador'];
function checks(name,label,options,chosen=[]){return '<fieldset class="quick-options"><legend>'+esc(label)+' <small>pode marcar mais de uma opção</small></legend><div>'+options.map(o=>'<label class="quick-chip"><input type="checkbox" name="'+esc(name)+'" value="'+esc(o)+'" '+(chosen.includes(o)?'checked':'')+'><span>'+esc(o)+'</span></label>').join('')+'</div></fieldset>';}
function select(name,label,options,value='',required=false){return '<label>'+esc(label)+'<select name="'+esc(name)+'" '+(required?'required':'')+'>'+options.map(o=>{const [v,l]=Array.isArray(o)?o:[o,o];return '<option value="'+esc(v)+'" '+(String(value)===String(v)?'selected':'')+'>'+esc(l)+'</option>';}).join('')+'</select></label>';}
function selected(fd,name,options){return [...new Set(fd.getAll(name).filter(v=>options.includes(v)))];}
function join(values,free){return [...new Set([...values,String(free||'').trim()].filter(Boolean))].join('; ');}
function context(){return select('context','Tutor: o que mudou nesta atividade?',[['','Escolha'],'Outro material','Outro lugar','Outra pessoa','Outra rotina'],'',true);}
return {goals,access,interests,materials,roles,checks,select,selected,join,context};});
