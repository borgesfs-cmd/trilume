"""Acervo autoral de reconhecimento por escolha; não substitui produção, ação ou investigação."""
import json, pathlib, hashlib
root=pathlib.Path(__file__).resolve().parent.parent

def write(name,variable,data):
 text=json.dumps(data,ensure_ascii=False,indent=2)+'\n'
 (root/'data'/f'{name}.json').write_text(text)
 (root/'data'/f'{name}.js').write_text('window.'+variable+' = '+json.dumps(data['skills'],ensure_ascii=False,separators=(',',':'))+';\n')

def item(y,sub,v):
 # Primeiro elemento da lista é a resposta; posição é balanceada ao salvar.
 if sub=='Língua Portuguesa':
  if y==1:
   word=['FITA','MALA','PATO','BOLA'][v];return f'Olhe a palavra {word}. Qual é a primeira letra?', [word[0], {'F':'M','M':'P','P':'T','B':'D'}[word[0]],'A'], 'Olhe a letra que vem antes das outras.'
  if y==2:
   place=['jardim','pátio','biblioteca','sala de arte'][v];return f'Leia: "Na segunda-feira, a turma vai ao {place}." Aonde a turma vai?', [place.capitalize(),'Refeitório','Quadra'],'Procure o lugar escrito no recado.'
  if y==3:
   first,second=[('lavou a fruta','comeu a fruta'),('abriu o livro','leu a história'),('plantou a semente','regou a terra'),('pegou o papel','fez o desenho')][v];return f'Leia: "Lia {first}. Depois, {second}." O que Lia fez primeiro?', [first.capitalize(),second.capitalize(),'Não é possível saber'],'Procure o que vem antes de "depois".'
  if y==4:
   who=['Ana','Bia','Davi','Caio'][v];return f'{who} encontrou Jo. Queremos dizer que {who} agradeceu. Qual frase deixa isso claro?', [f'{who} agradeceu.','A pessoa agradeceu.','Alguém agradeceu.'],'Escolha a frase que nomeia quem fez a ação.'
  if y==5:
   topic=['mais sombra no pátio','mais livros na biblioteca','menos desperdício de água','uma rampa na entrada'][v];evidence=['Medir o calor e observar onde falta sombra.','Contar os empréstimos e ouvir os leitores.','Comparar o consumo e procurar vazamentos.','Observar as barreiras de acesso na entrada.'][v];return f'A turma defende {topic}. Que informação ajuda a apoiar essa proposta?', [evidence,'A cor da capa do caderno.','O número da sala do professor.'],'Procure uma informação ligada ao problema da proposta.'
  if y==6:
   text,answer=[('Lia fechou o guarda-chuva molhado ao entrar.','Pode estar chovendo lá fora.'),('Ivo pegou um casaco e disse que estava tremendo.','Ivo pode estar com frio.'),('Bia trouxe toalha e roupa de banho para a piscina.','Bia pode querer nadar.'),('Davi colocou os livros na mochila antes de sair para a escola.','Davi se preparou para levar os livros.')][v];return f'Leia: "{text}" Qual conclusão tem apoio no texto?', [answer,'A pessoa está com raiva.','A pessoa perdeu uma chave.'],'Use uma pista do texto, sem inventar fatos.'
  if y==7:
   place=['praça','ponto de ônibus','sala de espera','pátio'][v];return f'Uma proposta pede bancos na {place}. Qual dado ajuda a justificá-la?', ['Pessoas esperam em pé por falta de assento.','O título da proposta tem quatro palavras.','O papel usado é branco.'],'Ligue a evidência à necessidade de assentos.'
  if y==8:
   event=['mudou o horário','alterou o percurso','trocou o material','ampliou a sala'][v];return f'O fato é: "A escola {event}." Qual frase acrescenta uma avaliação favorável?', ['A escola fez uma boa mudança.','A escola anunciou a mudança.','A mudança foi registrada ontem.'],'Uma avaliação expressa um julgamento sobre o fato.'
  return f'Um texto afirma: "A proposta {v+1} melhorará a aprendizagem de todas as turmas." O que é preciso verificar?', ['As evidências, as condições e os limites dessa afirmação.','Somente a data impressa.','Somente o número de parágrafos.'],'Uma afirmação ampla exige evidências e limites claros.'
 if sub=='Matemática':
  n=v+3
  if y==1:return 'Conte as bolinhas: '+'● '*n+'\nQuantas há ao todo?',list(map(str,[n,n-1,n+1])),'Toque ou aponte uma bolinha de cada vez.'
  if y==2:return f'Havia {n+5} lápis. A turma usou {v+2}. Quantos sobraram?',list(map(str,[n+5-(v+2),n+5+(v+2),v+2])),'Pense no total e na parte que saiu.'
  if y==3:return f'Há 3 caixas com {v+2} lápis em cada uma. Quantos lápis há?',list(map(str,[3*(v+2),3+v+2,3*(v+2)+1])),'Conte os grupos iguais ou some as três quantidades.'
  if y==4:return f'Uma barra tem {2*n} pedaços iguais. Quantos pedaços formam a metade?',list(map(str,[n,2*n,n-1])),'Metade é uma das duas partes iguais do total.'
  if y==5:
   decimal,fraction,wrong=[('0,5','1/2','1/5'),('0,25','1/4','1/2'),('0,75','3/4','1/4'),('0,2','1/5','1/2')][v];return f'Qual fração representa {decimal}?',[fraction,wrong,'2/1'],'Relacione a parte decimal a partes iguais de um inteiro.'
  if y==6:return f'Quanto é 25% de {4*n}?',list(map(str,[n,2*n,4*n-25])),'25% corresponde à quarta parte.'
  if y==7:return f'A temperatura passou de −{v+2} °C para {v+3} °C. Quanto ela aumentou?',list(map(str,[2*v+5,1,2*v+6])),'Conte a distância até zero e depois até a temperatura final.'
  if y==8:return f'Um caderno custa {v+4} reais. Quanto custam 3 cadernos pelo mesmo preço?',list(map(str,[3*(v+4),v+7,3*(v+4)+1])),'O preço de cada caderno é o mesmo.'
  x=v+2;n=2*x+3;return f'Na regra y = 2x + 3, qual é y quando x = {x}?',list(map(str,[n,n-1,n+1])),'Substitua x, multiplique por 2 e some 3.'
 if sub=='Ciências':
  if y==1:
   a,b=['pano e colher de metal','esponja e pedra','papel e copo de vidro','borracha macia e bloco de madeira'][v].split(' e ');return f'Compare {a} e {b}. Qual costuma ser mais fácil de dobrar ou apertar?', [a.capitalize(),b.capitalize(),'Os dois têm sempre a mesma flexibilidade.'],'Pense em como cada material muda de forma sem quebrar.'
  if y==2:
   plants=['feijoeiro','girassol','hortelã','manjericão'];return f'Como acompanhar o crescimento de um {plants[v]} sem danificá-lo?', ['Observar e registrar, mantendo água e luz adequadas.','Arrancar as raízes a cada dia.','Deixar a planta sempre sem água.'],'Observe mudanças ao longo dos dias e cuide da planta.'
  if y==3:
   opaque=['papelão','madeira','tecido grosso','cartolina'][v];return f'Para uma janela que deixe passar luz, qual material escolher: plástico transparente ou {opaque}?', ['Plástico transparente.',opaque.capitalize()+'.','Qualquer um deixa passar a mesma luz.'],'Pense no que permite ver através do material.'
  if y==4:
   chain=['capim → gafanhoto → sapo','folha → lagarta → pássaro','alga → peixe pequeno → peixe maior','capim → coelho → gavião'][v];return f'Observe esta cadeia: {chain}. Qual é o produtor?', [chain.split(' → ')[0].capitalize(),chain.split(' → ')[1].capitalize(),chain.split(' → ')[2].capitalize()],'O produtor produz matéria orgânica; neste exemplo é o organismo que faz fotossíntese.'
  if y==5:
   obj=['copo','prato','pote','jarra'][v];return f'A água de um {obj} aberto diminuiu, sem vazamento. Qual processo pode explicar isso?', ['Evaporação.','Congelamento.','Condensação.'],'Pense na passagem lenta da água líquida para o ar.'
  if y==6:
   solid=['areia','pó de café','terra','pedaços de folhas'][v];return f'Qual método pode reter {solid} misturado com água?', ['Filtração com um filtro adequado.','Acrescentar mais água.','Mexer até desaparecer.'],'O filtro retém partículas conforme seu tamanho.'
  if y==7:
   plant=['maracujá','abóbora','melão','girassol'][v];return f'Faltam polinizadores em uma plantação de {plant}. O que pode ocorrer?', ['Algumas plantas podem formar menos frutos ou sementes.','Todas as plantas vão parar de respirar.','A luz do Sol vai desaparecer.'],'Polinizadores transportam pólen entre flores compatíveis.'
  if y==8:
   obj=['lanterna','luminária','lâmpada','luz de bicicleta'][v];return f'Uma {obj} elétrica está acesa. Em que formas pode transformar energia elétrica?', ['Luz e calor.','Somente energia nuclear.','Somente energia do vento.'],'Observe a luz e o aquecimento do dispositivo.'
  change=['gelo derretendo','água evaporando','vapor condensando','água congelando'][v];return f'Qual exemplo é mudança de estado físico: {change}, papel queimando ou ferro enferrujando?', [change.capitalize(),'Papel queimando.','Ferro enferrujando.'],'Na mudança de estado, a substância permanece a mesma.'
 if sub=='História':
  if y<=3:
   source=['uma carta antiga','uma fotografia antiga','um brinquedo antigo','um relato gravado'][v];return f'Vamos conhecer outro tempo com {source}. O que ajuda a interpretar esse registro?', ['Saber de quando é, quem o fez e o que ele mostra.','Imaginar que tudo no passado era igual.','Desconsiderar outros registros.'],'Compare o registro com seu tempo e com outras fontes.'
  subject=['uma praça','uma fábrica','uma estrada','uma lei'][v];return f'Duas fontes contam coisas diferentes sobre {subject}. Como começar a comparação?', ['Ver quem produziu cada fonte, quando e com qual finalidade.','Escolher a fonte com o título mais bonito.','Ignorar o contexto das duas fontes.'],'Autoria, época e finalidade ajudam a entender cada perspectiva.'
 if sub=='Geografia':
  if y<=3:
   symbol,place=[('★','biblioteca'),('▲','parque'),('●','escola'),('■','mercado')][v];return f'Na legenda do mapa, {symbol} significa {place}. O que esse símbolo marca?', [place.capitalize(),'A temperatura do dia.','A idade das pessoas.'],'A legenda explica o significado dos símbolos do mapa.'
  if y==4:
   food=['arroz','feijão','milho','mandioca'][v];return f'O {food} chega do campo à feira. Que atividades fazem parte desse caminho?', ['Produção, transporte e venda.','Somente a venda.','Somente o transporte.'],'Pense na origem, no deslocamento e no destino do alimento.'
  if y==5:return f'População: lugar A, {100+20*v}; lugar B, {200+20*v}; lugar C, {150+20*v}. Qual tem mais habitantes?', ['Lugar B.','Lugar A.','Lugar C.'],'Compare as três quantidades indicadas.'
  if y==6:return f'Em um mapa, 1 cm representa {v+2} m. Quantos metros representam 3 cm?',list(map(str,[3*(v+2),v+5,3*(v+2)+1])),'Use a mesma relação de escala para cada centímetro.'
  if y==7:
   theme=['renda','consumo de água','produção agrícola','uso de energia'][v];return f'Dois lugares têm a mesma média de {theme}. O que ainda precisamos conhecer?', ['Como os valores se distribuem entre pessoas ou grupos.','A média prova que todos têm o mesmo valor.','A média dispensa outras informações.'],'Uma média pode esconder diferenças dentro de cada lugar.'
  product=['celular','camiseta','chocolate','bicicleta'][v];return f'Um produto, como {product}, passa por vários países. O que isso mostra?', ['Conexões entre lugares na produção, no transporte e no consumo.','Que todos os países fazem a mesma etapa.','Que os lugares não dependem de conexões.'],'Siga as etapas e os lugares envolvidos no produto.'
 if sub=='Arte':
  if y==1:
   form=['triângulo','quadrado','losango','retângulo'][v];return f'Entre {form}, círculo e linha ondulada, qual forma tem apenas linhas retas?', [form.capitalize(),'Círculo.','Linha ondulada.'],'Observe o contorno da forma.'
  if y==2:
   pattern=['● – ●','● ● –','– ● ●','● – –'][v];right=pattern.replace('●','som').replace('–','pausa');return f'● significa som; – significa pausa. Qual leitura corresponde a {pattern}?', [right,'Som contínuo, sem pausa.','Pausa contínua, sem som.'],'Leia os sinais em ordem, um por vez.'
  if y==3:
   a,b=[('a semente','a árvore'),('o amanhecer','a noite'),('o ensaio','a apresentação'),('a tinta na paleta','a pintura pronta')][v];return f'Uma sequência mostra primeiro {a} e depois {b}. Como manter essa ordem?', [f'Mostrar {a} antes de {b}.',f'Mostrar {b} antes de {a}.','Retirar as duas imagens.'],'Observe qual acontecimento foi apresentado primeiro.'
  part=['cores','formas','gestos','sons'][v];return f'Em um projeto artístico, como escolher {part} com intenção?', ['Relacionar a escolha ao que se quer expressar e experimentar seus efeitos.','Copiar sem pensar na intenção.','Afirmar que só existe uma escolha correta.'],'A escolha pode ser explicada pelo efeito que você quer criar.'
 if sub=='Educação Física':
  game=['lançar ao alvo','passar a bola','percorrer um circuito','dançar em grupo'][v];return f'Na atividade de {game}, uma criança precisa de uma adaptação. O que ajuda a participar?', ['Combinar uma adaptação de material, espaço ou regra com segurança.','Excluir a criança da atividade.','Obrigar todos a fazer exatamente do mesmo jeito.'],'Preserve o propósito da brincadeira e planeje formas acessíveis de participar.'
 if sub=='Ensino Religioso':
  event=['uma festa','uma tradição','um símbolo','uma narrativa'][v];return f'A turma vai conhecer {event} de uma comunidade. Qual atitude respeita a diversidade?', ['Ouvir e estudar sem obrigar ninguém a aderir à crença.','Exigir que todos tenham a mesma crença.','Ridicularizar quem pensa diferente.'],'Conhecer uma tradição é compatível com a liberdade de consciência.'
 if sub=='Língua Inglesa':
  if y==6:
   hobby=['music','soccer','drawing','reading'][v];return f'Read: "My name is Kim. I like {hobby}." What does Kim like?', [hobby,'sleeping','cooking'],'Procure a informação que vem depois de "I like".'
  if y==7:
   a,b=[('open the book','take a card'),('read the title','look at the picture'),('take a pencil','write your name'),('close the box','give it to Jo')][v];return f'Read: "First, {a}. Then, {b}." What comes first?', [a,b,'Go home.'],'A palavra "First" indica a primeira ação.'
  if y==8:
   place,reason=[('library','borrow books'),('park','play outside'),('market','buy fruit'),('kitchen','cook lunch')][v];return f'Read: "I go to the {place} to {reason}." Why does the person go there?', [f'To {reason}.','To repair a car.','To fly a plane.'],'Procure a finalidade apresentada depois de "to".'
  idea=['We need trees because they provide shade.','We need books because reading helps us learn.','We need ramps because everyone needs access.','We should save water because it is essential.'][v];return f'Read: "{idea}" What does "because" introduce?', ['A reason.','A date.','A name.'],'"Because" liga uma afirmação à sua razão.'
 raise ValueError((y,sub))

def main():
 data=json.loads((root/'data/catalog.json').read_text())
 for s in data['skills']:
  if s.get('touchRevision')=='0.4':continue
  if 1<=s['year']<=9:
   for a in s['activities']:
    if a['type']=='human':a.update(learnerPrompt='Faça esta atividade com o tutor. Você pode falar, apontar ou mostrar.',tutorInstruction=a['prompt'],responseMode='adult_observation',version=a['version']+1)
   for v,phase in enumerate(['baseline','practice','transfer','maintenance']):
    prompt,opts,hint=item(s['year'],s['subject'],v);correct=opts[0];pos=(s['year']+int(s['id'].split('-')[-1])+v)%len(opts);opts=opts[-pos:]+opts[:-pos] if pos else opts
    s['activities'].append(dict(id=s['id']+'-TOUCH-'+str(v+1),version=1,phase=phase,type='choice',prompt=prompt,options=opts,answer=str(opts.index(correct)),hints=[hint,'Compare uma opção de cada vez com o que a atividade pede.'],reference='Resposta de referência: '+correct,rubric='Reconhecimento de uma parte do objetivo por escolha. Não comprova produção, investigação, execução ou domínio integral da habilidade.',recognitionOnly=True,requiresMaterial=False,responseMode='touch',languageLevel=s['year'],readingTarget=s['subject'] in ['Língua Portuguesa','Língua Inglesa']))
  for a in s['activities']:
   if a['type']=='short':
    old=a['answer'];accepted=old if isinstance(old,list) else [old]
    if s['id']=='FUN-LEI-01':
     i=int(a['id'].split('-')[-1]);correct,d1,d2=[('Sala 8','Sala 2','Sala 5'),('16h','9h','14h'),('Laboratório','Biblioteca','Pátio'),('Terça-feira','Quinta-feira','Sexta-feira'),('Sala 5','Sala 2','Sala 8')][i%5];opts=[correct,d1,d2]
    else:
     correct=str(accepted[0]);n=int(str(correct).strip());opts=[correct,str(n-1),str(n+1)]
    pos=len(a['id'])%3;opts=opts[pos:]+opts[:pos];a.update(type='choice',answer=str(opts.index(correct)),options=opts,acceptedTextAnswers=accepted,recognitionOnly=True,responseMode='touch',version=a['version']+1)
  s['version']+=1;s['touchRevision']='0.4'
 write('catalog','TRILUME_CATALOG',data)
 early=json.loads((root/'data/early-childhood.json').read_text())
 for s in early['skills']:
  if s.get('touchRevision')=='0.4':continue
  for a in s['activities']:
   if a['type']=='human':a.update(learnerPrompt='Vamos brincar juntos. O adulto vai mostrar o combinado.',tutorInstruction=a['prompt'],responseMode='adult_observation',version=a['version']+1)
  s['version']+=1;s['touchRevision']='0.4'
 write('early-childhood','TRILUME_EI_CATALOG',early)
if __name__=='__main__':main()
