# Validação — versão 0.7

Data: 17/11/2026. Perfis e respostas fictícios; nenhuma aplicação com crianças.

## Regressão automatizada

111 testes nativos Node.js passaram. Abrangem avaliação sem feedback antecipado, revisão humana, ajuda e independência, primeira tentativa, novidade por enunciado e exposição, verificação antes de ensino, retenção em datas locais, materiais, listas fechadas e escolha autorizada. Incluem corrupção, recuperação, quota, substituição e conflitos entre abas, além de todos os intervalos dos 93 códigos EI, catálogo combinado 226/1336, oficina, áudio, pistas e XP.

Os 88 testes da versão 0.3 foram mantidos e complementados; uma alteração de título distingue o catálogo escolar do catálogo EI. Houve atualização do ambiente simulado da interface para carregar os novos módulos. Não há dependências de pacotes para executar a suíte. O workflow verifica sintaxe dos módulos e executa npm test.

## Inspeção em navegador — histórico da versão 0.3

- Página inicial com prioridade para exploração e autonomia; NILMO e balão ampliados.
- Perfil fictício, seleção de uma avaliação breve, resposta e conclusão sem exibir correção ao estudante.
- Retorno ao tutor, preparação do plano com materiais e abertura da sequência de ensino.
- Exploração, registro opcional de reflexão, pausa e retomada com texto preservado.
- Jornada com 15 XP derivados das etapas realizadas, ajuste de meta de 20 para 40 XP e lista de atividades aprovadas.
- Oficina de ensino com três palavras, lista fechada, bloqueio de resposta antes da apresentação sonora, alternativa de apresentação oral e resposta registrada como apoiada.
- Layout em viewport estreito de aproximadamente 375 px úteis, por quadro de 390 px: sem transbordamento horizontal do corpo. É verificação de layout; não emula todos os dispositivos, tecnologias assistivas ou condições de toque.
- Relatórios metodológico, curricular e técnico acessíveis a partir do guia; matriz com filtros por etapa e componente.

A checagem final da publicação confirma as páginas e a versão disponibilizada. Os dados de teste usam chave local isolada por ?qa=1 e não são incorporados ao repositório nem ao acervo publicado.

## Limites

Testes verificam comportamentos programados e regressões conhecidas, não eficácia pedagógica, validação psicológica ou cobertura normativa integral. TTS e desenho de emojis variam entre navegadores. Rubricas e materiais ainda exigem curadoria, e a separação das telas não implementa autenticação.

## Revisão 0.4

Os novos testes cobrem: maioria de escolhas no Fundamental; gabaritos de leitura convertidos; quatro registros observacionais com texto opcional; confirmação após avaliação; não observado sem erro/XP; pisos e congelamento de bônus; retirada exclusiva de distratores com índices estáveis; 13 áreas, três formas e limites de tamanho; escopo etário; áudio obrigatório como estímulo; histórico entre sondagens; exclusão de reconhecimento parcial do domínio integral; ajuda no ensino e ausência de ajuda nas sondas; cadastro múltiplo preservado na edição; plano por seletores e registro assistido após eliminação.

A prévia local retornou conexão recusada apesar do status ativo. A versão publicada foi inspecionada em navegador com perfis fictícios e chave ?qa=1. Cadastro com objetivos, recursos e interesses múltiplos e identificação gerada; avaliação de contagem por toque sem gabarito antecipado; plano por dia/período/duração/local e vários materiais sem digitação; sessão de verificação; dica e retirada de distrator sem resposta automática; acerto assistido e 6 XP (16 XP no dia incluindo a avaliação); observação corporal em três oportunidades, confirmação após encerrar e histórico com registros distintos. A imagem de verificação acompanha o código em docs/preview-0-4.jpg.

A conexão inicial do navegador falhou durante a conferência do plano. O restante foi concluído em outro navegador, sem reutilizar dados normais da aplicação. A inspeção 0.4 foi realizada em tela de desktop; não houve nova emulação de celular nesta revisão. O teste de layout estreito descrito acima refere-se à 0.3. Mudanças de responsividade ainda precisam de conferência em dispositivos e tecnologias assistivas reais.

A conferência motivou mais dois ajustes: apenas uma sugestão de escolha por componente prioritário do ano escolar, sem pré-seleção automática de atividades transversais; e preservação do texto de dicas anteriores ao retirar um distrator. Repertórios ainda não observados ficam na página própria, evitando alongar a trilha principal.

## Revisão 0.5: menus e painéis

128 testes automatizados passaram. Os 17 novos verificam: limites de calendário nos seis períodos e viradas de ano; segunda-feira como início da semana; meia-noite local e exclusão de datas futuras; isolamento do estudante selecionado; distinção de resultados e registros pendentes/não aferidos; não antecipação de resultados de avaliações ativas; deduplicação de tarefas; oficina separada de habilidade ampla; reconhecimento parcial excluído do domínio; data efetiva da retomada e das etapas de explicação; vazio sem tendência inventada; contagens reais do acervo; menus de cada área; meta configurada no Tutor; ausência de planejamento de oficina no Estudante; preservação dos cadastros ao trocar de área; navegação móvel do Tutor por lista suspensa.

A infraestrutura de prévia local retornou conexão recusada. A conferência foi feita na publicação, com perfil fictício em ?qa=1. Foram verificados os três menus, cadastro, avaliação sem gabarito antecipado, passagem para o estudo, resposta com apoio, barras do dia/semana e períodos de consulta. O caso de teste mostrou duas atividades com participação, uma etapa e um conteúdo explorado, 18 XP e, no Tutor, uma resposta sem pista e uma com ajuda; reconhecimento parcial ficou separado do domínio. A meta de 40 XP configurada pelo Tutor apareceu na jornada do estudante, sem botão de configuração no aluno. O Geral contou 226 fichas e 1.336 atividades.

Na primeira conferência móvel em 390 × 844, o corpo não excedeu 390 px. A inspeção motivou substituir a faixa longa de atalhos: grade de duas colunas no Estudante e lista suspensa no Tutor/Geral. Na conferência final, os quatro atalhos do Estudante ficaram em duas linhas, todos visíveis, e a lista do Tutor abriu a programação da gamificação. A lista do Geral abriu as auditorias. O corpo continuou com 390 px para viewport de 390 px. A dimensão temporária foi restaurada após o teste. Os exemplos das imagens usam apenas o perfil fictício de QA.

As imagens menu-estudante-0-5 e painel-tutor-0-5, na pasta docs, registram as duas apresentações. A publicação e as verificações de regras pedagógicas foram concluídas com sucesso.

## Revisão 0.6: jogo e gestão individual

162 testes automatizados passaram. Novos casos cobrem listas diárias de 1–3 questões por ano/disciplina, regra pausada, estabilidade no mesmo dia, reserva do plano, ausência de preenchimento artificial, erros destinados à retomada, exclusão de acertos do sorteio, limites etários, XP inicial e reduzido, até duas retomadas, ausência de XP por erro repetido, apoio sem erro, estímulo auditivo sem penalidade, imutabilidade da primeira resposta e ausência de domínio por reconhecimento repetido. Também verificam vínculos e pontuação do backup, alternativas retiradas, tempos visíveis e ocultação, suspensão/offline, tempo ausente nos registros antigos, limpeza de todos os contextos do perfil, manutenção dos outros estudantes, sanitização de cópias locais, bloqueio de arquivo ilegível, reversão por falha de quota, conflito entre abas e confirmação na interface.

A integração preservou os lotes EI e EFI em curadoria recebidos de outros chats. Eles não passaram a compor o sorteio de questões do estudante. Os testes da nova política não recalculam pontos históricos.

A publicação 0.6 foi conferida em navegador com o perfil fictício Aprendiz 1 e chave isolada ?qa=1. Foram observados o diálogo de limpeza com duas opções e confirmação desmarcada, cancelamento mantendo cadastro, configuração de duas questões de Matemática, abertura automática do desafio, erro com +1 XP, retomada com teto de 6 XP, dica e retirada de distrator reduzindo o teto a 2 XP e acerto assistido com NILMO celebrando. A limpeza efetiva foi exercitada nos testes automatizados; no navegador, o diálogo foi cancelado.

A conferência motivou a revisão 0.6.1: ao voltar ao desafio depois de acertar na retomada, avançar à próxima questão e manter o erro apenas no histórico; adaptar o convite do NILMO ao contexto; distinguir encerramento de retomada e corrigir singular/plural. Um novo teste preserva a resposta inicial e verifica essa transição.

Na conferência final da 0.6.1, retornar à área Estudante avançou diretamente à questão 2 de 2 após o acerto na retomada. O acerto inicial seguinte registrou 10 XP e o desafio encerrou com duas questões, sem acrescentar itens. O painel do tutor manteve as tentativas original e assistida separadas e mostrou três medições de tempo. O diálogo de limpeza foi novamente conferido e cancelado, preservando o perfil. A imagem zerar-dados-0-6.jpg registra as opções, o estudante identificado, a exportação prévia e a confirmação desmarcada. Não houve nova conferência de layout móvel nesta revisão.

## Revisão 0.7: ensino por ação, prioridade visual EI e NILMO

209 testes passaram na primeira conferência da integração. Cobrem as 16 experiências (11 digitais e cinco roteiros EI), progressão por construção, ajuda antecedente, limitação de escolhas incompatíveis, exemplos diferentes, apoio pelo repertório observado e decisão do tutor, priorização de fundamentos para anos mais avançados, ensino separado de avaliação ativa, XP sem repetição/duplicação, pausa, dados, recuperação e limpeza individual. Também verificam materiais visuais sem dependência do gabarito, preservação de quantidade/posição/contorno, ausência de figuras que mudem leitura/audição, importação segura, 15 cenas por três grupos EI, mediação fora da tela, links de vídeos, revisão por etapa e ausência de player externo automático.

A contagem do catálogo permanece 226 fichas e 1.336 atividades. Os novos roteiros e cenas não foram somados como questões do banco. A matriz data/visual-teaching-coverage.json identifica o alcance. Materiais sem dados suficientes continuam pendentes de autoria visual específica; não receberam figuras genéricas para aparentar cobertura.

O nome público do mascote foi atualizado para NILMO. Identificadores técnicos e evidências históricas preservam compatibilidade e redação original quando necessário. A verificação não comprova eficácia pedagógica; ainda é necessário piloto com aprendizes e revisão de acessibilidade.
