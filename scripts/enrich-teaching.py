"""Revisão autoral dos exemplos de ensino; preserva IDs e incrementa versões."""
import json
from pathlib import Path
examples={}
rows={
1:[
'Na palavra VELA, mostro o V escrito e faço o som /v/ prolongado, sem acrescentar uma vogal. Aproximo VA e VE de palavras conhecidas e construo VELA. Depois comparo o nome da letra com seu som na palavra; identificar um som não é ainda ler toda a palavra.',
'Coloco cinco blocos em fila. Aponto uma vez para cada bloco enquanto conto e digo: o último número foi cinco, então há cinco. Espalho os mesmos blocos e conto novamente: mudou o espaço, a quantidade continuou cinco.',
'Apresento uma esponja seca e uma colher. Observo que a esponja se comprime quando apertada e a colher metálica mantém a forma. Relaciono a escolha da esponja à absorção, e confiro com uma pequena quantidade de água sob mediação.',
'Em cartões feitos pelo adulto, a semente aparece antes da muda. Organizo preparar o vaso, plantar e acompanhar o crescimento. Explico a ordem pelas mudanças observadas e aviso que o tempo de crescer não aparece inteiro nas figuras.',
'Faço um pequeno croqui: a estante fica à direita da entrada e o tapete à frente. Indico primeiro meu ponto de partida, depois os dois marcos. Percorro com o dedo e confiro no espaço real, aceitando orientação corporal acessível.',
'Desenho uma curva para um rio e retas para uma ponte. Escolho azul e marrom e explico a intenção, sem dizer que essas são as únicas cores possíveis. Mudo uma forma e converso sobre o efeito na composição.',
'Marco um percurso curto e livre de obstáculos. Demonstro atravessá-lo andando ou deslocando um objeto com as mãos, conforme as possibilidades. Antes de começar, confiro espaço e conforto e combino um sinal de pausa.',
'Em uma situação fictícia, Lia não participa de determinada celebração. Digo: você pode nos contar algo que queira ou escolher outra forma de participar. Mostro como o convite respeita a liberdade de falar e de não declarar crença.'
],
2:[
'Leio o aviso fictício: Oficina de desenho, quarta-feira, no jardim. Pergunto onde. Localizo no jardim e aponto o trecho que sustenta a resposta. Explico que escrever um aviso novo é uma habilidade de produção, diferente de localizar essa informação.',
'Com dez fichas, retiro quatro e conto as seis restantes: 10 − 4 = 6. Depois junto dois conjuntos de três e quatro fichas: 3 + 4 = 7. Comparo retirar e juntar antes de escolher o símbolo da operação.',
'Observo uma planta saudável perto da janela e registro folhas, luz e condição do solo. Proponho acompanhar sem retirar recursos essenciais. Distingo o registro de hoje da hipótese de que mudar a iluminação pode alterar o crescimento.',
'Comparo um telefone com fio e um celular. Ambos permitem comunicação, mas têm materiais, tamanho e recursos diferentes. Identifico o que consigo observar e o que precisaria pesquisar sobre sua época e seus usos.',
'Em dois desenhos fictícios do mesmo quarteirão, a árvore e a calçada permanecem, mas surge uma rampa. Aponto a mudança e relaciono-a à circulação, sem afirmar que uma imagem mostra toda a vida do bairro.',
'Produzo palma, silêncio, palma, palma, em volume confortável. Represento cada som com um ponto e a pausa com um espaço. Acompanho a sequência devagar e depois convido a criar outra; reprodução e criação serão observadas separadamente.',
'Em um jogo de levar peças a uma caixa, explico onde começa e quando termina. Se alguém não alcança a caixa, aproximo o alvo com acordo do grupo. Mostro que a mudança amplia participação e preserva a finalidade da brincadeira.',
'Mostro uma bandeira fictícia desenhada pelo grupo para representar acolhimento. Explico o significado atribuído nesse contexto e pergunto se o símbolo teria o mesmo sentido em outro lugar. Não atribuo crença pessoal a quem participa.'
],
3:[
'Apresento o relato: Primeiro o grupo preparou a terra. Depois plantou sementes. Por fim regou o vaso. Reconheço as três ações e as palavras que as conectam; reconto oralmente. Antes da escrita, organizo esses acontecimentos em cartões.',
'Formo dois grupos de cinco blocos e conto dez ao todo: 2 × 5 = 10. Reparto os mesmos dez em dois grupos iguais e confiro cinco em cada: 10 ÷ 2 = 5. Distingo número de grupos e quantidade por grupo.',
'Com uma lanterna comum, sem dirigir a luz aos olhos, comparo cartão opaco e plástico transparente na mesma posição. Registro o que vejo, mantendo distância e fonte constantes. Evito concluir que todo material do mesmo nome se comporta igual.',
'Para conhecer a memória de uma praça, começo perguntando como ela era usada e quem a frequentava. Registro um relato fictício como ponto de vista, não como versão de todos. Busco outra fonte que possa confirmar, complementar ou contrariar a lembrança.',
'Crio um croqui com casa, lago e ponto de ônibus. Defino símbolos e uma legenda antes de pedir o trajeto. Descrevo sair da casa, contornar o lago e chegar ao ponto; confiro se outra pessoa entende usando a legenda.',
'Em três quadros autorais, uma personagem perde uma bola, procura e a encontra. Explico como a posição da bola e a direção do olhar ajudam a ligar as cenas. Experimento mudar a ordem e observo a mudança de sentido.',
'Em uma tarefa coletiva de mover uma bola leve sobre tecido, combinamos funções e um sinal de parada. Ajusto a altura e o modo de segurar para ampliar participação. Registro uma ação concreta de comunicação que ajudou o grupo.',
'Descrevo duas celebrações fictícias: em uma há cantos; em outra, uma refeição coletiva. Comparo ações e finalidades informadas, sem hierarquizar grupos. Explico que pessoas de uma mesma tradição também podem participar de maneiras diferentes.'
],
4:[
'Leio: Ana levou o livro para Joana. Ela agradeceu. Mostro a ambiguidade de ela e reviso: Joana agradeceu. Explico como nomear a personagem ajuda o leitor; depois confiro se a revisão preservou o sentido pretendido.',
'Com doze fichas, construo quatro grupos iguais de três. Uma quarta parte corresponde a um desses grupos: 12 ÷ 4 = 3. Comparo com um desenho repartido em quatro áreas iguais e explicito a ponte entre fração do todo e da quantidade.',
'No modelo capim → gafanhoto → ave, a seta representa a transferência de matéria e energia do alimento para quem o consome. Identifico produtor e consumidores. Explico que o desenho simplifica uma rede maior e omite outras relações.',
'Em registros fictícios de uma escola, antes havia um caminho de terra e depois um piso acessível. Comparo as duas fontes, identifico uma mudança e pergunto para quem ela alterou o acesso. Não infiro experiência de todos a partir de uma foto.',
'Acompanho o caminho fictício de uma fruta: cultivo, transporte, feira e casa. Nomeio o trabalho em cada etapa e a circulação entre lugares. Relaciono o produto a serviços da cidade, sem reduzir campo e cidade a espaços isolados.',
'Crio uma cena de espera usando uma cadeira, um gesto e um silêncio. Demonstro também narrar ou sonorizar como formas de compor a cena. Pergunto como cada escolha comunica a situação e aceito leituras diferentes justificadas.',
'Em um jogo de passar um objeto até um alvo, observo que todos se concentram no mesmo lugar. Combinamos ampliar o espaço e alternar papéis. Testo a estratégia e confiro se ajudou o objetivo e a participação.',
'Apresento uma narrativa autoral de um grupo fictício que preserva uma árvore como memória. Distingo o que a história conta, o valor que transmite e minha interpretação. Não uso esse exemplo como descrição de uma comunidade real.'
],
5:[
'Afirmo que um mural pode facilitar localizar avisos. Apresento um dado fictício: quatro de cinco grupos acharam o horário no teste da turma. Relaciono o dado à afirmação, reconheço a amostra pequena e não concluo que todo mural será eficaz.',
'Divido uma faixa em dez partes iguais e marco sete: 7/10 = 0,7. Depois marco metade de outra faixa do mesmo tamanho: 1/2 = 0,5. Comparo partes da mesma unidade antes de comparar as representações numéricas.',
'Em um registro fictício, um recipiente aberto perdeu água sem vazamento e uma tampa fria apresentou gotículas. Relaciono a passagem do líquido para o vapor à evaporação e a formação de gotículas à condensação. Distingo observação e explicação, sem aquecer materiais com a criança.',
'Em um registro fictício sobre uma praça, diferencio uma regra escrita de acesso e a experiência relatada por moradores. Pergunto quem pôde participar da decisão. Uma regra declarada e sua realização cotidiana precisam de evidências distintas.',
'Em uma tabela fictícia, comparo dois bairros com a mesma população e números diferentes de pontos de ônibus. Identifico unidade e limite: o número de pontos não informa sozinho frequência, distância nem acessibilidade do transporte.',
'Planejo uma pequena exposição de produções da turma. Escolho intenção, materiais e formas de apresentação; registro uma referência e uma revisão. Valorizo o processo e as decisões, sem reduzir a criação a copiar um exemplo.',
'Escolho uma brincadeira conhecida e identifico seu objetivo, suas regras e uma adaptação de espaço. Testo uma versão acessível com o grupo e pergunto como cada pessoa conseguiu participar. O resultado coletivo orienta nova mudança.',
'Em uma situação fictícia de discordância sobre uma tradição, descrevo os pontos de vista e proponho conversar sem exigir adesão. Mostro como uma regra de respeito deve proteger também quem não possui vínculo religioso.'
],
6:[
'Leio: Quando o sinal tocou, Caio fechou o caderno e saiu para o pátio. Está explícito que ele fechou o caderno; é possível inferir uma mudança de atividade. Explico a pista e reconheço que não sabemos sua emoção.',
'Para achar 25% de 40 peças, relaciono 25 de cada 100 à quarta parte. Divido as quarenta em quatro grupos iguais e encontro dez. Confiro que quatro grupos de dez recompõem o total e mantenho a unidade peças.',
'Para uma mistura seca de pedrinhas e areia, escolho peneirar pela diferença de tamanho. Para sal dissolvido em água, a peneira comum não basta. Relaciono método e propriedade; aquecimento não é atividade autônoma da criança.',
'Em duas fontes fictícias sobre a abertura de uma ponte, uma propaganda destaca benefícios e um relato menciona deslocamentos de moradores. Identifico autoria e finalidade antes de comparar as informações; uma fonte não representa todos os grupos.',
'Em escala 1:2.000, um segmento de 3 cm representa 6.000 cm, ou 60 m. Escrevo a conversão para não confundir unidades. Marco também o norte no croqui e explico que orientação é outra informação, não um resultado da escala.',
'Em uma composição autoral com um círculo vermelho sobre fundo cinza, descrevo cor, forma e posição antes de interpretar destaque. Mudo o círculo de lugar e comparo o efeito. A interpretação precisa se apoiar nas escolhas visíveis.',
'Em uma brincadeira com alvo, a regra define lançar de uma linha; a estratégia define direção e força possíveis. Altero a distância com acordo do grupo para ampliar acesso. Distingo a regra comum da escolha feita em cada jogada.',
'Leio o perfil fictício: My name is Sam. I like music. I walk to school. Localizo nome, interesse e uma ação da rotina sem traduzir palavra por palavra. Confiro cada resposta apontando o trecho correspondente.',
'Em um exemplo fictício de encontro cultural, identifico origem das informações e diversidade das participações. Conhecer a manifestação não implica adotá-la. Explico que a liberdade de consciência inclui participar, observar ou não aderir.'
],
7:[
'Comparo a frase todo mundo diz com um relatório que identifica data, autoria e método. Mostro que popularidade não sustenta a conclusão. Confiro o que o relatório realmente mediu e mantenho a conclusão dentro desse limite.',
'Na reta numérica, marco −2 e 3 e conto cinco unidades entre as posições. Em outra reta, marco 0,5 e 1/2 no mesmo ponto. Explico que comparar sinais e reconhecer representações equivalentes são objetivos relacionados, mas distintos.',
'Em uma teia alimentar simplificada, a redução de plantas pode afetar herbívoros e seus consumidores. Descrevo caminhos possíveis e as condições que precisariam ser observadas. Não trato uma previsão do modelo como causa demonstrada.',
'Comparo dois relatos fictícios sobre um encontro entre grupos: um destaca comércio, outro perda de acesso ao território. Situo quem fala e quais interesses aparecem. Procuro evidências adicionais antes de sintetizar o processo.',
'Em dados fictícios, duas regiões têm a mesma renda média e distribuições diferentes. Construo uma lista de valores para mostrar como uma média igual pode esconder desigualdades. Registro ano, unidade e recorte dos dados.',
'Escolho uma textura e uma referência identificada para criar uma composição autoral. Faço duas versões, comparo seus efeitos e explico uma revisão. A referência informa a criação, sem ser tratada como modelo obrigatório.',
'Em um jogo adaptado de passes, vejo que um colega ficou sem opção de receber. Mudo o posicionamento e explico a decisão em função da regra e do objetivo. Verifico o resultado com o grupo, sem classificar pessoas por força ou velocidade.',
'Leio: First, open the box. Then, take a card. Relaciono first e then à ordem de ações e demonstro com uma caixa segura. Depois retiro a demonstração e confiro a compreensão em uma instrução diferente.',
'Em uma situação fictícia, uma liderança organiza uso compartilhado de um espaço. Avalio se a ação ouviu participantes e preservou direitos. Distingo autoridade declarada dos efeitos concretos, sem avaliar o valor de uma crença.'
],
8:[
'Comparo o espaço ficou vazio com o espaço ficou disponível. Aponto como as palavras sugerem avaliações diferentes do mesmo lugar. Relaciono a escolha lexical ao público e à finalidade antes de defender uma interpretação.',
'Se cada kit exige três peças iguais, dois kits exigem seis e quatro exigem doze. Registro y = 3x e confiro a razão y/x para x positivo. Comparo com uma situação com taxa fixa, que não mantém a mesma razão.',
'Em uma lanterna de pilha, descrevo energia armazenada que alimenta o circuito e se transforma em luz e aquecimento. Diferencio fonte e transformação. Não desmonto aparelhos nem conecto atividades à tomada.',
'Em um caso histórico fictício para analisar um modelo de revolução, organizo condições, ações e consequências para dois grupos. Explico que o esquema ajuda a perguntar, mas fatos reais exigem fontes e recortes próprios.',
'Desenho uma rede fictícia de três cidades com fluxos de mercadorias. Uma ponte interrompida altera uma rota e pode aumentar o tempo. Distingo conexão possível de intensidade efetiva e pergunto quais dados faltam.',
'Para comunicar uma travessia, combino três imagens e uma paisagem sonora autoral. Explico a função de cada linguagem e retiro um som para comparar o efeito. Integração depende da relação com a intenção, não da quantidade de recursos.',
'Analiso o anúncio fictício transforme seu corpo em dez dias. Identifico a promessa, o interesse comercial e a ausência de evidência apresentada. Discuto efeitos da mensagem sem comparar nem julgar corpos de participantes.',
'Leio: The library opens at nine. I actually arrive at ten. Confiro library como biblioteca e actually como na verdade, usando contexto. Mostro que semelhança gráfica pode ajudar uma hipótese, mas não garante o sentido.',
'Em uma decisão fictícia sobre uso de um espaço comum, identifico uma preferência pessoal e um direito de participação. Proponho uma regra que preserve ambos sempre que possível e explico como discutir um conflito sem impor crença.'
],
9:[
'Planejo uma tese sobre um espaço de leitura. Escrevo uma razão, um dado fictício claramente identificado e uma objeção sobre acesso. Respondo à objeção sem desqualificar quem discorda e reviso se cada evidência sustenta a tese.',
'Na regra y = 2x + 3, calculo saídas para x = 0, 1 e 2: 3, 5 e 7. Organizo a tabela e os pontos correspondentes no gráfico. Confiro que cada entrada do domínio considerado tem uma única saída.',
'Comparo gelo derretendo e papel sendo queimado em registros fornecidos pelo adulto, sem realizar combustão. Descrevo mudanças e relaciono fusão a mudança de estado. A análise de combustão precisa considerar formação de outras substâncias e evidências.',
'Comparo dois registros fictícios sobre uma decisão pública e identifico quem fala e quais direitos são mencionados. Distingo lembrança, registro e interpretação. Não concluo que uma narrativa isolada representa todo o período histórico.',
'Acompanho um produto fictício da matéria-prima ao descarte e marco efeitos locais e ligações internacionais. Explico que uma conexão global não informa sozinha condições de trabalho de cada lugar; são necessários dados específicos.',
'Planejo um cartaz autoral com uma referência identificada, intenção e público. Registro o que produzi e o que tomei como inspiração. Reviso contraste e legibilidade e explico como essas decisões atendem ao público.',
'Para um encontro de jogos, combino objetivo, espaço, adaptações e sinal de pausa. Pergunto preferências e possibilidades aos participantes, em vez de decidir por aparência. Reviso a proposta a partir do conforto e da participação observados.',
'Escrevo: I think a reading corner helps our class because books become easier to find. For example, we can label the shelves. Identifico posição, razão e exemplo e reviso a adequação ao público sem confundir correção linguística com força da evidência.',
'Em uma situação fictícia de intolerância, identifico a conduta discriminatória, acolho quem foi atingido e proponho regra de proteção e encaminhamento ao adulto responsável. Não exijo que a pessoa revele sua crença para receber apoio.'
],
10:[
'Em dados fictícios, turmas que frequentam a biblioteca também leem mais. Mostro que a associação permite uma hipótese, mas não prova que a visita causou o resultado. Considero interesse prévio e acesso como explicações a investigar.',
'No custo fictício y = 4x + 6, seis é a parcela fixa e quatro o acréscimo por unidade. Calculo valores para zero e duas unidades e obtenho seis e quatorze. Confiro unidades e pergunto em que intervalo a regra é plausível.',
'Em um desenho de célula eucariótica, relaciono membrana à delimitação e a trocas com o meio, e núcleo ao material genético naquele modelo. Explico que organelas e escalas foram simplificadas e que o desenho não representa todos os tipos celulares.',
'Um móvel vai de 2 m a 14 m em 4 s no referencial escolhido. O deslocamento é 12 m e a velocidade média é 3 m/s. Explico que esse valor não informa a velocidade em cada instante e diferencio deslocamento de distância percorrida.',
'Comparo dois modelos de átomo por suas perguntas e limites: um núcleo com região eletrônica permite explicar aspectos que uma esfera indivisível não descrevia. Evito representar órbitas desenhadas como trajetórias exatas de elétrons em qualquer modelo.',
'Para estudar uma comunidade fictícia, divido registros em antes e depois de uma ponte. Explico que esse recorte serve à pergunta sobre circulação e pode não organizar outras comunidades do mesmo modo. Periodização é uma escolha analítica.',
'Comparo dois mapas do mesmo território em escalas diferentes. O de maior detalhamento mostra ruas e o outro destaca conexões regionais. Explico que projeção e recorte alteram a representação e examino legenda e fonte antes da leitura.',
'No argumento todas as aves do grupo observado têm penas; este animal é uma ave desse grupo; portanto tem penas, identifico premissas e conclusão. Separo a relação lógica da necessidade de conferir a verdade das premissas.',
'Em uma escola fictícia, observo uma regra de horário e relatos de estudantes com trajetos diferentes. Relaciono normas, transporte e rotina, sem atribuir atraso a um traço de toda a pessoa. Uma hipótese social requer padrões e dados.',
'Reúno duas referências identificadas e testo materiais para uma produção autoral. Registro a intenção de cada versão, comparo efeitos e justifico uma mudança. Reconheço limites do meu olhar e convido outras leituras.',
'Analiso uma prática corporal por história, regras e condições de acesso. Em uma organização fictícia, mudo espaço e papéis após ouvir participantes. Avalio inclusão e segurança do encontro, sem usar aparência como indicador de saúde.',
'Leio o texto autoral: Our school garden project recorded plant growth weekly. Identifico autoria declarada, ação e periodicidade informada. Pergunto que dados sustentariam uma conclusão sobre crescimento; o enunciado sozinho não prova eficácia.'
],
11:[
'Em dois textos autorais fictícios, uma fonte discute acesso a livros e outra uso do espaço de leitura. Sintetizo a relação sem apagar diferenças e atribuo cada ideia à fonte. Confiro se a paráfrase preserva sentido e traz estrutura própria.',
'Em uma urna com três fichas verdes e três amarelas, com sorteio equiprovável de uma ficha, a probabilidade de verde é 3/6 = 1/2. Separadamente, explico por que entrevistar só voluntários de um clube não representa toda a escola: amostragem é outro alvo.',
'Em um modelo mendeliano simplificado Aa × Aa, organizo AA, Aa, Aa e aa e obtenho 1/4 para aa sob as hipóteses do modelo. Diferencio probabilidade por evento e previsão de um resultado individual; características reais podem envolver muitos genes e ambiente.',
'Uma esfera desce uma rampa. Delimito o sistema e explico a redução de energia potencial gravitacional com aumento de energia cinética e outras transferências. Com atrito, considero aquecimento; não concluo que a energia desapareceu.',
'Balanceio H₂ + O₂ → H₂O contando átomos. Escrevo 2 H₂ + O₂ → 2 H₂O e confiro quatro átomos de H e dois de O de cada lado. Altero coeficientes, preservando as fórmulas; não realizo a reação.',
'Em fontes fictícias sobre uma fábrica, comparo aumento de produção e relatos sobre jornada. Distingo dado, reivindicação e interpretação e pergunto como benefícios e custos se distribuíram. Uma narrativa de progresso não resume todos os grupos.',
'Comparo indicadores fictícios de saneamento de duas áreas no mesmo período e com denominadores equivalentes. Relaciono infraestrutura e moradia, evitando concluir sobre indivíduos a partir da média territorial. Registro fonte e limites.',
'Em um dilema fictício sobre compartilhar um recurso escasso, explicito três critérios: consequências, dever de respeito e distribuição justa. Mostro como cada um sustenta razões e examino uma objeção antes de justificar uma decisão provisória.',
'Em uma amostra fictícia, grupos têm acessos diferentes ao transporte. Calculo e descrevo a diferença antes de propor explicações sobre infraestrutura e renda. Distingo associação observada, hipótese e evidência necessária para uma explicação causal.',
'Uma produção autoral aparece na escola e em uma praça. Comparo visibilidade, acesso e possibilidades de interação nos dois lugares. Explico que mudar o contexto de circulação pode mudar a experiência do público sem alterar toda a obra.',
'Analiso um anúncio fictício de treino que usa uma celebridade como prova. Distingo testemunho, estudo e promessa comercial. Pergunto quais resultados e condições foram medidos antes de discutir uma escolha educativa; não prescrevo treino clínico.',
'Escrevo: A quiet room may help some students study; however, access also matters. Identifico posição, razão e ressalva. Ajusto a mensagem a um conselho escolar e confiro termos sem usar tradução automática como prova de argumentação.'
],
12:[
'Planejo um artigo autoral sobre um problema fictício de circulação na escola. Delimito pergunta, fontes, tese e contraponto; reviso se os dados realmente sustentam as conclusões. Registro contribuições de pessoas e ferramentas e assumo a conferência final.',
'Comparo dois modelos fictícios de custo: A = 2x + 12 e B = 4x. Igualo as expressões e encontro x = 6. Confiro valores antes e depois e explico que a decisão muda se houver outra taxa, limite ou unidade.',
'Em uma população hipotética há variação herdável de uma característica. Se certas variantes deixam mais descendentes em um contexto, suas frequências podem mudar entre gerações. Distingo seleção de uma mudança por vontade ou necessidade individual.',
'Em um circuito idealizado representado no papel, com resistência de 3 Ω e tensão de 6 V, uso I = V/R e obtenho 2 A. Nomeio cada unidade e os limites do modelo. Nenhuma montagem usa tomada ou rede elétrica.',
'Em um processo representado por dados fictícios, o produto gera menos resíduo por unidade, mas consome mais água. Identifico substâncias, condições e fronteiras da comparação antes de avaliar impacto. Uma única medida não comprova superioridade ambiental geral.',
'Em duas fontes fictícias sobre uma política pública, verifico autoria, data, finalidade e dados apresentados. Distingo memória, propaganda e análise de pesquisa. Explicito a controvérsia e o que as fontes ainda não permitem concluir.',
'Em um caso geopolítico fictício sobre um rio compartilhado, identifico territórios, usos e interesses. Comparo cenários de cooperação e disputa com hipóteses explícitas. Não trato uma simulação como previsão de acontecimentos reais.',
'Uma ferramenta apresenta uma conclusão sem fontes. Reconstruo a alegação, peço critérios e busco evidências antes de aceitar. Explico que fluência da resposta não substitui justificação e examino uma objeção à minha própria posição.',
'Para um projeto fictício de acesso à leitura, defino problema, participação e uma hipótese de ação. Escolho indicador de acesso e escuto usuários; se o resultado não melhora, reviso condições e estratégia. Não atribuo causalidade por uma comparação isolada.',
'Planejo uma mostra autoral com objetivo, público, etapas, atribuição e recursos acessíveis. Antecipadamente combino critérios de observação. Após uma apresentação piloto, reviso uma barreira de acesso com base em retorno concreto.',
'Com participantes, planejo práticas corporais de interesse, locais e recursos disponíveis. Combino formas de participação e revisão do plano quando a rotina muda. O objetivo educativo é participação continuada, sem prescrição clínica individual.',
'Planejo em inglês uma apresentação autoral: pergunta, fonte identificada, mensagem central e convite a uma pergunta. Reviso clareza para o público escolhido e preparo uma resposta que reconheça informações ainda desconhecidas.'
]
}
for year,texts in rows.items():
 for i,text in enumerate(texts,1):examples[f'CUR-{year:02}-{i:02}']=text
examples.update({
'FUN-LEI-01':'No aviso fictício Encontro de leitura: sábado, no jardim, pergunto quando. Localizo sábado e aponto a palavra no aviso. Explico por que no jardim responde a onde e não a quando. A verificação usará outro aviso.',
'FUN-LEI-02':'Leio: Dora entrou com os sapatos encharcados e abriu um guarda-chuva molhado. A hipótese de chuva se apoia nessas pistas, mas não sei quando começou. Distingo essa inferência de uma informação explicitamente declarada.',
'FUN-DEC-01':'Com a palavra de ensino VELA, relaciono letras e sons, começo pelo /v/ e componho a leitura conforme o repertório do estudante. Diferencio ler, copiar e reconhecer uma figura. A verificação usa palavra nova e registro da leitura efetiva; o material respeita a idade.',
'FUN-MAT-01':'Na organização fictícia de uma caixa, havia 21 peças e foram retiradas 8. Represento 21, decomponho a retirada em 1 e 7, e encontro 13. Confiro por 13 + 8 = 21 e nomeio a unidade peças.',
'FUN-MAT-02':'Distribuo 28 fichas em quatro grupos iguais: cada grupo recebe 7. Confiro 4 × 7 = 28 e diferencio total, número de grupos e quantidade por grupo. Depois comparo com descobrir quantos grupos de sete cabem no total.',
'FUN-MAT-03':'Em 36 peças, a quarta parte é 36 ÷ 4 = 9. Relaciono 1/4 a 25% usando a mesma unidade. Para comparar ofertas, identifico primeiro o preço de referência e não comparo apenas os percentuais.',
'FUN-ESC-01':'Para convidar um grupo, escrevo: Oficina de desenho, sábado, às 10h, no pátio. Confiro quem lerá e quais informações precisa. Reviso uma informação ausente antes de discutir ortografia e não copio esse aviso na verificação.',
'FUN-AUT-01':'Combino ler um aviso e organizar três materiais. Mostro a lista visível e marco cada etapa feita; se preciso de pausa, guardo o ponto de retomada. Ao encerrar, registro o que fiz e o que ficou para outro encontro, sem acrescentar tarefas.'
})
subjects={
'Língua Portuguesa':('Vamos usar a linguagem para compreender e fazer uma mensagem chegar a alguém.','Escolha ler, ouvir uma explicação de ensino ou organizar cartões com o tutor; nas sondas de leitura, preserve a condição registrada.','Que trecho, escolha de palavra ou revisão ajudou você a construir o sentido?'),
'Matemática':('Vamos descobrir uma relação e conferir se ela faz sentido.','Represente a situação com objetos grandes, desenho ou tabela e explique a passagem para os símbolos.','Como você conferiu a quantidade, a unidade e a relação usada?'),
'Ciências':('Vamos investigar uma pergunta do cotidiano com observação e cuidado.','Use objetos seguros, desenhos ou dados fornecidos pelo adulto; combine o que observar antes de comparar.','O que foi observado e o que ainda é uma hipótese?'),
'História':('Vamos investigar como pessoas e lugares mudam, por diferentes pontos de vista.','Examine uma fonte identificada, situe autoria e tempo e compare uma segunda perspectiva.','O que a fonte permite afirmar e qual informação ainda falta?'),
'Geografia':('Vamos compreender relações entre lugares, pessoas e representações.','Construa um croqui, percurso acessível ou tabela com dados identificados e compare escalas.','Qual lugar, escala e fonte sustentam sua explicação?'),
'Arte':('Vamos experimentar uma ideia e descobrir modos de expressá-la.','Escolha uma linguagem acessível, experimente duas versões e converse sobre suas decisões.','Que escolha você fez e o que mudou quando a revisou?'),
'Educação Física':('Vamos participar de uma prática corporal com escolhas e combinados possíveis.','Combine espaço, regras, adaptações e sinal de pausa; observe participação e conforto, sem comparação de corpos.','O que ajudou você e as outras pessoas a participar?'),
'Ensino Religioso':('Vamos conhecer modos de viver e conviver com respeito à liberdade de cada pessoa.','Use situações fictícias e fontes identificadas, sem exigir declaração ou prática de crença.','Sua proposta protege também quem pensa ou vive de outro modo?'),
'Língua Inglesa':('Vamos usar o inglês para compreender ou comunicar algo com uma finalidade.','Leia um material autoral adequado ao repertório, localize pistas e confira o sentido no contexto.','Qual pista sustenta o sentido e como a mensagem atende ao público?'),
'Biologia':('Vamos usar modelos para investigar a vida e seus processos.','Construa um esquema, indique suas hipóteses e compare previsões com dados fornecidos.','O que esse modelo explica e o que ele deixa de representar?'),
'Física':('Vamos descrever um fenômeno e conferir as relações entre medidas.','Use desenho ou simulação no papel; nomeie sistema, referencial e unidades antes de calcular.','Quais hipóteses e unidades sustentam sua conclusão?'),
'Química':('Vamos relacionar substâncias, modelos e evidências de transformação.','Use representações e dados; não realize aquecimento, misturas ou montagens sem planejamento e mediação adequados.','Que evidência sustenta a explicação e quais condições foram consideradas?'),
'Filosofia':('Vamos construir uma pergunta e examinar as razões de uma resposta.','Reconstrua uma posição, formule uma objeção e revise a justificativa sem exigir concordância pessoal.','Qual razão você manteria diante de uma objeção forte?'),
'Sociologia':('Vamos investigar uma situação social com conceitos e evidências.','Situe os dados e diferencie descrição, hipótese e explicação antes de generalizar.','Que contexto ou informação mudaria sua interpretação?')
}
path=Path('data/catalog.json');data=json.loads(path.read_text());assert len(examples)==120
for s in data['skills']:
 if s.get('teachingPlan'):continue
 s['model']=examples[s['id']];s['version']+=1
 sub=s['subject'];typ='Matemática' if 'Matemática' in sub else 'Língua Portuguesa' if sub in ['Leitura','Escrita'] else sub
 invite,explore,reflection=subjects.get(typ,('Vamos combinar uma maneira possível de aprender com autonomia.','Planeje com o tutor duas etapas, recursos de acesso e uma pausa possível.','O que ajudou você a escolher, conferir ou retomar?'))
 s['teachingPlan']={'invitation':invite,'exploration':explore,'coPractice':'O tutor demonstra uma etapa com um exemplo de ensino, observa a tentativa e oferece apenas o apoio necessário. Registra a pista usada e planeja sua retirada em uma oportunidade diferente.','reflection':reflection,'transfer':'Combine um uso desta aprendizagem em uma situação significativa da turma ou da vida cotidiana. Mudanças de contexto precisam ser descritas; um único êxito não prova generalização.','tutorNotes':'Antes de ensinar, confirme acesso, interesse e repertório. Escolha uma pista que efetivamente ajude, evite adivinhar por posição ou aparência e reduza o apoio conforme as observações. Verificação e revisão ocorrem com itens novos e condições registradas.'}
path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n');Path('data/catalog.js').write_text('window.TRILUME_CATALOG = '+json.dumps(data['skills'],ensure_ascii=False,indent=2)+';\n')
print(len(examples),'exemplos de ensino revisados')
