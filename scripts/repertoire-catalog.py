"""Protocolo pedagógico autoral. Não reproduz itens, escores ou normas do IAR."""
import pathlib,json,hashlib
root=pathlib.Path(__file__).resolve().parent.parent
areas=[('corpo','Esquema corporal'),('lateral','Lateralidade'),('posicao','Posição'),('direcao','Direção'),('espaco','Espaço'),('tamanho','Tamanho'),('quantidade','Quantidade'),('forma','Forma'),('visual','Discriminação visual'),('auditiva','Discriminação auditiva'),('oral','Comunicação e nomeação'),('analise','Análise e síntese'),('motora','Coordenação motora fina')]
skills=[]
for d,(area,title) in enumerate(areas):
 sid='REP-'+area.upper();acts=[]
 for k in range(12):
  v=k%3;typ='human' if area in ['corpo','lateral','oral','motora'] else 'choice';a=dict(id=sid+'-'+str(k+1),version=1,phase='baseline' if k<9 else 'practice',type=typ,probeForm=['initial','probe-a','probe-b','teaching'][k//3],itemFamily=sid+'-'+str(v+1),rubric='Registrar ação observada e condições de acesso. Separar ajuda instrucional de acesso. Comparar oportunidades sem diagnóstico ou nota de prontidão.',requiresMaterial=typ=='human',responseMode='adult_observation' if typ=='human' else 'touch',reference='Observação pedagógica contextual. Interpretar com o educador e planejar novas oportunidades.')
  opts=None
  if area=='corpo':
   part=['cabeça','pé','cotovelo','ombro','joelho','orelha','mão','nariz','tornozelo','barriga','queixo','braço'][k];a['prompt']='Mostre onde fica seu '+part+'.' if part in ['pé','cotovelo','ombro','joelho','nariz','tornozelo','queixo','braço'] else 'Mostre onde fica sua '+part+'.'
  elif area=='lateral':a['prompt']=['Mostre sua mão direita.','Mostre seu pé esquerdo.','Levante sua mão esquerda.','Mostre seu pé direito.','Toque seu ombro direito.','Toque sua orelha esquerda.','Mostre seu joelho direito.','Mostre seu cotovelo esquerdo.','Toque sua orelha direita.','Levante seu braço esquerdo.','Toque seu joelho esquerdo.','Mostre seu braço direito.'][k]
  elif area=='oral':a.update(prompt='Conte ao tutor o que você conhece nesta figura. Você pode falar, apontar ou usar sua comunicação.',studentMaterial=['⚽','🐈','🍌','🚌','🧳','🌳','📚','🐸','☂️','🏠','🎂','🦆'][k])
  elif area=='motora':a['prompt']=['Coloque este bloco grande dentro do pote.','Siga com o dedo o caminho que o adulto preparou.','Monte uma torre com estes blocos grandes.','Abra este pote fácil de abrir.','Encaixe estas argolas grandes.','Encaixe estes blocos grandes.','Faça uma marca no papel com o material que você usa.','Vire uma página deste livro.','Leve estes blocos grandes até a caixa.','Monte uma ponte com blocos grandes.','Passe o dedo pelo contorno desta forma.','Feche este pote fácil de fechar.'][k]
  elif area=='posicao':a.update(prompt='Onde está a bolinha em relação ao quadrado?',visualKind='position',positionIndex=v,variant=k//3);opts=['Em cima.','Embaixo.','Ao lado.'];correct=opts[v]
  elif area=='direcao':a.update(prompt='Para onde a seta aponta?',studentMaterial=['↑','↓','→','←'][k%4]);opts=['Para cima.','Para baixo.','Para a direita.','Para a esquerda.'];correct=opts[k%4]
  elif area=='espaco':a.update(prompt='A bolinha está dentro ou fora da caixa?',studentMaterial='[ ● ]' if k%2==0 else '● [   ]');opts=['Dentro.','Fora.'];correct=opts[k%2]
  elif area=='tamanho':a.update(prompt='Toque no círculo '+('maior.' if k%2==0 else 'menor.'),visualKind='size');opts=['Grande','Pequeno'];correct=opts[k%2]
  elif area=='quantidade':
   n=2+k%5;a.update(prompt='Quantas bolinhas há?',studentMaterial='● '*n);opts=list(map(str,[n,n+1,n-1]));correct=opts[0]
  elif area=='forma':a.update(prompt='Qual forma é igual ao modelo?',studentMaterial=['○','□','△'][v]);opts=['○','□','△'];correct=opts[v]
  elif area=='visual':a.update(prompt='Qual par é igual ao modelo?',studentMaterial=['○ △','□ ○','△ □','◇ △'][k%4]);opts=[a['studentMaterial'],'◇ ○' if k%4!=1 else '○ ◇','□ ◇'];correct=opts[0]
  elif area=='auditiva':a.update(prompt='Ouça as duas palavras. Elas são iguais ou diferentes?',audioRequired=True,stimulusAudio=['mala. mala.','pato. gato.','bola. bolo.','fita. fita.','sapo. papo.','casa. casa.','gato. gato.','mala. bala.','pato. pato.','bolo. bolo.','cama. cana.','faca. fada.'][k]);opts=['Iguais.','Diferentes.'];correct=opts[0 if a['stimulusAudio'].split('. ')[0]==a['stimulusAudio'].split('. ')[1].rstrip('.') else 1]
  elif area=='analise':
   word=['PATO','BOLA','MALA','SAPO','CASA','FITA','GATO','BOLO','CAMA','FACA','LATA','MAPA'][k];a.update(prompt='Junte as partes. Qual palavra aparece?',studentMaterial=word[:2]+' + '+word[2:],readingTarget=True);opts=[word,word[2:]+word[:2],word[:2]+'PA' if word[2:]!='PA' else word[:2]+'TO'];correct=word
  if opts:
   pos=(d+k)%len(opts);opts=opts[pos:]+opts[:pos];a.update(options=opts,answer=str(opts.index(correct)),hints=['Observe uma parte de cada vez com o tutor.','Compare o modelo com cada opção.'])
  else:a.update(learnerPrompt=a['prompt'],tutorInstruction='Prepare material acessível e seguro. Apresente apenas este pedido. Durante a sondagem, não demonstre a resposta. Aceite gestos ou comunicação alternativa. Registre a condição. Para lateralidade, observe o próprio corpo da criança, sem espelhamento.')
  a['stimulusKey']=hashlib.sha256(json.dumps([a['prompt'],a.get('studentMaterial'),a.get('stimulusAudio'),a.get('visualKind'),a.get('positionIndex')],ensure_ascii=False).encode()).hexdigest()
  acts.append(a)
 skills.append(dict(id=sid,version=1,year=0,stage='all',lane='foundation',repertoireDomain=area,evaluationMode='observational',subject='Repertórios básicos',title=title,objective='Observar '+title.lower()+' em oportunidades acessíveis e planejar apoios a partir do que a criança faz.',content='Experimente relações e ações em brincadeiras, com materiais acessíveis. As observações orientam o ensino e não condicionam o acesso à alfabetização.',model='No ensino, o adulto apresenta um exemplo, acolhe a tentativa, oferece a ajuda necessária e a reduz em novas oportunidades. Durante a sondagem, apenas apresenta o pedido e registra a resposta.',prerequisites=[],duration=4,criterion=dict(threshold=.8,minTrials=5,minSessions=2,reviewDays=[2,7,21]),bnccCode=None,bnccStatus='Protocolo pedagógico autoral, sem equivalência com teste padronizado.',status='initial',source='Referência de organização: IAR, Sérgio Antônio da Silva Leite; leitura crítica: Lima e Hora (2020), DOI 10.24065/2237-9460.2020v10n1ID1501. Atividades autorais; sem itens ou normas do instrumento.',activities=acts))
data=dict(schemaVersion=1,title='Trilume — repertórios e sondagens pedagógicas',skills=skills)
(root/'data/repertoire.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
(root/'data/repertoire.js').write_text('window.TRILUME_REPERTOIRE_CATALOG = '+json.dumps(skills,ensure_ascii=False,separators=(',',':'))+';\n')
