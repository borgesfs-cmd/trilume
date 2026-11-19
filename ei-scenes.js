(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.TrilumeEIScenes=factory();})(typeof window!=='undefined'?window:this,function(){
'use strict';
const fields={EO:'O eu, o outro e o nós',CG:'Corpo, gestos e movimentos',TS:'Traços, sons, cores e formas',EF:'Escuta, fala, pensamento e imaginação',ET:'Espaços, tempos, quantidades, relações e transformações'};
const ages=['EI01','EI02','EI03'],skins=['#8f563d','#bd825e','#e2b08b','#a56b50'],ink='#35445e',purple='#5947c5',green='#16745d',gold='#d79c25';
const labels={
 EO:['Um adulto apresenta uma bola macia e um bloco grande e macio, oferecendo duas possibilidades de exploração.','A criança aponta ou dirige o olhar para um dos objetos grandes. O adulto acompanha a escolha e espera sua comunicação.','Duas pessoas participam de turnos com uma bola grande e macia, acompanhadas por um adulto.'],
 CG:['Adulto e criança encontram uma posição confortável, com apoio do corpo e possibilidade de pausa.','Uma mão explora o movimento de um tecido grande e macio, com a mediação do adulto.','Uma mão desloca uma bola grande e macia por um percurso curto e livre, com o adulto acompanhando.'],
 TS:['O adulto oferece duas formas grandes e macias em duas cores, para exploração livre.','A criança experimenta um traço amplo sobre uma superfície, com o adulto acompanhando o movimento.','Uma criação com formas e traços é organizada e apreciada com o adulto, sem resposta certa nem modelo obrigatório.'],
 EF:['Um adulto compartilha um livro de figuras com a criança, apontando imagens enquanto conta uma história.','A criança aponta uma figura do livro, e o adulto acompanha seu interesse.','O adulto acolhe um gesto, som ou palavra da criança relacionado a uma figura do livro.'],
 ET:['Objetos grandes e macios são apresentados à criança para explorar quantidades e relações.','Objetos grandes e macios são colocados em caixas abertas, com o apoio do adulto.','Cada objeto grande e macio ocupa uma base, tornando visível uma correspondência entre objetos e lugares.']
};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const svg=(body,attributes='')=>'<g '+attributes+'>'+body+'</g>';
function person(x,y,scale,tone,shirt,pose='standing'){
 const seated=pose.includes('seated'),point=pose.includes('point'),open=pose.includes('open');
 const arm=point?'<path d="M-23 82L-58 106l-53-9"/>':open?'<path d="M-23 82l-27 31-25-12M23 82l28 31 25-12"/>':'<path d="M-23 82l-19 45M23 82l19 45"/>';
 return '<g data-ei-person="true" transform="translate('+x+' '+y+') scale('+scale+')"><g stroke="'+ink+'" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="0" cy="33" r="27" fill="'+tone+'"/><path d="M-26 28q0-36 28-28 26 2 25 28-13-20-28-11-15 10-25 11" fill="#49372e" stroke="none"/><circle cx="-9" cy="33" r="2" fill="'+ink+'" stroke="none"/><circle cx="9" cy="33" r="2" fill="'+ink+'" stroke="none"/><path d="M-7 45q7 6 14 0" fill="none"/><path d="M-20 66q20-10 40 0l10 59h-60z" fill="'+shirt+'"/>'+(seated?'<path d="M-18 125l-30 27 36 6M18 125l28 28-1 24" fill="none" stroke="#43516a" stroke-width="14"/>':'<path d="M-14 125l-3 55M14 125l3 55" stroke="#43516a" stroke-width="14"/>')+'<g fill="none" stroke="'+tone+'" stroke-width="13">'+arm+'</g></g></g>';
}
function hand(x,y,scale,tone,rotate=0){return '<g data-ei-hand="true" transform="translate('+x+' '+y+') rotate('+rotate+') scale('+scale+')"><path d="M-16 41l-7-22q-2-8 5-9 6 0 9 12V-15q0-7 6-7 6 0 6 7v28-36q0-7 6-7 6 0 6 7v36-29q0-7 6-7 6 0 6 7v31-21q0-6 6-6 6 0 6 6v41q0 20-15 30H-2z" fill="'+tone+'" stroke="'+ink+'" stroke-width="2.5" stroke-linejoin="round"/></g>';}
function ball(x,y,r=32,color=gold){return '<g data-ei-object="ball" data-object-size="large"><circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+color+'" stroke="'+ink+'" stroke-width="3"/><path d="M'+(x-r*.75)+' '+(y-r*.45)+'q'+r*.75+' '+r*.4+' '+r*1.5+' 0M'+x+' '+(y-r)+'q-'+r*.65+' '+r+' 0 '+r*2+'" fill="none" stroke="#fffefa" stroke-width="3"/></g>';}
function block(x,y,size=63,color=purple){return '<g data-ei-object="block" data-object-size="large"><rect x="'+x+'" y="'+y+'" width="'+size+'" height="'+size+'" rx="14" fill="'+color+'" stroke="'+ink+'" stroke-width="3"/><path d="M'+(x+10)+' '+(y+10)+'l'+(size*.24)+' '+(size*.19)+'h'+(size*.47)+'M'+(x+size*.4)+' '+(y+size*.34)+'v'+(size*.5)+'" fill="none" stroke="#fffefa" stroke-width="2.5"/></g>';}
function box(x,y,w=150,h=108){return '<g data-ei-container="box"><path d="M'+x+' '+y+'l20-25h'+(w-40)+'l20 25v'+h+'H'+x+'z" fill="#e4d5bb" stroke="'+ink+'" stroke-width="3"/><path d="M'+x+' '+y+'h'+w+'M'+(x+20)+' '+(y-25)+'v25m'+(x+w-20)+' '+(y-25)+'v25" fill="none" stroke="'+ink+'" stroke-width="3"/></g>';}
function book(x,y,w=230){return '<g data-ei-book="illustrated" transform="translate('+x+' '+y+')"><path d="M0 12q'+w*.25+'-20 '+w*.5+'0 '+w*.25+'-20 '+w*.5+'0v126q-'+w*.25+'-20-'+w*.5+'0-'+w*.25+'-20-'+w*.5+'0z" fill="#fffefa" stroke="'+ink+'" stroke-width="4"/><path d="M'+w*.5+' 12v126" stroke="#8e7abd" stroke-width="3"/><g transform="translate(22 38)"><circle cx="30" cy="29" r="27" fill="#ddb333" stroke="'+ink+'" stroke-width="2"/><path d="M8 16q20 14 44 0m-22-14q-14 27 0 54" fill="none" stroke="#fff" stroke-width="3"/></g><g transform="translate('+(w*.5+19)+' 37)"><path d="M2 27L31 2l29 25v48H2z" fill="#b7a8e8" stroke="'+ink+'" stroke-width="2"/><rect x="24" y="43" width="18" height="32" fill="'+purple+'"/></g></g>';}
function ground(){return '<ellipse cx="300" cy="286" rx="266" ry="37" fill="#ebe7f7"/><path d="M34 296H566" stroke="#d4cede" stroke-width="2"/>';}
function frame(body,field,step,ageBand,label){const note=ageBand==='EI01'?'Apoio ao adulto: acompanhar olhar, gestos, conforto, pausa ou recusa; realizar a vivência fora da tela.':ageBand==='EI02'?'Apoio ao adulto: oferecer escolhas e exploração no espaço cotidiano, respeitando a participação e a pausa.':'Apoio ao adulto: explorar, conversar e criar com a criança, acolhendo diferentes formas de participação.';return '<svg xmlns="http://www.w3.org/2000/svg" class="ei-learning-scene" viewBox="0 0 600 340" role="img" aria-label="'+esc(label+' '+note)+'" data-ei-field="'+field+'" data-ei-step="'+step+'" data-ei-age="'+ageBand+'" style="width:100%;height:auto;max-height:29rem"><title>'+esc(fields[field])+'</title><rect x="4" y="4" width="592" height="332" rx="24" fill="#f5f1ff" stroke="#d6cbed" stroke-width="2"/>'+ground()+body+'</svg>';}
function render(field,step,ageBand){
 if(!Object.hasOwn(fields,field)||!Number.isInteger(step)||step<0||step>2||!ages.includes(ageBand))throw Error('Cena da Educação Infantil inválida.');
 const age=ages.indexOf(ageBand),tone=skins[(Object.keys(fields).indexOf(field)+step+age)%skins.length],other=skins[(Object.keys(fields).indexOf(field)+step+age+2)%skins.length],count=ageBand==='EI03'?3:2;
 let b='',label=labels[field][step];
 if(field==='EO'){
  if(step===0)b=person(112,65,1,tone,green,'open')+person(492,132,.73,other,purple,ageBand==='EI01'?'seated-open':'open')+ball(262,212,38)+block(330,172,76);
  if(step===1)b=person(106,67,1,tone,green,'open')+person(487,130,.74,other,purple,ageBand==='EI01'?'seated-point':'point')+ball(273,217,38)+block(344,181,70)+'<path d="M405 208q-42-37-81-12" fill="none" stroke="#8c79b9" stroke-width="3" stroke-dasharray="8 8"/>';
  if(step===2)b=person(92,62,1,tone,green,'open')+person(243,126,.75,other,purple,ageBand==='EI01'?'seated-open':'open')+person(490,126,.75,skins[(age+1)%4],gold,ageBand==='EI01'?'seated-open':'open')+ball(366,225,39)+'<path d="M293 176q68-45 136 0" fill="none" stroke="#8c79b9" stroke-width="4" stroke-dasharray="10 8"/>';
 }
 if(field==='CG'){
  if(step===0){b='<rect x="122" y="174" width="142" height="82" rx="20" fill="#d2c4ef" stroke="'+ink+'" stroke-width="3"/>'+person(184,65,1.03,tone,green,'seated');b+=ageBand==='EI01'?person(212,140,.55,other,gold,'seated'):person(412,132,.76,other,purple,'seated')+'<path d="M366 244h93" stroke="'+ink+'" stroke-width="6" stroke-linecap="round"/>';}
  if(step===1)b=person(106,69,1,tone,green,'open')+'<path d="M208 187q65-46 120 0t133 0l-14 82q-65 30-120 0t-125 1z" fill="#b9dfe1" stroke="'+ink+'" stroke-width="3"/>'+hand(315,153,1.12,other,-13)+'<path d="M272 104q32-23 67-4M352 118q18 17 16 34" fill="none" stroke="#8c79b9" stroke-width="4" stroke-linecap="round"/>';
  if(step===2)b=person(103,66,1,tone,green,'open')+'<path d="M214 263q42-74 93-7t175-17" fill="none" stroke="#b9dfe1" stroke-width="43" stroke-linecap="round"/><path d="M214 263q42-74 93-7t175-17" fill="none" stroke="#477f83" stroke-width="3" stroke-dasharray="7 9"/>'+ball(305,228,35)+hand(365,170,1.03,other,39);
 }
 if(field==='TS'){
  if(step===0)b=person(116,67,1,tone,green,'open')+'<g data-ei-color="purple" data-ei-object="soft-circle" data-object-size="large"><circle cx="295" cy="210" r="55" fill="'+purple+'" stroke="'+ink+'" stroke-width="3"/></g><g data-ei-color="gold" data-ei-object="soft-square" data-object-size="large"><rect x="390" y="158" width="104" height="104" rx="18" fill="'+gold+'" stroke="'+ink+'" stroke-width="3"/></g>';
  if(step===1)b=person(107,70,1,tone,green,'open')+'<rect x="223" y="124" width="291" height="155" rx="15" fill="#fffefa" stroke="#9d8cba" stroke-width="3"/><path data-ei-creation="trace" d="M250 229q39-95 85-14t69-4q13-29 53-5" fill="none" stroke="'+purple+'" stroke-width="13" stroke-linecap="round"/>'+hand(456,165,.92,other,20);
  if(step===2)b=person(99,69,1,tone,green,'open')+person(515,132,.72,other,purple,ageBand==='EI01'?'seated-open':'open')+'<rect x="205" y="137" width="236" height="147" rx="10" fill="#fffefa" stroke="#9d8cba" stroke-width="3"/><g data-ei-creation="free-composition"><path d="M229 234q40-88 85-14t92-30" fill="none" stroke="'+purple+'" stroke-width="12" stroke-linecap="round"/><rect x="328" y="163" width="70" height="53" rx="11" fill="'+gold+'"/><circle cx="258" cy="173" r="22" fill="'+green+'"/></g>';
 }
 if(field==='EF'){
  if(step===0)b=person(112,61,1.05,tone,green,'open')+person(508,134,.72,other,purple,ageBand==='EI01'?'seated-open':'open')+book(220,139,235);
  if(step===1)b=person(104,65,1,tone,green,'open')+person(511,133,.72,other,purple,ageBand==='EI01'?'seated-point':'point')+book(213,140,234)+hand(453,211,.65,other,-70);
  if(step===2)b=person(109,63,1.02,tone,green,'open')+person(508,130,.74,other,purple,ageBand==='EI01'?'seated-open':'open')+book(215,146,228)+'<g data-ei-communication="gesture-or-sound"><path d="M150 88q15-8 30 0m-26-14q19-12 38 0M460 161q-14-8-28 0m24-13q-18-11-36 0" fill="none" stroke="#8c79b9" stroke-width="4" stroke-linecap="round"/></g>';
 }
 if(field==='ET'){
  label+=' São '+(count===2?'dois':'três')+' objetos grandes.';
  if(step===0){b=person(105,66,1,tone,green,'open');for(let i=0;i<count;i++)b+=i===1?block(245+i*95,181,69):ball(280+i*95,219,35,i?purple:gold);}
  if(step===1){b=person(92,65,.98,tone,green,'open')+box(196,180,142,90)+box(385,180,142,90)+ball(265,202,31)+block(424,170,61);if(count===3)b+=ball(352,133,31,purple);b+=hand(341,85,.75,other,25);}
  if(step===2){b=person(100,64,.98,tone,green,'open');for(let i=0;i<count;i++){const x=239+i*103;b+='<ellipse data-ei-place="base" cx="'+x+'" cy="267" rx="45" ry="14" fill="#b9dfe1" stroke="#477f83" stroke-width="2"/>'+ball(x,229,32,i%2?purple:gold);}}
 }
 return frame(b,field,step,ageBand,label);
}
return {render};
});
