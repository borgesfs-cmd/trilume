# Trilume — Plataforma Inteligente de Aprendizagem

Aplicação educacional funcional de desenvolvimento para o **1º ao 9º ano do Ensino Fundamental e a 1ª à 3ª série do Ensino Médio**. O escopo não inclui Educação Infantil.

Concepção pedagógica informada: **Flávio da Silva Borges**. Guia pedagógico: **Nilo**, com arte em 3D e fundo transparente.

## O que esta versão faz

- Cadastra estudantes por apelido/código, ano escolar, objetivo e recursos de acesso.
- Exige avaliação inicial antes de individualizar a trilha.
- Registra respostas independentes, assistidas, ainda não demonstradas e não aferidas.
- Propõe duas frentes: habilidades fundamentais e currículo atual.
- Permite ao educador revisar e aprovar o plano, com horário, local e duração estimada.
- Conduz uma sessão com objetivo, modelo, prática apoiada, verificação em item diferente e transferência.
- Permite pausar, retomar ou encerrar sem penalidade e sem acrescentar tarefas.
- Mantém respostas abertas aguardando análise humana.
- Calcula evidências por habilidade sem contar repetições do mesmo item como novas provas de domínio.
- Permite preparar retenção em outra data, antes de reapresentar o ensino.
- Oferece biblioteca pesquisável e editável, importação/exportação de acervo, backup e registros CSV.
- Inclui ampliação de texto, modo foco, opção de ocultar o Nilo e leitura em voz alta quando compatível com a habilidade avaliada.

## Biblioteca inicial

**120 habilidades e 392 atividades**, sendo 112 unidades curriculares e oito habilidades fundamentais. Todos os anos do escopo e seus componentes estão representados.

O acervo é **autoral, inicial e sujeito a curadoria**. Não equivale à cobertura integral da BNCC, não contém instrumentos psicológicos de uso restrito e não é um teste padronizado. Correspondências específicas por código BNCC permanecem pendentes até conferência pelo educador. No Ensino Médio, a distribuição por série é uma proposta local, não uma seriação obrigatória da BNCC.

Veja [cobertura e curadoria](docs/COBERTURA_E_CURADORIA.md) e [metodologia](docs/METODOLOGIA.md).

## Começar

Abra `index.html` em um navegador atual ou utilize a publicação estática do repositório. Não há dependências de interface, instalação de pacotes ou chaves de API.

1. Clique em **Cadastrar estudante** ou use o perfil fictício de demonstração.
2. Abra **Avaliação inicial**, selecione de duas a seis habilidades e informe o educador.
3. Registre as respostas. As correções ficam para depois da aplicação.
4. Encerre a avaliação e confira o ponto de partida por habilidade.
5. Em **Trilha de aprendizagem**, escolha uma ou duas habilidades já observadas e aprove o plano.
6. Em **Meu estudo**, confira o combinado e realize as etapas.
7. Em **Acompanhamento**, analise as respostas abertas.
8. Cadastre novos itens equivalentes antes de reutilizar verificações já vistas.

## Dados e limites

Esta versão é uma aplicação estática para uso individual do educador. Os registros ficam em `localStorage` neste navegador, sem autenticação, isolamento por contas, banco central ou sincronização. A seleção de estudante não é controle de acesso. Use identificação fictícia nos testes. Exporte backups antes de trocar de navegador, limpar dados ou atualizar a origem de hospedagem.

Não há chat generativo, diagnóstico clínico ou decisão escolar automatizada. Critérios são configuráveis por habilidade e exigem revisão humana. A proposta metodológica combinada precisa ser avaliada empiricamente no produto.

Para uso institucional com dados reais, é necessário implementar backend seguro, autenticação e autorizações por vínculo, estratégia de proteção de dados de menores, governança, recuperação e auditoria de servidor. Estes recursos não são simulados como se estivessem prontos.

## Testes

Requer Node.js 20 ou superior somente para testes:

```sh
npm test
```

Os testes cobrem linha de base obrigatória, aprovação do educador, ajuda versus independência, lista fechada, encerramento sem penalidade, itens inéditos, critérios de aprendizagem, retenção, generalização, importação e cobertura estrutural dos 12 anos. O GitHub Actions executa a verificação a cada push.

## Arquivos

- `index.html`, `styles.css`, `app.js`: interface responsiva.
- `engine.js`: regras pedagógicas determinísticas.
- `data/catalog.js` e `data/catalog.json`: acervo inicial versionado.
- `assets/nilo.png`: mascote 3D transparente.
- `tests/engine.test.cjs`: testes das regras.
- `docs/`: metodologia, cobertura, rastreabilidade e limites.
- `history/`: protótipo anterior e prompt executivo recuperados como histórico; não fazem parte da interface atual.

## Autoria

© 2026 Flávio da Silva Borges — direitos reservados sobre componentes originais de sua autoria ou titularidade. O crédito não comprova registro de marca ou exclusividade sobre ativos de terceiros. A arte do Nilo foi gerada com IA. O nome anterior **Trilha** é mantido apenas nos arquivos históricos. Não foi realizada verificação de disponibilidade jurídica da marca Trilume.
