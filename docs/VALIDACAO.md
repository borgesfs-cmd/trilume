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

## Verificações da versão 0.2

A suíte contém 54 testes: 24 regras do motor, 20 verificações da avaliação e dez verificações de renderização e fluxo com DOM simulado. Os testes cobrem:

- planejamento com questões selecionadas, cópia do enunciado e versão;
- tela do estudante sem gabarito, rubrica ou correção antecipada;
- escolha objetiva, produção aberta, pendência de análise e revisão pelo tutor;
- ajuda registrada preservada como assistência;
- pausa, encerramento idempotente, itens não aferidos e reapresentação identificada;
- avaliações complementares sem perda de evidência por habilidade;
- presença do Nilo nas oito páginas e seus 12 contextos;
- múltipla escolha no estudo e na criação de questões;
- contraste das cores principais de texto, superfícies e botão.

Os 54 testes passaram no ambiente JavaScript de elaboração. A execução nativa com Node é feita pelo GitHub Actions antes da promoção desta versão para main; o resultado da execução acompanha o commit no repositório. Os testes de interface usam simulação de DOM, não um navegador completo. A revisão visual e de interação em navegador desta atualização não pôde ser realizada no ambiente de elaboração. O histórico de validação da versão anterior não equivale à validação visual da versão 0.2.

## Limitações materiais

Aplicação estática, armazenamento no navegador, sem autenticação ou autorização de servidor. A separação entre tutor e estudante organiza a interface e não protege dados com senha. Sem IA generativa. Acervo inicial, sem cobertura integral da BNCC. As 104 novas questões estruturadas concentram-se em linguagem e matemática; a representação dos demais componentes usa os itens abertos existentes. As fichas e questões permanecem sujeitas a curadoria disciplinar e não constituem instrumentos padronizados.

A importação de backup substitui registros locais após conferência; uma cópia anterior é preservada em outra chave local. Uma falha de quota/localStorage precisa de exportação para evitar perda dos registros mantidos apenas na aba.

Próximas frentes: curadoria disciplinar, novas questões equivalentes, rubricas específicas, revisão visual com usuários, auditoria de acessibilidade, backend e vínculos de acesso e validação empírica do produto.
