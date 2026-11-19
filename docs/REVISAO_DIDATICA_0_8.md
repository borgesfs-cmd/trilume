# Revisão didática — textos de ensino 0.8

Escopo: redação das 16 experiências de `learn-do.js`, diagnóstico documental dos catálogos ativos e propostas para os enunciados. Esta revisão não altera o banco e não representa validação clínica ou aplicação com crianças.

## Problema principal identificado

`learnerQuestion` apresenta `learnerPrompt` antes de `prompt`. Há **600 apresentações genéricas** nos arquivos ativos: 228 escolares usam “Faça esta atividade com o tutor. Você pode falar, apontar ou mostrar.” e 372 da Educação Infantil usam “Vamos brincar juntos. O adulto vai mostrar o combinado.” Esses textos oferecem formas de participação, mas ocultam a ação específica da tarefa. O registro adulto, o convite à criança e os recursos de acesso precisam ficar em campos próprios.

Um exemplo é `2-0-b`, da ficha `CUR-02-01`: o `prompt` pede “Leia: A roda de histórias será terça-feira na biblioteca. Onde será a atividade?”, mas a apresentação principal é genérica. Isso não se corrige acrescentando uma imagem decorativa ao mesmo texto.

## Exemplos de correção — propostas, ainda não aplicadas ao banco

| Item | Texto atual | Proposta e apresentação necessária |
| --- | --- | --- |
| `CUR-01-02-OBJ-2` | “Qual grupo tem mais objetos?” | Mostrar efetivamente os dois conjuntos e dizer “Toque no grupo com mais peças.” Sem os conjuntos, falta o estímulo necessário. A resposta e a versão do item precisam acompanhar a nova apresentação. |
| `CUR-01-06-TOUCH-1` | “Entre Linha ondulada., Triângulo, Círculo., qual forma tem apenas linhas retas?” | Mostrar as três formas e perguntar “Qual figura tem só lados retos?”. Retirar a enumeração truncada, as maiúsculas internas e a leitura dos nomes como barreira adicional. |
| `CUR-02-01-TOUCH-3` | “Leia: ‘Na segunda-feira, a turma vai ao biblioteca.’ Aonde a turma vai?” | “Leia: ‘Na segunda-feira, a turma vai à biblioteca.’ Para onde a turma vai?” Corrigir a contração. Se o objetivo é localizar informação escrita, uma ilustração da biblioteca não pode substituir a leitura e antecipar a resposta. |
| `CUR-03-03-TOUCH-1` | “Para uma janela que deixe passar luz, qual material escolher: plástico transparente ou papelão?” | No ensino, primeiro testar os dois materiais em condições comparáveis; depois perguntar “Qual material deixa a luz passar?”. No item de verificação, fornecer materiais ou representação pertinentes, sem apresentar antes a solução específica. |
| Propostas humanas EI | “Vamos brincar juntos. O adulto vai mostrar o combinado.” | Substituir a frase única por um convite oral concreto, como “Quer a bola ou o cubo?”, e separar: o que o adulto prepara, o que apresenta, quanto espera e o que registra. O convite depende da atividade real, não pode ser aplicado indiscriminadamente às 372 propostas. |

## Novo módulo de redação

`teaching-copy.js` exporta `TrilumeTeachingCopy.guide(lessonId, phase, ageBand, modelStep, target)` e `lessonIds`. `phase` é 0–3; `modelStep` é 0–2; `ageBand` aceita EI01/EI02/EI03 ou `null`/ausente nas demais etapas. Entradas desconhecidas são recusadas.

O retorno tem cinco campos de texto simples:

- `title`: a finalidade concreta do momento.
- `learner`: uma ação ou um convite oral curto, dirigido à criança.
- `adult`: o que mostrar, perguntar, esperar e apoiar.
- `prepare`: materiais ou elementos efetivamente usados na atividade.
- `observe`: ações a registrar, sem transformar observação em diagnóstico.

Para atualizar a frase após cada ação, passe o estado atual dentro de `target.work`: `guide(r.lessonId, r.phase, r.ageBand, r.modelStep, {...LearnDo.target(r), work:r.work})`. Isso evita pedir novamente uma colocação já concluída e permite, por exemplo, trocar “ligue a lanterna” por “troque o material”. Na fase 2, a frase pode orientar o próximo gesto a partir dessa construção; na fase 3, apresenta o objetivo do novo exemplo sem ditar a ordem das respostas. O módulo não altera a construção, não marca acerto e não substitui as regras de ajuda.

## Alinhamento dos cinco roteiros EI às novas imagens

| Roteiro | Materiais/contexto | Três passos apresentados ao adulto |
| --- | --- | --- |
| Escolha e convivência | Bola amarela grande e macia e cubo roxo grande e macio. | Oferecer as duas escolhas; esperar a comunicação; entregar o escolhido. Sem objeto certo. |
| Corpo e movimento | Uma bola grande e macia, rolada por curta distância sobre um tapete. | Demonstrar o rolamento; oferecer a vez da criança; devolver e esperar. Sem tecido, circuito ou condução obrigatória da mão. |
| Criação | Folha grande e giz roxo grosso apropriado à idade. | Oferecer um lugar para começar; acompanhar o traço livre; olhar a marca produzida. A ilustração não é um desenho para copiar. |
| Figuras e comunicação | Adulto com livro ilustrado, incluindo bola e casa. | Nomear uma figura; seguir o interesse da criança; responder ao gesto, som ou palavra. Sem exigir nomeação ou leitura. |
| Correspondência | Duas bolas amarelas grandes e duas tigelas roxas vazias. | Mostrar objetos e lugares; colocar uma bola; oferecer a outra para completar. Mantém duas unidades também no EI03; três unidades serão outra proposta. |

Para EI01, os cinco roteiros usam o contexto de um bebê confortavelmente apoiado e de um adulto mostrando um cartão grande com uma bola. Os textos propõem apresentação, espera e resposta aos sinais do bebê, sem exigir sentar, alcançar, acompanhar movimentos, nomear, contar ou acertar. O adulto opera a tela. EI02 mantém as ações com materiais no espaço real; EI03 pode usar toque somente nas atividades de tela apropriadas.

## Cuidados na integração

Os três passos textuais orientam o que o adulto faz com os materiais reais. Uma imagem contextual não deve ser narrada como se fosse uma animação de cada gesto. Nas experiências de tela, o exemplo precisa mostrar a transformação descrita; trocar uma frase não torna um ícone estático uma demonstração.

Há ainda uma ambiguidade a corrigir no feedback atual de frações: “Cada parte é uma metade da barra.” Com oito ou doze retângulos, essa frase pode atribuir metade a cada retângulo. Preferir: “A região pintada e a região branca têm o mesmo tamanho. Cada uma dessas duas regiões é metade da barra.”

A redação nova evita instruções como “realize a vivência”, “explore possibilidades” e “compare relações”. O adulto recebe a sequência concreta; a criança recebe uma ação por vez. A equivalência entre essas apresentações, a compreensão das instruções e os efeitos do ensino precisam ser observados na aplicação pedagógica.
