# Trilume — Plataforma Inteligente de Aprendizagem

**[Abrir a Trilume](https://borgesfs-cmd.github.io/trilume/)** · Versão 0.5 de desenvolvimento · Concepção pedagógica: Flávio da Silva Borges.

Educação Infantil, 1º ao 9º ano do Ensino Fundamental e 1ª à 3ª série do Ensino Médio. A experiência de ensino articula finalidade, exploração, demonstração, prática conjunta, reflexão, verificação e uso em outros contextos. O banco de exercícios apoia decisões do educador.

## Três áreas no menu

- **Estudante:** Meu dia, Meu estudo, Minhas descobertas e Minha jornada; atalhos para avaliação e oficina já preparadas. Barras de etapas e conteúdos explorados, com histórico diário, semanal, mensal, bimestral, semestral e anual.
- **Tutor:** painel detalhado do estudante selecionado, cadastros, avaliação inicial, sessões, sondagens, oficina, gamificação e revisão humana dos registros.
- **Geral:** dados do acervo, biblioteca e exercícios, instruções, backups e auditorias.

Os painéis distinguem participação, pontos e evidência de aprendizagem. Trocar de área não cria contas nem permissões: continua sendo um aplicativo individual, com dados neste navegador. Veja [menu e indicadores](docs/MENUS_E_PAINEIS_0_5.md).

## Experiência e recursos

- Cadastro por toque: grupo escolar, vários objetivos, recursos de acesso e interesses; identificação gerada e detalhes opcionais.
- Avaliação inicial planejada pelo tutor, participação em uma tarefa por vez, correção após a aplicação e revisão humana.
- Repertórios em 13 áreas, com três formas autorais, comparação entre sondagens e observação por toque. [Fundamentos e limites](docs/REPERTORIOS_E_ACESSO_0_4.md).
- Plano com seletores e múltiplos materiais, lista fechada, possibilidade de escolher a ordem das habilidades aprovadas, pausa e encerramento sem penalidade.
- 120 fichas escolares/fundamentais com exemplos demonstrados, exploração, prática conjunta e reflexão opcional.
- Educação Infantil com 93 códigos de objetivos e 380 propostas mediadas, sem nota de desenvolvimento. Bebês e crianças bem pequenas participam em vivências fora da tela.
- Oficina de seis palavras que relaciona som, figura, escrita, função e contexto; distingue ensino, sondas e leitura oral analisada pelo tutor.
- Minha jornada: meta ajustável ou pausada, XP de participação, dias com registros, conquistas e sugestões de retomada. XP não mede aprendizagem. Dicas e retirada de alternativas não contam como erro; reduzem somente o bônus da atividade, preservando a participação e pontos anteriores.
- Nilo com imagem ampliada, fala destacada e 12 contextos; texto ampliado, foco, teclado e preferência de movimento reduzido.
- Biblioteca editável, materiais, pistas, respostas aceitas, versões, importação/exportação, recuperação e proteção contra sobrescrita entre abas.

## Novo banco EFI — 1.000 questões em curadoria (18/11/2026)

Foi incorporado ao repositório um lote autoral com **1.000 itens do 1º ao 5º ano**, organizado em cinco arquivos anuais com 200 itens por ano e 40 por componente curricular por ano. Inclui 50 ilustrações SVG contextuais e classificação por ano, área, BNCC proposto, conteúdo e dificuldade esperada.

**[Abrir o visualizador de curadoria do banco EFI](banco-efi-curadoria.html)** · [Consultar os arquivos de dados](data/banco-efi-2026/) · [Manifesto da auditoria](data/banco-efi-2026/manifesto.json).

**Importante:** os itens são rascunhos de revisão pedagógica. O banco está no repositório, mas não foi ativado automaticamente nas atividades dos estudantes ou em um backend remoto. O grau de dificuldade informado é editorial; os códigos BNCC e a qualidade de cada item exigem homologação antes do uso.

## Acervo e auditorias

A aplicação contém **226 fichas/áreas e 1.336 atividades**: catálogo escolar de 120/800, catálogo EI de 93/380 e repertórios de 13/156. O Fundamental contém 376 escolhas em 604 atividades (62,25%). Os novos itens de reconhecimento parcial não certificam domínio integral. Contagens não representam cobertura integral ou qualidade validada. As fichas EF/EM ainda precisam de códigos específicos homologados; a distribuição por série no Médio é uma proposta local.

O lote adicional **Educação Infantil — banco lúdico 30** (15 linguagem e 15 matemática) foi incorporado ao repositório para curadoria, acessível em Geral → Dados do acervo, mas não ao catálogo ativo. Os arquivos de mídia e a homologação pedagógica ainda estão pendentes. Veja [detalhes da integração EI](docs/INTEGRACAO_EI_LUDICO.md).

O banco reconstruído nos outros chats possui 3.583 registros ainda pendentes de validação e bloqueados ao aluno. Foi consultado para curadoria; não foi somado nem disponibilizado automaticamente no aplicativo. Veja [integração dos bancos](docs/INTEGRACAO_BANCOS.md).

- [Auditoria metodológica e fundamentos](https://borgesfs-cmd.github.io/trilume/auditoria-metodologica.html)
- [Análise curricular por ficha, com filtros e matriz CSV](https://borgesfs-cmd.github.io/trilume/auditoria-curricular.html)
- [Auditoria técnica e correções](https://borgesfs-cmd.github.io/trilume/auditoria-tecnica.html)
- [Resultados de validação](docs/VALIDACAO.md)

As 120 fichas escolares ainda têm menos enunciados distintos de aquisição e de retenção que seus parâmetros exigem. Critérios não foram reduzidos para produzir aparente domínio. Exemplos e atividades são autorais iniciais, sujeitos à revisão de área e ao piloto.

## Usar

Abra o endereço publicado ou index.html em navegador atual. Não exige conta, chaves de API, pacotes de interface ou backend.

1. Cadastre um perfil fictício para testar e escolha grupo ou ano.
2. Prepare uma avaliação breve com materiais e condições de acesso; aplique sem antecipar correção.
3. Encerre e analise as produções e a ajuda observada no espaço do tutor.
4. Escolha objetivos já observados, revise materiais e aprove uma sessão.
5. Explore, veja exemplos, faça junto e registre o procedimento; use itens novos para verificar e revisar.
6. Acompanhe as evidências e combine retomadas. A jornada reconhece participação, separadamente da análise de aprendizagem.

## Dados e limites

Versão estática para uso individual do educador: dados em localStorage neste navegador, sem contas, autenticação ou sincronização. Separação entre telas de tutor e estudante é somente de interface. Use identificação fictícia nos testes e exporte backups antes de trocar de dispositivo ou limpar dados. Corrupção e conflito entre abas têm proteção de melhor esforço; não substituem recuperação remota nem transações de banco.

Não há chat generativo, diagnóstico, teste psicológico padronizado, avaliação neuropsicológica ou certificação escolar automatizada. A metodologia combinada precisa de avaliação empírica. Uso institucional com dados reais exige backend, autenticação, autorização por vínculo, proteção de dados de menores e recuperação.

## Desenvolvimento

Node.js 20+ para executar `npm test`. Não há dependências de execução da interface. O workflow verifica sintaxe e testes a cada push. Os relatórios são gerados por `python scripts/build-audits.py`; o CSV acompanha o catálogo atual.

Arquivos principais: app.js (interface), engine.js (regras), assessment.js (avaliação), storage.js (persistência), library-tools.js (curadoria), word-lab.js (oficina), gamification.js (jornada), nilo.js e assets/ (mascote), data/ (catálogos), tests/ (regressão), docs/ (auditorias). history/ preserva versões anteriores e não integra a aplicação atual.

© 2026 Flávio da Silva Borges — direitos reservados sobre componentes originais de sua autoria ou titularidade. A arte do Nilo foi gerada com IA. A marca não foi apresentada como registrada. O nome anterior Trilha permanece apenas no histórico.
