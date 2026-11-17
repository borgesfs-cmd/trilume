"""Gera relatórios estáticos, matriz por ficha e CSV a partir do catálogo atual."""
from pathlib import Path
import json,html,re,csv,collections,subprocess
root=Path(__file__).resolve().parents[1]
esc=lambda x:html.escape(str(x),quote=True)
def inline(s):
 s=esc(s)
 s=re.sub(r'\*\*(.+?)\*\*',r'<strong>\1</strong>',s)
 s=re.sub(r'(?<!["\w])(https://[^\s<>]+)',lambda m:'<a href="'+m[1]+'" target="_blank" rel="noopener">'+m[1]+'</a>',s)
 return s

def md_html(s):
 out=[];para=[];inlist=False;table=False
 def flush():
  nonlocal para
  if para:out.append('<p>'+inline(' '.join(para))+'</p>');para=[]
 for line in s.splitlines()+['']:
  if line.startswith('|'):
   flush()
   if re.match(r'^\|[\s:|\-]+\|$',line):continue
   cells=[inline(c.strip()) for c in line.strip('|').split('|')]
   if not table:out.append('<div class="table-wrap"><table><thead><tr>'+''.join('<th>'+c+'</th>' for c in cells)+'</tr></thead><tbody>');table=True
   else:out.append('<tr>'+''.join('<td>'+c+'</td>' for c in cells)+'</tr>')
   continue
  if table:out.append('</tbody></table></div>');table=False
  if line.startswith('#'):
   flush();n=len(line)-len(line.lstrip('#'));out.append(f'<h{n}>'+inline(line[n:].strip())+f'</h{n}>');continue
  isli=re.match(r'^(?:- |\d+\. )(.+)',line)
  if isli:
   flush()
   if not inlist:out.append('<ul>');inlist=True
   out.append('<li>'+inline(isli[1])+'</li>');continue
  if inlist:out.append('</ul>');inlist=False
  if not line.strip():flush()
  else:para.append(line)
 return '\n'.join(out)

def page(title,body,script=''):
 return '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>'+esc(title)+' — Trilume</title><link rel="stylesheet" href="report.css"></head><body><header class="report-header"><a href="index.html">← Abrir a Trilume</a><strong>TRILUME · ENSINO E APRENDIZAGEM</strong><button type="button" onclick="window.print()">Imprimir / salvar PDF</button></header><nav class="report-nav"><a href="auditoria-metodologica.html">Metodologia</a><a href="auditoria-curricular.html">Currículo e atividades</a><a href="auditoria-tecnica.html">Sistema e correções</a></nav><main>'+body+'</main><footer>Trilume · Auditoria de desenvolvimento · 17/11/2026 · Concepção pedagógica: Flávio da Silva Borges</footer>'+script+'</body></html>'

for slug,doc in [('metodologica','METODOLOGICA'),('tecnica','TECNICA')]:
 text=(root/'docs'/('AUDITORIA_'+doc+'.md')).read_text()
 (root/('auditoria-'+slug+'.html')).write_text(page('Auditoria '+slug,md_html(text)))

school=json.loads((root/'data/catalog.json').read_text())['skills'];early=json.loads((root/'data/early-childhood.json').read_text())['skills'];skills=school+early
health=json.loads(subprocess.check_output(['node','-e',"const E=require('./engine'),s=require('./data/catalog.json').skills;console.log(JSON.stringify(E.catalogHealth(s)))"],cwd=root))
hmap={x['skillId']:x for x in health['skills']}
notes={
'CUR-01-01':'A sonda pede som inicial; a prática pede ler ou construir uma palavra inteira. Essas respostas não têm a mesma extensão. Separar identificação sonora, correspondência letra–som, composição e leitura; observar cada alvo e ligar as etapas explicitamente.',
'CUR-01-02':'Contagem, comparação e correspondência um a um são relações conectadas, mas distintas. Variar espaçamento e posição sem alterar quantidade; observar apontar uma vez, cardinalidade e distribuição antes de concluir domínio de todas.',
'CUR-02-01':'Localizar quem e o que em um bilhete é leitura; escrever um aviso acrescenta produção escrita. A transferência é uma aplicação integrada, não medida pura de localização. Oferecer outro texto completo para verificar o alvo inicial.',
'CUR-03-01':'Recontar uma sequência e redigir um relato completo têm demandas diferentes. Separar compreensão, ordenação oral e planejamento escrito; não atribuir dificuldade de compreensão somente a uma produção escrita incompleta.',
'CUR-04-01':'Identificar ideias de parágrafos, revisar referência e produzir texto são operações diferentes. Ensinar o procedimento de revisão e observar clareza e coesão separadamente de localização de ideia principal.',
'CUR-04-02':'A sonda usa fração de área e a prática fração de quantidade. A ponte conceitual exige mostrar unidade e partição igual nos dois casos; não interpretar uma falha de representação como ausência de todo o conceito.',
'CUR-05-01':'Distinguir opinião e evidência, produzir argumento e avaliar fonte precisam de critérios separados. Usar evidências com origem identificada e limitar a conclusão ao que os dados sustentam.',
'CUR-05-02':'Comparar frações e decimais exige mesma unidade e compreensão da representação. Incluir reta ou faixa equivalente e pedir uma explicação; um acerto numérico isolado não mostra a estratégia.',
'CUR-06-02':'Calcular a quarta parte, desconto e preço final usa decisões adicionais. A demonstração agora explicita a relação com 25%; ainda separar valor do desconto e valor final na rubrica.',
'CUR-06-05':'O título inclui orientação e escala, mas a sequência avaliativa privilegia escala. O novo exemplo explica a distinção; cadastrar uma atividade real de orientação ou restringir o título antes de considerar ambos cobertos.',
'CUR-07-02':'Temperatura com sinal, comparação de fração/decimal e saldo não são um único microalvo. Dividir em objetivos menores e oferecer pontes entre reta, equivalência e operação com sinais.',
'CUR-08-02':'Proporção e expressão algébrica requerem identificar grandezas, unidade e domínio. Incluir contraexemplo de relação com parcela fixa para evitar usar produto cruzado sem compreender a proporcionalidade.',
'CUR-09-01':'Identificar uma afirmação sem apoio não equivale a produzir dois parágrafos argumentativos. A produção deve receber modelo, planejamento e rubrica para tese, razões, evidência, objeção e revisão.',
'CUR-09-02':'Tabela, expressão e gráfico devem representar a mesma relação. Fornecer domínio e dados; conferir consistência entre representações e não apenas um cálculo isolado.',
'CUR-10-01':'Correlação, causalidade e qualidade de argumento exigem dados e alternativas explicativas. Identificar uma falha verbal é evidência parcial; pedir reconstrução e limites da conclusão.',
'CUR-10-04':'Cálculo de velocidade média, interpretação de gráfico e referencial são demandas relacionadas, mas não intercambiáveis. Disponibilizar gráfico, unidades e trajetória e distinguir distância de deslocamento.',
'CUR-10-05':'Comparar modelos atômicos pede fenômeno e evidência situados. Evitar uma sucessão de nomes decorados; solicitar o que cada modelo explica e em que falha.',
'CUR-11-02':'Probabilidade em uma urna e viés de amostragem são dois alvos. O exemplo de ensino agora distingue os dois; criar verificações próprias, com espaço amostral e procedimento de seleção explícitos.',
'CUR-11-03':'Cruzamentos mendelianos requerem hipóteses simplificadoras explícitas. Não generalizar o modelo a todas as características humanas nem converter probabilidade em previsão individual certa.',
'CUR-11-05':'Balancear uma equação e interpretar quantidades exigem distinguir coeficiente, índice e unidade. Pedir contagem de átomos e justificativa; o gabarito simbólico sozinho é insuficiente.',
'CUR-12-02':'Comparar decisões por modelos exige hipóteses, unidades, limite e sensibilidade. Fornecer dados e observar a justificativa da escolha, não apenas o resultado de uma expressão.',
'CUR-12-03':'Evolução exige conectar variação, herança, seleção e tempo. Usar populações e gerações; não aceitar uma explicação por vontade ou necessidade individual como equivalente.',
'CUR-12-05':'Analisar publicidade ambiental pode avaliar letramento crítico sem avaliar transformação química. Incluir substâncias, condições, processo, produtos e dados comparáveis antes de concluir domínio do conteúdo químico.',
'CUR-12-09':'Planejar intervenção social é uma prática integrada. Separar problema, participação, hipótese de ação e avaliação; uma melhora após a ação não comprova causalidade por si só.',
'FUN-LEI-01':'As respostas curtas agora aceitam variantes explícitas de horário e local. A comparação literal ainda não reconhece toda paráfrase; revisar respostas semanticamente válidas e usar textos novos, sem ler o alvo para o estudante.',
'FUN-LEI-02':'A inferência deve ter pista textual e admitir incerteza. Não tratar qualquer explicação plausível como sustentada pelo texto; a rubrica precisa separar fato, inferência e especulação.',
'FUN-DEC-01':'Registro por texto é transcrição do tutor, não reconhecimento automático de fala. Registrar a leitura de cada palavra, autocorreções e apoio; usar materiais novos adequados à idade e separar decodificação de compreensão.',
'FUN-MAT-01':'Há versões de resposta curta e escolha com enunciados repetidos; elas não são evidências independentes de novidade. Compor novas famílias de juntar, retirar, comparar e completar e analisar o procedimento.',
'FUN-MAT-02':'Divisão por partilha e por medida têm sentidos diferentes. Usar grupos e total explicitados e não contar a repetição do mesmo cálculo em outro formato como item novo.',
'FUN-MAT-03':'Fração, porcentagem e comparação de ofertas precisam da unidade e da base percentual. Evitar comparar percentuais com bases diferentes sem calcular; novas famílias são necessárias para retenção.',
'FUN-ESC-01':'Planejar aviso, instrução e explicação reúne gêneros e demandas de revisão distintas. Usar destinatário e finalidade reais ou fictícios explícitos e analisar planejamento, clareza, coesão e revisão separadamente.',
'FUN-AUT-01':'Descrever um plano não comprova utilizá-lo autonomamente. Observar escolha, organização, pedido de apoio, pausa e retomada em situação real; independência de resposta não esgota autonomia.'
}
area={
'Língua Portuguesa':'Distinguir compreensão, produção e revisão; fornecer o texto integral e analisar pistas, organização e justificativa sem confundir domínio com extensão da escrita.',
'Matemática':'Nomear grandezas, unidades e representações; observar procedimento e verificação. Variar os dados e as relações com dificuldade controlada, em vez de repetir o mesmo cálculo.',
'Ciências':'Disponibilizar objetos, imagens ou dados citados; diferenciar observação, hipótese e explicação. Planejar exploração segura, sem exigir experimento não supervisionado.',
'História':'Fornecer fontes identificadas e situadas no tempo; pedir comparação de perspectivas e limites da interpretação. Conhecimento histórico não se resume a uma opinião respeitosa.',
'Geografia':'Fornecer mapa, croqui, tabela ou caso citado, com legenda, unidade, escala, fonte e período pertinentes. A explicação deve conectar relações espaciais a evidências.',
'Arte':'A resposta escrita registra uma parte do processo; observar produção ou apreciação efetiva por meio acessível. Critérios devem considerar intenção, escolhas, referência e revisão, sem impor cópia ou um padrão estético único.',
'Educação Física':'Explicar regras ou preencher um plano não demonstra participação corporal. Registrar observação direta ou relato situado, adaptações e colaboração; não classificar corpos nem prescrever tratamento.',
'Ensino Religioso':'Usar fontes e contextos culturais específicos, com pluralidade e liberdade de consciência. Não avaliar crença pessoal nem exigir declaração; convivência genérica não cobre sozinha conhecimentos da área.',
'Língua Inglesa':'Fornecer texto, áudio ou situação comunicativa em inglês adequados ao repertório. Separar compreensão, produção e interação; tradução ou leitura pelo tutor muda algumas condições da evidência.',
'Biologia':'Explicitar sistema, condições e limites do modelo. Pedir relação entre evidência e explicação, evitando generalizações de um caso simplificado para todos os organismos.',
'Física':'Fornecer dados, gráfico e referencial quando citados; nomear unidades e hipóteses. Distinguir cálculo, interpretação e modelagem e usar representações seguras.',
'Química':'Identificar substâncias, modelos, condições e unidades. Fornecer equações e dados completos e avaliar a justificativa conceitual além do resultado simbólico.',
'Filosofia':'Situar conceitos e critérios; reconstruir argumento, examinar objeção e justificar revisão. Concordância com o educador não é critério de desempenho filosófico.',
'Sociologia':'Situar conceitos, fontes, população e período. Distinguir descrição, associação e explicação; evitar estereótipos e inferências individuais a partir de médias.'
}
fieldnotes={
'EO':'Priorizar reciprocidade, iniciativa e convivência em situação real. Registrar os sinais de comunicação e os efeitos da mediação sem exigir conformidade ou sociabilidade padronizada.',
'CG':'Observar exploração corporal acessível e participação, com espaço e materiais adequados. Não inferir desempenho motor de uma resposta em tela nem comparar movimentos a um padrão único.',
'TS':'Abrir espaço para escolha de sons, traços, materiais e expressão. Registrar processos e decisões, sem transformar a experiência em reprodução obrigatória de um modelo.',
'EF':'Integrar escuta, comunicação, histórias e usos significativos da escrita. Não reduzir o campo a sílabas ou reconhecimento visual; respeitar recursos de comunicação e interesse.',
'ET':'Observar relações em manipulação, comparação e situações do cotidiano. Registrar o procedimento e variar disposição, materiais e contexto; uma escolha visual não demonstra todos os conceitos.'
}
labels={'baseline':'Conhecer o repertório','practice':'Praticar / verificar','transfer':'Outro contexto','maintenance':'Revisitar em outra data'}
def group(s):return s.get('ageBand') or ('Fundamentos' if s['year']==0 else f"{s['year']}EF" if s['year']<=9 else f"{s['year']-9}EM")
def group_label(s):return {'EI01':'EI · Bebês','EI02':'EI · Crianças bem pequenas','EI03':'EI · Crianças pequenas'}.get(s.get('ageBand'), 'Fundamentos transversais' if s['year']==0 else f"{s['year']}º ano EF" if s['year']<=9 else f"{s['year']-9}ª série EM")
rows=[];cards=[]
for s in skills:
 ei=s.get('stage')=='ei';h=hmap.get(s['id'],{});acts=s['activities'];material=[a['id'] for a in acts if a.get('requiresMaterial') or not a.get('studentMaterial') and re.search(r'texto|tabela|gráfico|croqui|fonte|imagens|apresentad|escolhid',a['prompt'],re.I)]
 note=fieldnotes[s['fieldCode']]+' Foco operacional desta ficha: '+s['objective']+'.' if ei else notes.get(s['id'],area.get(s['subject'],'Desdobrar objetivo e analisar as condições de realização.'))
 status='Código existente; correspondência e experiência exigem curadoria contextual.' if ei else 'Código BNCC específico ainda não homologado na ficha; revisar com currículo da rede.'
 risk='Registro qualitativo, sem nota de desenvolvimento.' if ei else f"{h['acquisitionItems']} enunciados distintos de aquisição para mínimo {h['requiredItems']}; {h['maintenanceItems']} de retenção; {h['transferItems']} de outro contexto. Quantidade insuficiente para todos os indicadores."
 curr='O grupo etário é referência de planejamento, não prazo rígido de desenvolvimento. A atividade acontece com mediação e respeita iniciativa, recusa e pausa.' if ei else 'A série organiza uma proposta inicial e não atesta cobertura anual. '+('No Ensino Médio, a atribuição anual é local e precisa ser discutida com o currículo da rede.' if s['year']>9 else 'O educador precisa conferir repertório, linguagem, material e profundidade antes de aplicar à turma.')
 rubric=('Registrar iniciativa, comunicação, ação efetiva, mediação, materiais, contexto e continuidade em outros encontros.' if ei else 'Separar resposta/produto, procedimento, justificativa, condições de acesso e pista instrucional. Criar exemplos de resposta adequada, parcial e inadequada para cada tarefa; as rubricas genéricas existentes não resolvem essa distinção.')
 body='<p class="kicker">'+esc(group_label(s)+' · '+s['subject'])+'</p><h3>Relação pedagógica</h3><p>'+esc(note)+'</p><h3>Objetivo operacional cadastrado</h3><p>'+esc(s['objective'])+'</p><h3>Conteúdo de ensino</h3><p>'+esc(s['content'])+'</p><h3>Exemplo demonstrado atual</h3><p>'+esc(s['model'])+'</p><h3>Atividades vinculadas e o que é solicitado</h3><div class="table-wrap"><table><thead><tr><th>Finalidade</th><th>Enunciado</th><th>Forma de registro</th></tr></thead><tbody>'
 for a in acts:body+='<tr><td>'+esc(labels[a['phase']])+'</td><td>'+esc(a['prompt'])+'</td><td>'+esc({'human':'Observação/produção com análise humana','choice':'Seleção entre alternativas','short':'Resposta curta comparada com gabaritos explícitos'}[a['type']])+'</td></tr>'
 body+='</tbody></table></div><h3>Adequação à turma e evidências</h3><p>'+esc(curr)+'</p><p>'+esc(risk)+'</p><h3>Materiais e mediação</h3><p>'+('Há dependência explícita ou indícios de material externo em '+str(len(material))+' atividade(s). O detector é uma triagem textual: o tutor precisa conferir todas as situações, inclusive as não sinalizadas.' if material else 'Não foi identificada dependência textual pelo detector nesta ficha. Confirmar acessibilidade, materiais físicos e compreensão da instrução antes de iniciar.')+'</p><h3>Rubrica a desenvolver</h3><p>'+esc(rubric)+'</p><p class="status">'+esc(status)+'</p>'
 cards.append('<details class="skill-audit" data-group="'+esc(group(s))+'" data-subject="'+esc(s['subject'])+'"><summary><span>'+esc(s['id'])+'</span> '+esc(s['title'])+' <small>'+esc(group_label(s))+' · '+str(len(acts))+' atividades</small></summary>'+body+'</details>')
 rows.append({'id':s['id'],'grupo':group_label(s),'componente':s['subject'],'titulo':s['title'],'objetivo':s['objective'],'atividades':len(acts),'codigo_bncc':s.get('bnccCode') or '', 'situacao_bncc':status,'analise_pedagogica':note,'evidencias':risk,'curadoria_da_rubrica':rubric})
with (root/'docs/MATRIZ_AUDITORIA_CURRICULAR.csv').open('w',newline='',encoding='utf-8-sig') as f:w=csv.DictWriter(f,fieldnames=rows[0].keys());w.writeheader();w.writerows(rows)
counts=collections.Counter(group(s) for s in skills)
summary='''<h1>Auditoria curricular e relação conteúdo–habilidade–atividade</h1><p>17/11/2026 · Análise documental das 213 fichas e seus 876 registros de atividades. Cada ficha abaixo mostra o conteúdo real, as demandas das atividades e a decisão de curadoria. A análise é preliminar e não homologa todos os alinhamentos à BNCC.</p><section class="highlight"><h2>O ensino precisa conduzir a avaliação</h2><p>Uma boa sequência articula finalidade, experiência significativa, explicação, demonstração, apoio, reflexão e uso em outros contextos. Trocar uma atividade de leitura por produção escrita ou um cálculo por análise de amostragem muda o que se observa e exige ensino e critérios próprios.</p></section><h2>Achados que atravessam o acervo</h2><ul><li>As 120 fichas escolares ainda têm menos itens distintos de aquisição e de retenção que seus próprios parâmetros exigem. Não foram reduzidos critérios para produzir aparente domínio.</li><li>Os 120 exemplos antes repetiam o conteúdo; foram substituídos por demonstrações autorais e propostas de exploração. Isso melhora o desenho do ensino, sem comprovar aprendizagem em uso.</li><li>Os 112 objetivos curriculares foram reescritos de forma operacional, mas várias fichas ainda reúnem alvos diferentes. As atividades abertas usam poucas rubricas genéricas: é necessário desdobrar critérios por tarefa.</li><li>Os códigos específicos EF/EM não foram homologados. No Ensino Médio, a distribuição por série é uma proposta local.</li><li>Os 93 códigos EI estão representados em três grupos e cinco campos, com 380 propostas. Cobertura de códigos não equivale à validação integral das experiências nem a uma lista de marcos obrigatórios.</li><li>Atividades artísticas, corporais e comunicativas exigem observação da ação e da produção; um campo de texto pode registrar essa observação, mas não a executa.</li></ul><h2>Acervo recuperado dos outros chats</h2><p>Foi consultado o pacote reconstruído v05: 3.583 itens, dos quais 151 EI, 2.520 EF e 912 EM; 2.140 enunciados distintos; todos com validação pedagógica pendente e bloqueados ao aluno. Seus 616 vínculos candidatos não foram apresentados como homologados. Os totais desse pacote e da aplicação não foram somados como itens únicos. A integração depende de curadoria, rastreabilidade e da função de cada atividade no ensino.</p><p><a href="docs/MATRIZ_AUDITORIA_CURRICULAR.csv" download>Baixar matriz das 213 fichas em CSV</a></p>'''
opts='<option value="">Todos os grupos</option>'+''.join('<option value="'+esc(group(s))+'">'+esc(group_label(s))+'</option>' for i,s in enumerate(skills) if group(s) not in [group(t) for t in skills[:i]])
subjects=sorted(set(s['subject'] for s in skills))
filters='<section class="audit-filters"><label>Buscar ficha, conteúdo ou atividade<input id="query" type="search" placeholder="Ex.: frações, leitura, EI03ET07"></label><label>Grupo<select id="group">'+opts+'</select></label><label>Componente<select id="subject"><option value="">Todos os componentes</option>'+''.join('<option>'+esc(s)+'</option>' for s in subjects)+'</select></label></section><p id="result-count" role="status">213 fichas disponíveis.</p>'
js='''<script>const cards=[...document.querySelectorAll('.skill-audit')],normal=x=>x.normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase();const entries=cards.map(c=>({c,text:normal(c.textContent)}));function filter(){const q=normal(document.getElementById('query').value),g=document.getElementById('group').value,s=document.getElementById('subject').value;let n=0;for(const {c,text} of entries){const show=(!q||text.includes(q))&&(!g||c.dataset.group===g)&&(!s||c.dataset.subject===s);c.hidden=!show;if(show)n++;}document.getElementById('result-count').textContent=n+' ficha(s) no filtro.';}for(const id of ['query','group','subject'])document.getElementById(id).addEventListener('input',filter);</script>'''
(root/'auditoria-curricular.html').write_text(page('Auditoria curricular',summary+filters+''.join(cards)+'<h2>Fonte normativa</h2><p><a href="https://basenacionalcomum.mec.gov.br/images/BNCC_EI_EF_110518_versaofinal_site.pdf" target="_blank" rel="noopener">BNCC — documento oficial do MEC</a>. Os descritores operacionais e as análises desta página são autorais; consultar a norma e o currículo local para validar correspondências.</p>',js))
print('Relatórios e matriz gerados:',len(rows),'fichas')
