# Revisão dos enunciados e orientações — 0.8

Revisão editorial de 19/11/2026. Fonte examinada: os catálogos ativos `catalog.json`, `early-childhood.json` e `repertoire.json`. Esta revisão responde à crítica de que os enunciados eram genéricos, pouco claros e distantes da ação da criança.

## Problema encontrado

No catálogo escolar, **228** das 372 atividades de resposta humana usavam a mesma frase para o aluno: “Faça esta atividade com o tutor. Você pode falar, apontar ou mostrar.” Essa frase ocupava o lugar da instrução específica. As outras 144 atividades humanas escolares não usavam esse enunciado genérico.

Na Educação Infantil, as **372** atividades humanas repetiam “Vamos brincar juntos. O adulto vai mostrar o combinado.” Os materiais repetiam o mesmo parágrafo longo sobre escolhas, acesso e segurança, mesmo quando a proposta era outra. A frase não dizia se a criança deveria escolher um brinquedo, contar bonecos, fazer uma marca, ouvir uma história ou comunicar uma ideia.

## Correção aplicada na apresentação

O módulo `item-copy.js`, exportado como `TrilumeItemCopy`, oferece `enrich(activity, skill)` e `coverage(skills)`. Ele trabalha em uma cópia da atividade, preserva os bancos de origem e deve ser aplicado somente ao catálogo carregado para **novos** planejamentos. Não se aplica às cópias de tarefas de sessões, avaliações e backups anteriores.

| Alcance | Apresentações | O que mudou |
| --- | ---: | --- |
| Educação Infantil | 372 | 93 convites específicos, um por objetivo, com materiais e orientação adulta separados por fase |
| Escolar, redação autoral revista | 71 | Frases mais curtas nos itens identificados do 1º ao 3º ano, preservando a tarefa e seus dados |
| Escolar, instrução original revelada | 157 | O enunciado real substitui a frase genérica que o escondia; não equivale a revisão completa da redação |
| Total com apresentação revista | **600** | Não altera gabarito, modalidade, alternativas ou critérios de análise |
| Apresentações intocadas | **736** | Incluem escolhas e repertórios que já tinham instrução específica |
| Total examinado estruturalmente | **1.336** | A contagem não representa homologação pedagógica integral |

As versões das atividades cuja apresentação mudou aumentam uma unidade e recebem `revisionTag: "0.8"`. A rotina é idempotente. `copyOriginalPrompt` conserva o enunciado anterior para rastreabilidade. Para os bebês, `learnerAudience: "adult"` informa que a orientação é destinada ao adulto. O convite para crianças maiores é oral e não exige leitura independente.

## Exemplos

| Item | Antes, no lugar do enunciado | Depois |
| --- | --- | --- |
| 1º ano, contagem | Faça esta atividade com o tutor. Você pode falar, apontar ou mostrar. | Conte os seis objetos. Aponte para cada objeto uma vez. |
| 1º ano, localização | Faça esta atividade com o tutor. Você pode falar, apontar ou mostrar. | Desenhe a sala. Marque onde fica a porta. |
| 2º ano, quantidade | Faça esta atividade com o tutor. Você pode falar, apontar ou mostrar. | Uma caixa tem sete peças. Outra caixa tem cinco. Quantas peças há nas duas caixas juntas? |
| EI02ET07, correspondência | Vamos brincar juntos. O adulto vai mostrar o combinado. | Coloque um prato de brinquedo para cada boneco. Confira se todos receberam. |
| EI01EF03, livro com bebê | Vamos brincar juntos. O adulto vai mostrar o combinado. | Abra o livro e mostre uma página ao bebê. Acompanhe a figura para a qual ele olha. **Orientação para o adulto.** |
| EI03EF09, escrita emergente | Vamos brincar juntos. O adulto vai mostrar o combinado. | Faça uma placa para sua construção. Conte o que ela quer dizer. |

A orientação de cada item EI separa materiais, situação específica, convite e observação. A linha de base pede observação antes de ensinar uma solução. A prática pode incluir uma demonstração breve. Transferência e observação posterior mantêm novo espaço/contexto ou outra data e não recebem demonstração prévia. A rubrica original continua a orientar a análise.

## Materiais ainda necessários

A revisão textual não produz fotografias, relatos, textos ou objetos que não estavam fornecidos. Permanecem itens dependentes da seleção e do preparo do educador, por exemplo:

- `2-3-b`: fotografia antiga de uma rua;
- `3-0-b`: relato curto;
- `3-4-b`: croqui com legenda;
- `EI02EF04`: história autoral da bola no jardim;
- `EI03EF04`: narrativa autoral para encenação;
- vários itens de Arte e História com obras, fontes e imagens escolhidas pelo professor.

A interface precisa deixar explícita essa preparação e impedir que a ausência do material se transforme em erro da criança. A frase curta, sozinha, não torna esses itens autossuficientes. As ilustrações gerais da plataforma também não substituem o estímulo específico exigido por cada questão.

## Verificação

Oito testes específicos passaram. Conferem alcance real, linguagem concreta, instrução para o adulto com bebês, distinção entre fases, cópias e versões, resistência a um identificador de questão reutilizado, preservação dos trechos de leitura e de todos os gabaritos, alternativas, referências, rubricas, alvos auditivos e modalidades dos 1.336 itens. Todas as atividades enriquecidas passaram pela validação estrutural de `engine.validateActivity`.

Os testes verificam integridade e apresentação. Não comprovam compreensão das instruções por cada criança. A próxima revisão deve incluir leitura crítica dos 157 enunciados escolares apenas revelados, análise dos estímulos em falta e observação de uso com aprendizes, sem reduzir a exigência da habilidade que se quer observar.
