# Consulta dos bancos produzidos nos outros chats

Em 17/11/2026 foram consultados os arquivos TRILUME_BANCO_RECONSTRUIDO_NUWK_v05.zip e TRILUME_Auditoria_Real_v04.zip disponibilizados no projeto. O v05 contém o banco SQLite, o JSON estruturado, os originais v04 e instruções de curadoria.

A leitura direta do JSON confirmou 3.583 IDs únicos e 2.140 enunciados distintos: 151 registros de EI, 2.520 de EF e 912 de EM. Os 3.583 estavam com validação pedagógica pendente, publicavel=false e liberado_ao_aluno=false. Há 616 registros com vínculos candidatos e nenhum homologado declarado pelo pacote. A matriz de 1.721 referências não traz todos os descritores oficiais completos. O hash e os indicadores conferidos estão em data/external-bank-audit.json.

A aplicação atual mantém separadamente seus 213 objetivos/fichas e 876 atividades. Não foi realizada soma entre os acervos sem análise de sobreposição e qualidade. O banco recuperado não foi publicado em massa em uma página de estudante.

## O banco a serviço do ensino

Uma questão é selecionada pela função na experiência: observar repertório, apoiar exploração, demonstrar um procedimento, praticar, verificar, retomar ou transferir. Ela não define sozinha a metodologia.

Exemplos de triagem encontrados no pacote:

- TRL-00016 está rotulado como contagem, mas solicita compor duas quantidades para obter o total. Antes de tratá-lo como evidência de contagem isolada, distinguir contagem, cardinalidade e adição e planejar representação concreta.
- TRL-00031 compara números de duas ordens. O comentário alude a dezenas, mas é necessário ensinar representação e comparação posicional e observar o procedimento, não apenas escolher o número maior.
- TRL-00056 solicita uma fração de quantidade. O comentário registra uma operação; o ensino deve representar a unidade, formar partes iguais e relacionar a quantidade tomada à fração antes da expressão simbólica.
- TRL-00173 solicita identificar generalização indevida. Uma seleção correta não demonstra produção argumentativa autônoma; planejar análise de exemplos, reconstrução da conclusão e produção com evidências.

Estes comentários são análise documental preliminar, não homologação dos itens. Os IDs originais devem ser preservados em futura integração.

## Critérios para integrar cada seleção

1. Conferir o texto oficial da habilidade e o currículo da rede, mantendo vínculo como candidato até revisão identificada.
2. Definir resposta ou produção observável e sua função na experiência de ensino.
3. Preparar explicação, exemplo, experiência lúdica ou investigação com materiais e acesso adequados.
4. Conferir gabarito, alternativas, rubrica, ambiguidade, direitos e condições de mediação.
5. Registrar família e exposições; trocar formato ou número não garante uma evidência nova ou mais complexa.
6. Planejar como oferecer e retirar ajuda e como observar uso em outro contexto.
7. Pilotar, revisar e versionar a decisão antes de disponibilizar ao estudante.

Uma plataforma estática não oferece isolamento real entre curador e estudante. O acervo em revisão não deve ser anexado integralmente ao site público sob a suposição de que esconder um botão o torna privado.
