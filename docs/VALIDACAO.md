# Rastreabilidade e validação

| Requisito | Interface | Regra / registro | Verificação |
| --- | --- | --- | --- |
| Cadastrar estudante | Estudantes | validateStudent; students | Validação do ano e cadastro |
| Linha de base antes da trilha | Avaliação inicial → Trilha | hasBaseline; propose; makePlan | Testes de bloqueio e não aferida |
| Dois percursos | Trilha | lane foundation / curriculum | Preservação de habilidades não aferidas |
| Revisão e aprovação humana | Plano da sessão | approvedBy; baselineId | Plano sem educador rejeitado |
| Separar apoio e independência | Meu estudo → Acompanhamento | score; helpEvents; human_review | Acerto assistido não vira domínio |
| Verificar em item diferente | Plano; biblioteca | unused; identificação + versão | Itens vistos não repetem evidência |
| Lista fechada de atividades | Combinado; estudo | cópia do plano ao iniciar | Pausa e encerramento preservam lista |
| Encerrar sem punição | Meu estudo | finishSession | Encerramento idempotente sem penalidade |
| Produção aberta com análise humana | Acompanhamento | pending; review | Fluxo de revisão e justificativa |
| Aquisição | Acompanhamento | mastery | Itens distintos, precisão e sessões |
| Retenção | Plano de retenção | maintenance após aquisição | Não cria aquisição e exige datas distintas |
| Generalização | Aplicação em outro contexto | transfer e context | Contextos distintos após aquisição |
| Acervo por todos os anos | Biblioteca | year 1 a 12; componentes | Testes de presença por ano e componente |
| Sem Educação Infantil | Cadastro; biblioteca | year 1 a 12, year 0 transversal | Teste de exclusão da etapa |
| Importação de dados | Como usar; biblioteca | validateBackup; validateSkill | Arquivos incompletos rejeitados |
| Histórico anterior | history/ | protótipo e prompt executivo | Preservação sem substituir fonte anterior |

## Verificações realizadas durante a elaboração

- As 120 fichas foram validadas contra o esquema do motor.
- A sintaxe de app.js e engine.js foi verificada em JavaScript.
- As 21 regras de teste foram executadas em um ambiente JavaScript com adaptadores de asserção. O mesmo arquivo está preparado para execução nativa com node:test no GitHub Actions.
- A validação visual e de interações deve ser registrada após a publicação. A existência de testes do motor não comprova acessibilidade completa, validade de instrumentos ou eficácia educacional.

## Limitações materiais

Aplicação estática, armazenamento no navegador, sem autenticação ou autorização de servidor. Sem IA generativa. Acervo inicial de desenvolvimento, sem cobertura integral da BNCC. A importação de backup substitui registros locais apenas depois de conferência; uma cópia anterior é preservada em outra chave local. Uma falha de quota/localStorage deve ser resolvida com exportação, não confundida com salvamento concluído.

Próximas frentes: backend e vínculos de acesso; curadoria disciplinar; novos itens equivalentes; rubricas específicas; testes com usuários autorizados; auditoria de acessibilidade; validação empírica do produto.
