# Jogo e gestão dos dados — versão 0.6

Data: 18/11/2026. Implementação com perfis fictícios; não validada com crianças.

## Programar e usar

1. Em Tutor → Gamificação, escolha 1–3 questões extras diárias, de conteúdos do ano ou de uma disciplina. Escolha zero para pausar a criação de desafios. A lista já criada no dia fica preservada; alterações valem para o próximo desafio ainda não criado.
2. Ao entrar na área Estudante, o desafio aberto aparece. O aluno pode ir ao Meu dia ou ao estudo programado. O desafio não modifica a sessão do tutor.
3. Na questão, o aluno pode pedir dica, esclarecer a dúvida com a explicação planejada ou retirar um distrator. Isso registra apoio, sem contar como erro. Ouvir o estímulo obrigatório é acesso à tarefa e não tem custo.
4. Acerto mostra confirmação, XP e NILMO celebrando. Erro mostra mensagem clara, orientação e possibilidade de retomada. O registro inicial permanece intacto. No encerramento do desafio, NILMO celebra a participação e nenhuma questão é acrescentada.
5. Em Retomar questões, o aluno escolhe um erro objetivo ainda não resolvido. Há no máximo duas retomadas. Depois disso, o tutor pode propor outro exemplo e rever as condições de ensino.

## Pontos

| Situação | Estudo/desafio | Aplicação/revisão | Oficina |
|---|---:|---:|---:|
| Acerto inicial sem apoio adicional | 10 | 12 | 5 |
| Acerto na primeira retomada | até 6 | até 7 | até 3 |
| Acerto na segunda retomada | até 3 | até 3 | até 1 |
| Primeira resposta incorreta | 1 | 1 | 1 |
| Resposta incorreta em retomada | 0 | 0 | 0 |

Cada apoio adicional (dica, esclarecimento ou eliminação) custa 2 XP do bônus corrente. No acerto inicial, o piso é 5 XP no estudo/aplicação/revisão e 3 na oficina; nas retomadas, 1 XP. Nunca são retirados pontos anteriores. A primeira resposta incorreta mais um acerto de retomada dá menos XP que o acerto inicial sem apoio. Etapas de explicação/exemplo mantêm 5 XP. Avaliações encerradas mantêm reconhecimento de participação, sem devolver acerto/erro durante a aplicação. Registros antigos conservam os valores originais.

Reconhecimento por alternativas não certifica competência integral. A retomada é marcada com apoio e não altera a primeira resposta ou o critério de domínio. A graduação dos pontos é uma regra editorial solicitada; efeitos sobre motivação precisam ser observados no piloto.

## Seleção e acervo

O desafio usa somente escolhas do grupo/ano e disciplina definidos, com materiais disponíveis. Exclui questões já respondidas e questões reservadas nos planos em aberto. Se houver menos itens elegíveis que o solicitado, usa o disponível e não inventa repetição. Questões incorretas ficam no fluxo de retomada com menos XP. Novos planos excluem acertos; sondagens deliberadas e relações repetidas para retirada de pistas na oficina continuam identificadas como reapresentações, não como evidência nova.

O tutor também pode definir de uma a doze questões por sessão, com ao menos uma por habilidade selecionada. A lista mantém as etapas de ensino pertinentes. Se não houver itens distintos suficientes, o aplicativo solicita reduzir a quantidade ou ampliar o acervo; não duplica questões.

## Tempo para o tutor

Só há medição enquanto a tarefa está aberta, ativa e visível. Pausas, ocultação e navegação interrompem o acúmulo. O salvamento periódico ocorre a cada cinco segundos; intervalos inesperadamente longos são limitados a 15 segundos. Tempo por questão/tarefa, total, média e CSV aparecem no painel do tutor. Respostas antigas permanecem sem medição. Não se mede atenção, latência psicométrica, capacidade ou esforço por esse registro, e o estudante não vê cronômetro.

## Zerar dados

Abra Tutor → Estudantes → Zerar dados (também disponível no painel). Confira o nome e escolha:

- Zerar histórico e manter o cadastro, objetivos, recursos de acesso e interesses.
- Excluir também o cadastro do estudante.

Antes de confirmar, é possível exportar backup. A confirmação é obrigatória e não vem marcada. A limpeza inclui avaliações, planos, sessões, respostas, ajudas, eventos, oficina, desafios, retomadas, metas, XP derivado, tempos e rascunhos desse estudante. Outros estudantes e o acervo compartilhado permanecem.

As cópias locais legíveis de recuperação também são saneadas. Uma cópia ilegível bloqueia o início da limpeza. Falha ao salvar provoca reversão de melhor esforço e aviso. A operação não cria um backup oculto do estudante apagado. Arquivos exportados, outras abas e outros dispositivos não são apagados. O aplicativo continua sem autenticação: as abas Estudante/Tutor organizam a interface, sem criar permissões de segurança.
