(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.TrilumeTeachingArt=factory();})(typeof window!=='undefined'?window:this,function(){
'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const objects={ball:[0,0],block:[0,1],bowl:[0,2],cat:[0,3],suitcase:[1,0],book:[1,1],triangle:[1,2],circle:[1,3],seed:[2,0],water:[2,1],plant:[2,2],crayon:[2,3]};
const extra={pencil:[0,0],cup:[0,1],bear:[0,2],star:[1,0],house:[1,1],duck:[1,2],card:[2,0],flashlight:[2,1],apple:[2,2]};
const scenes={
 EO:{file:'eo',alt:'Um adulto oferece uma bola amarela e um cubo roxo. A criança pode escolher qualquer um dos dois.'},
 CG:{file:'cg',alt:'Um adulto rola uma bola amarela no tapete, diante de uma criança sentada confortavelmente.'},
 TS:{file:'ts',alt:'Uma criança faz um traço roxo em uma folha com giz grosso. O adulto acompanha sem conduzir sua mão.'},
 EF:{file:'ef',alt:'Uma criança aponta a bola em um livro de figuras. O adulto acompanha seu interesse.'},
 ET:{file:'et',alt:'Duas bolas amarelas estão fora de duas tigelas roxas vazias. Um adulto acompanha a criança.'}
};
function spec(name){if(Object.hasOwn(objects,name))return {row:objects[name][0],col:objects[name][1],cols:4,rows:3,file:'objects'};if(Object.hasOwn(extra,name))return {row:extra[name][0],col:extra[name][1],cols:3,rows:3,file:'extra'};return null;}
function sprite(name,label='',large=false){const s=spec(name);if(!s)throw Error('Ilustração não cadastrada.');return '<span class="teaching-object '+(large?'large':'')+'" '+(label?'role="img" aria-label="'+esc(label)+'"':'aria-hidden="true"')+' data-art-object="'+name+'" style="--art-file:url(assets/teaching/'+s.file+'-3d.png);--art-size:'+s.cols*100+'% '+s.rows*100+'%;--art-x:'+s.col/(s.cols-1)*100+'%;--art-y:'+s.row/(s.rows-1)*100+'%"></span>';}
function svgObject(name){const s=spec(name);if(!s)return '';return '<svg viewBox="'+s.col*100+' '+s.row*100+' 100 100" width="60" height="60" overflow="hidden" aria-hidden="true"><image href="assets/teaching/'+s.file+'-3d.png" width="'+s.cols*100+'" height="'+s.rows*100+'" preserveAspectRatio="none"/></svg>';}
function scene(field,step,ageBand){if(!Object.hasOwn(scenes,field)||!Number.isInteger(step)||step<0||step>2||!['EI01','EI02','EI03'].includes(ageBand))throw Error('Cena da Educação Infantil inválida.');const infant=ageBand==='EI01',s=scenes[field],alt=infant?'Um adulto sustenta o bebê no colo e mostra um cartão com a figura de uma bola. A imagem ilustra acolhimento e atenção compartilhada.':s.alt;return '<figure class="ei-learning-scene teaching-scene" data-ei-field="'+field+'" data-ei-step="'+step+'" data-ei-age="'+ageBand+'" data-scene-role="context"><img src="assets/teaching/'+(infant?'baby':s.file)+'-3d.png" width="1448" height="1086" alt="'+esc(alt)+'" decoding="async"><figcaption>'+esc(infant?'O adulto usa a tela. A brincadeira acontece com o bebê, fora da tela.':'Uma cena para apresentar a brincadeira. O adulto organiza os materiais e acompanha a criança.')+'</figcaption></figure>';}
function cover(id,label){const fields={'ei-social':'EO','ei-movement':'CG','ei-create':'TS','ei-story':'EF','ei-quantity':'ET'},field=fields[id];return field?'<img class="lesson-cover" src="assets/teaching/'+scenes[field].file+'-3d.png" alt="'+esc(label)+'" width="1448" height="1086" loading="lazy" decoding="async">':'';}
return {sprite,svgObject,scene,cover,spec};
});
