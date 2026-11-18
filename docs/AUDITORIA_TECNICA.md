# Auditoria técnica e funcional — Trilume 0.5

Data: 17/11/2026. Referência anterior: main 923bddb7, versão 0.3; correções anteriores preservadas. Escopo: código estático, catálogo, persistência local, avaliação, planos, sessões, curadoria, oficina e jornada. Não é teste de invasão, auditoria de servidor ou certificação de segurança. Os testes usam perfis fictícios.

## Resultado

Foram reproduzidos e corrigidos problemas que podiam distorcer evidências de aprendizagem ou comprometer a recuperação dos registros. A aplicação recebeu validação mais forte, persistência protegida, revisão humana acessível e novas experiências de ensino. O maior limite permanece estrutural: uso individual no navegador, sem autenticação, autorização por vínculo ou sincronização.

## Correções verificáveis

| Gravidade | Problema anterior e consequência | Correção nesta versão |
| --- | --- | --- |
| Alta | Normalização tratava acentos e pontuação como irrelevantes: avo podia equivaler a avó; 3! podia equivaler a 3. | Comparação preserva acentos e símbolos, com alternativas válidas explícitas por item. Vinte listas de respostas foram ampliadas. |
| Alta | Repetir enunciado com outro identificador ou versão podia multiplicar evidência de domínio. | Controle por habilidade, identidade e enunciado; mudança cosmética não cria item novo reconhecido automaticamente. |
| Alta | Uma primeira tentativa pendente podia ser ignorada em favor de acerto posterior no mesmo enunciado. | A primeira ocorrência bloqueia tentativas posteriores como evidência inédita, até revisão do registro original. |
| Alta | Item apresentado e não respondido podia voltar como inédito. | Registro de apresentação na avaliação e no estudo. |
| Alta | Arquivo local corrompido abria estado vazio e podia ser sobrescrito. | Original protegido, cópia de recuperação e bloqueio de gravação sobre a corrupção. |
| Alta | Importação podia substituir o estado antes de uma gravação bem-sucedida. | Validação prévia, cópia anterior e substituição do arquivo principal antes de aceitar o novo estado. Falha de quota preserva o principal. |
| Alta | Backup podia declarar ajuda e resultado independente ao mesmo tempo. | Rejeição de inconsistência; revisão mantém ajuda registrada e histórico das decisões. |
| Média | Duas abas podiam sobrescrever registros sem aviso. | Comparação com o último estado lido e interrupção da gravação divergente. É proteção de melhor esforço, não transação de banco. |
| Média | Retenção podia ser contada no dia da aquisição ou separada por dia UTC inadequado ao calendário local. | Datas locais posteriores à aquisição; duas datas distintas para o indicador. |
| Média | Mesmo ID em outra habilidade bloqueava um item válido. | Identidade de exposição passa a considerar a habilidade. |
| Média | Critério ausente ou intervalos inválidos quebravam cálculos e telas. | Padrão definido, validação de limites e rejeição de configurações inválidas. |
| Média | Dependências inexistentes ou cíclicas eram aceitas no acervo. | Validação do grafo, incluindo autorreferência, ciclos e IDs desconhecidos. |
| Média | Respostas objetivas corrigidas não tinham caminho claro para revisão humana. | Acompanhamento permite revisar os últimos 50 registros e exportar o histórico em CSV. |
| Média | Importação do catálogo podia sobrescrever uma versão igual ou mais nova. | Conflitos de versão são recusados; edições criam versão e preservam histórico. |
| Média | Parte das atividades citava texto, tabela, imagem ou objeto ausente. | Campo de material, indicação de dependência e confirmação de preparação. A disponibilidade real continua sendo do tutor. |
| Média | Toda sessão de ensino apresentava explicação antes de verificar repertório já existente. | Modo de verificação antes do ensino, com item novo. |
| Média | Busca ignorava enunciados e alternativas. | Índice inclui textos dos exercícios; filtros distinguem grupos EI, fundamentos e anos. |
| Baixa | CSV não neutralizava fórmulas com espaços iniciais. | Proteção após identificação de caracteres iniciais de fórmula. |
| Baixa | Leitura em voz alta podia continuar após pausa ou navegação. | Cancelamento de fala nos controles correspondentes. |
| Baixa | Nilo e fala tinham pouco destaque. | Imagens maiores, balão de alto contraste e layout ajustado a telas menores. |

## Ensino e curadoria

Os 120 exemplos escolares antes eram idênticos ao conteúdo introdutório. Foram substituídos por demonstrações autorais e acompanhados de propostas de exploração, prática conjunta e reflexão. A mudança incrementa a versão das fichas e só afeta novos planejamentos; enunciados e materiais já aplicados permanecem nos registros históricos.

Os 112 objetivos curriculares também foram reescritos em linguagem operacional. Isso não homologa sua correspondência normativa nem torna intercambiáveis as demandas de todas as atividades.

A biblioteca mantém 226 fichas/áreas e 1.336 registros de atividades: 120/800 no catálogo escolar, 93/380 no catálogo EI e 13/156 em repertórios. A oficina de seis palavras gera listas próprias e não é somada como centenas de questões novas. As 120 fichas escolares continuam abaixo do mínimo de cinco enunciados distintos de aquisição e de dois de retenção. A revisão não reduziu critérios para produzir aparente conclusão de aprendizagem.

O editor permite material do estudante, pistas específicas, respostas curtas alternativas e revisão do exercício. A edição preserva o ID e aumenta a versão; isso não torna automaticamente um item já visto uma evidência nova. O histórico não é recalculado por uma mudança editorial de gabarito.

## Educação Infantil

Foram conferidos 93 códigos válidos nos intervalos do capítulo de Educação Infantil, sem duplicidade, em três grupos e cinco campos. A existência dos códigos e a estrutura das atividades foram verificadas; a relação semântica completa e a adequação de todas as experiências exigem curadoria contextual. Os oito itens visuais adicionais de matemática oferecem observação parcial, sem nota de desenvolvimento.

Cadastro, filtro e edição preservam o grupo EI. As telas de consulta apresentam a orientação descritiva e ocultam o critério numérico escolar. Parâmetros numéricos ainda existem no formato de dados por compatibilidade, mas não classificam domínio na função de acompanhamento EI. Atividades com materiais físicos exigem preparação mesmo quando instruções textuais estão anexadas.

## Oficina de palavras

Há separação de ensino, avaliação inicial, sondas e tarefas de contexto. As listas ficam fechadas. A posição do alvo varia e os distratores são embaralhados. No ensino, a pista antecedente é registrada; nas sondas, não há correção imediata. Áudio precisa ser apresentado antes da resposta. Leitura oral aceita registro observacional por toque ou transcrição opcional e análise humana; não há reconhecimento de fala ou avaliação automática de pronúncia.

Limites: seis palavras, figuras em emoji dependentes do dispositivo, poucas variações de exemplares e ausência de controle do treino fora da aplicação. O modelo não demonstra todas as propriedades de uma classe de equivalência. A indicação de candidato a relação não ensinada no programa é provisória. A retomada do áudio após uma troca de tarefa precisa continuar sendo acompanhada no uso real; a aplicação não grava voz ou identifica emoções.

## Jornada e gamificação

XP é derivado dos registros por sessão/tarefa, sem duplicar no recálculo. Na política 0.4, dicas solicitadas e alternativas retiradas reduzem somente o bônus da resposta, com pisos de participação. Pedir apoio não cria erro. A política e o valor ficam no registro; históricos anteriores preservam o XP anterior. A análise posterior da aprendizagem não retira os pontos de uma tentativa efetivamente registrada. Itens pulados e sem resposta não pontuam. A avaliação inicial recebe apenas reconhecimento por participação ao encerrar, sem mostrar correção antecipada.

Metas têm histórico por data local, podem ser ajustadas ou pausadas e não reescrevem metas anteriores. Datas futuras não entram no total do momento consultado. Os dias com registros permanecem acumulados e não são apagados por intervalos. Retomada exige evento efetivo de retorno, e não apenas pausa. Não há anti-fraude, contas ou competição; XP local pode ser alterado por quem controla o navegador e não deve ter valor financeiro ou certificador.

## Fontes dos outros chats

O ZIP reconstruído v05 foi lido em modo de consulta. Contém 3.583 registros com IDs únicos, 2.140 enunciados distintos e 1.721 referências curriculares. Todos permaneciam pendentes de validação e bloqueados ao aluno. A aplicação não foi apresentada como se já executasse esses 3.583 itens. Foram preservados como fonte de curadoria; os totais não foram somados ao acervo ativo sem controle de sobreposição e homologação.

## Validação realizada

A suíte de regressão verifica correção, ajuda, primeira tentativa, exposições, retenção local, planos, importação, falha de quota, corrupção, conflito entre abas, códigos EI, oficina e jornada. Os resultados atuais e o roteiro de navegação ficam em VALIDACAO.md. O workflow executa verificações de sintaxe e a suíte em cada atualização do repositório.

A renderização de todas as páginas é exercitada em um ambiente simulado de interface. Isso não substitui navegador real: a inspeção visual e os fluxos interativos foram conferidos separadamente. TTS tem dependência do navegador e da disponibilidade de voz; a apresentação oral pelo tutor é uma alternativa identificada no registro.

## Pendências e riscos materiais

1. Persistência local não é backup remoto nem controle institucional de acesso. Implementar autenticação, autorização, banco e recuperação antes de uso multiusuário com dados reais.
2. A seleção de estudante e a tela do tutor são separações de interface, acessíveis a quem controla o navegador. Não há sigilo por senha entre perfis.
3. Os enunciados são comparados por texto normalizado; paráfrases semanticamente iguais e exposição fora do programa dependem de análise humana.
4. Importação validada verifica forma e vínculos, não veracidade, qualidade pedagógica ou autoria de um gabarito. Arquivos de terceiros exigem curadoria.
5. O armazenamento tem limite variável e o histórico cresce. Antes de grande expansão, adicionar migrações, armazenamento estruturado e política de retenção.
6. app.js concentra muitas responsabilidades. Extrair rotas, formulários e relatórios progressivamente, preservando testes e compatibilidade.
7. Acessibilidade foi melhorada por semântica, foco, contraste, texto ampliado e movimento reduzido; não houve certificação WCAG nem estudo completo com tecnologias assistivas.
8. A eficácia metodológica combinada, a equivalência das tarefas e a confiabilidade entre observadores precisam de avaliação empírica.

As correções tornam o comportamento mais rastreável. A aprovação de aprendizagem ou decisão escolar permanece do educador; o software não emite diagnóstico ou certificação psicológica.

## Mudanças e verificações 0.4

- Cadastro com múltiplos objetivos, recursos e interesses; plano com dia, período, local, duração e vários materiais. Texto adicional opcional; o papel do adulto pode identificar o acompanhamento neste protótipo individual.
- 304 escolhas autorais novas e 20 conversões, conservando versões e cópias de aplicações anteriores. Novos reconhecimentos parciais ficam excluídos da regra de domínio integral.
- Eliminação conserva índices originais e só retira distratores; tentativas de enviar uma opção já retirada são recusadas. O pedido não cria uma resposta.
- O valor de XP fica congelado com a resposta e seu formato é validado na importação. Pontos locais continuam sem proteção contra adulteração deliberada por quem controla o navegador.
- 13 áreas autorais, três formas de sondagem e histórico por área. Identidade de estímulo é preservada para sinalizar reapresentação, inclusive quando o enunciado é genérico.
- Atividades auditivas bloqueiam resposta sem apresentação do som ou confirmação do tutor. Não há gravação ou reconhecimento de voz.
- Ações observadas têm quatro seleções e detalhe opcional. Na avaliação inicial, aguardam confirmação/revisão do adulto após encerrar; ajuda registrada permanece assistida.

111 testes automatizados passaram na revisão inicial 0.4; resultados finais e inspeção da publicação ficam em VALIDACAO.md. A indisponibilidade da prévia local é limitação de infraestrutura, não evidência de validação visual.

## Navegação e painéis 0.5

O menu foi dividido em Estudante, Tutor e Geral. O estudante tem resumo simples, combinado de estudo e consulta por seis períodos. O tutor dispõe de painel com respostas, ajudas, pendências, recortes anteriores, detalhes por habilidade, sondagens e links para revisão humana e planejamento. A meta da jornada é programada no Tutor. O Geral reúne banco, biblioteca, orientações e auditorias.

As contagens são derivadas dos registros existentes, sem gerar resultados fictícios. O período bimestral segue pares de meses do calendário; o semestre é janeiro–junho ou julho–dezembro. A semana começa na segunda-feira. Períodos atuais são incompletos e não geram automaticamente conclusão de melhora ou piora. Datas futuras e perfis não selecionados são excluídos das métricas.

Etapas de explicação usam eventos de conclusão; respostas usam seu horário registrado. Quando falta horário próprio de uma etapa antiga, a sessão oferece uma aproximação sinalizada. Não se estima duração real a partir do tempo planejado. Respostas revisadas são exibidas segundo a análise mais recente, e não como uma reconstrução de decisões antigas.

Os novos módulos insights.js e areas.js separam agregação e apresentação da interface principal. Foram acrescentados testes de calendário, isolamento, contagem e navegação. As abas são organização de interface: não implementam autenticação ou autorização de acesso entre pessoas.

## Revisão 0.6: desafios, tempos e limpeza individual

Desafios diários e retomadas guardam cópias das questões, respostas e regras de XP. O sorteio respeita o grupo escolar, a disciplina, materiais disponíveis, questões já respondidas e reservas dos planos de ensino. A lista do dia é imutável; acertos não retornam às novas seleções automáticas. As tentativas de retomada permanecem separadas, com teto de duas e XP reduzido. O backup valida pontuação, alternativas eliminadas, vínculo com a primeira resposta e sequência de tentativas.

O tempo é acumulado em intervalos com a página visível e a tarefa aberta, com interrupção na pausa, troca de tela, resposta ou ocultação da página. Intervalos longos são limitados a 15 segundos para não somar suspensão/offline como trabalho. Dados antigos ficam sem medição; médias e durações são aproximações de uso, sem interpretação de capacidade.

A limpeza individual oferece manter cadastro ou excluir o perfil e exige confirmação. Remove registros dos contextos de ensino, avaliação, oficina, jogo e tempo, além de metas, XP derivado e rascunhos. Sanitiza as cópias locais previous/recovery legíveis. Uma cópia ilegível impede iniciar a limpeza; erro na gravação provoca tentativa de reversão. Não há transação real entre chaves do navegador: interrupção abrupta ou falha da própria reversão ainda exige recuperação humana. Cópias exportadas, cache de outra aba e outros dispositivos estão fora desta limpeza. Conflitos entre abas são recusados na próxima gravação.

A integração preservou os novos bancos de Educação Infantil e EFI enviados por outros chats, mantendo-os em curadoria, separados do catálogo ativo. Não houve publicação automática desses itens ao estudante.
