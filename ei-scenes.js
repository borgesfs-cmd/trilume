(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./teaching-art.js'));else root.TrilumeEIScenes=factory(root.TrilumeTeachingArt);})(typeof window!=='undefined'?window:this,function(art){
'use strict';
// Cenas de contexto; quantidades interativas são construídas com objetos individuais.
function render(field,step,ageBand){return art.scene(field,step,ageBand);}
return {render};
});
