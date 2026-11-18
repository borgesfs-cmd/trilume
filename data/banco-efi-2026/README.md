# TRILUME — BANCO EFI 1.000 ITENS | 18/11/2026

Lote autoral para **revisão pedagógica**, com 1.000 questões completas e categorizadas.

## Distribuição e progressão
- Cinco anos de escolaridade (1º ao 5º), 200 por ano.
- Cinco componentes (Língua Portuguesa, Matemática, Ciências, História, Geografia), 200 por componente.
- Cada combinação de ano e componente tem exatamente **40 itens**.
- Dificuldade esperada (total): {'Básico': 350, 'Inicial/pré-requisito': 200, 'Intermediário': 300, 'Desafiador': 150}.
- 50 ilustrações vetoriais SVG contextuais, com descrição alternativa e sem necessidade de leitura visual para concluir os itens.
- 209 códigos BNCC distintos, ainda em processo de validação de vínculo por questão.

## Arquivos
- `Trilume_EFI_1000_Questões_Auditadas.xlsx`: tabela completa e duas abas de auditoria.
- `questoes_efi_1000.csv`: tabela de importação com 29 campos (separador ponto e vírgula UTF-8).
- `questoes_efi_1000.json`: banco estruturado com todas as categorias.
- `questoes_efi_1000.ndjson`: registros individuais por linha para ingestão incremental.
- `imagens/`: SVG original por questão ilustrada, com metadados de acessibilidade.
- `visualizador_1000.html`: revisão pedagógica com filtros e gabaritos opcionais (servidor web local).
- `manifesto_auditoria.json`: totais, regras e alertas.

## Critérios e avisos
- O rótulo de dificuldade é uma **estimativa editorial**, não uma análise psicométrica.
- Códigos da BNCC são propostas de alinhamento; verificar os descritores oficiais e a pertinência de cada item.
- A checagem de repetições elimina enunciados exatos; uma banca humana precisa avaliar redundância semântica e equívocos conceituais.
- **Não liberar automaticamente no painel do estudante sem homologação.**
- Antes de integrar à plataforma, conferir formato do esquema de atividades, papéis de tutor e estudante e política de persistência.
- A plataforma Trilume atualmente é estática; registrar em repositório não equivale a sincronização com backend remoto.