# Validação — versão 0.5

Data: 17/11/2026. Perfis e respostas fictícios; nenhuma aplicação com crianças.

## Regressão automatizada

111 testes nativos Node.js passaram. Abrangem avaliação sem feedback antecipado, revisão humana, ajuda e independência, primeira tentativa, novidade por enunciado e exposição, verificação antes de ensino, retenção em datas locais, materiais, listas fechadas e escolha autorizada. Incluem corrupção, recuperação, quota, substituição e conflitos entre abas, além de todos os intervalos dos 93 códigos EI, catálogo combinado 226/1336, oficina, áudio, pistas e XP.

Os 88 testes da versão 0.3 foram mantidos e complementados; uma alteração de título distingue o catálogo escolar do catálogo EI. Houve atualização do ambiente simulado da interface para carregar os novos módulos. Não há dependências de pacotes para executar a suíte. O workflow verifica sintaxe dos módulos e executa npm test.

## Inspeção em navegador — histórico da versão 0.3

- Página inicial com prioridade para exploração e autonomia; Nilo e balão ampliados.
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

127 testes automatizados passaram antes da conferência visual. Os 16 novos verificam: limites de calendário nos seis períodos e viradas de ano; segunda-feira como início da semana; meia-noite local e exclusão de datas futuras; isolamento do estudante selecionado; distinção de resultados e registros pendentes/não aferidos; não antecipação de resultados de avaliações ativas; deduplicação de tarefas; oficina separada de habilidade ampla; reconhecimento parcial excluído do domínio; data efetiva da retomada e das etapas de explicação; vazio sem tendência inventada; contagens reais do acervo; menus de cada área; meta configurada no Tutor; ausência de planejamento de oficina no Estudante; preservação dos cadastros ao trocar de área.

A infraestrutura de prévia local retornou conexão recusada. A conferência de navegação e layout da 0.5 será realizada no endereço publicado após as verificações do repositório. Até lá, não se afirma validação visual completa desta revisão.
