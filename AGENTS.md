# AGENTS.md

## Objetivo do projeto

Este projeto é uma PWA estática para preencher ordens de serviço, incluir registros fotográficos e assinaturas e gerar um documento por meio da impressão do navegador.

Ao desenvolver o projeto, preserve a ideia original e o fluxo simples de uso em campo. Evolua somente o que for solicitado e evite mudanças de produto, identidade visual ou arquitetura que não sejam necessárias para a tarefa.

## Público e ambiente de uso

- O uso principal acontece em celulares e tablets.
- Android, iPhone e iPad devem ser considerados.
- A interface deve continuar responsiva e adequada para toque.
- O projeto é publicado no GitHub Pages e deve permanecer compatível com hospedagem totalmente estática.
- O funcionamento offline é obrigatório, embora não seja necessário testá-lo em toda alteração.

## Arquitetura e arquivos principais

O projeto não possui framework, processo de build ou dependências externas. Mantenha essa característica.

- `index.html`: estrutura e conteúdo do formulário.
- `styles.css`: estilos de tela, responsividade e impressão.
- `script.js`: comportamento do formulário, fotos, assinaturas e registro do Service Worker.
- `sw.js`: cache e funcionamento offline.
- `manifest.json`: configuração da PWA.
- `mman.png`: logotipo da empresa.

Use somente HTML, CSS e JavaScript puros, salvo solicitação explícita em contrário. Não introduza frameworks, bibliotecas, gerenciadores de pacotes, bundlers ou etapas de compilação por iniciativa própria.

## Execução e publicação

- Durante o desenvolvimento, abra o `index.html` no navegador para testar a aplicação.
- A publicação é feita pelo GitHub Pages.
- Preserve caminhos relativos e evite recursos que dependam de backend, variáveis de ambiente ou rotas tratadas pelo servidor.
- Ao alterar os arquivos mantidos em cache, atualize a versão de `CACHE_NAME` em `sw.js` para que instalações existentes recebam a nova versão.

## Regras de negócio e experiência

- O documento é gerado com `window.print()` e com o recurso de salvar como PDF do navegador.
- Preserve quatro espaços de foto criados inicialmente.
- O usuário pode adicionar mais fotos, mas não deve remover os quatro espaços iniciais.
- Espaços de foto sem imagem não devem aparecer no documento impresso. Essa regra deve ser preservada quando for implementada ou alterada a impressão.
- Na impressão, título e imagem formam um bloco indivisível: nunca separe o título de sua foto entre páginas e nunca corte esse bloco no meio.
- A quantidade de fotos por página deve ser definida pelo espaço disponível. Não imponha uma quantidade fixa se isso causar cortes.
- Respostas `Sim` e `Não` do checklist são mutuamente exclusivas. O usuário não pode deixar as duas opções marcadas simultaneamente para uma mesma pergunta.
- A impressão deve preservar blocos relevantes e evitar cortes de fotos, títulos e assinaturas.

## Dados, fotos e privacidade

- Os dados devem permanecer somente no dispositivo do usuário. Não envie informações, fotos ou assinaturas para servidores ou serviços externos.
- O objetivo do produto é persistir localmente campos, seleções, fotos e assinaturas até o usuário clicar em `Limpar tudo`.
- Essa persistência ainda é uma funcionalidade planejada. Ao implementá-la, use armazenamento local compatível com o volume de imagens e com os navegadores móveis suportados.
- Não apague dados automaticamente ao atualizar ou reabrir a página depois que a persistência estiver implementada.
- A limpeza deve acontecer somente após uma ação explícita do usuário e deve pedir confirmação antes de apagar tudo.

## Identidade e conteúdo protegidos

Mantenha como estão, exceto quando o pedido mencionar expressamente uma alteração:

- logotipo;
- cores e identidade visual;
- lista de serviços;
- textos do formulário;
- finalidade e estrutura geral da ordem de serviço.

## Organização do código

- É permitido melhorar gradualmente a organização do HTML, CSS e JavaScript nas áreas tocadas pela tarefa.
- Pode-se substituir estilos inline e manipuladores inline por código organizado nos arquivos correspondentes, desde que aparência e comportamento sejam preservados.
- Prefira nomes claros em português, coerentes com o código existente e com o domínio do projeto.
- Evite refatorações amplas sem relação direta com o pedido.
- Não misture uma mudança funcional com reorganizações extensas desnecessárias.

## Escopo de trabalho

- Concentre-se no pedido atual.
- Não implemente funcionalidades adicionais apenas porque parecem úteis.
- Se encontrar um problema fora do escopo, informe-o sem corrigi-lo, salvo quando a correção for indispensável para concluir a tarefa solicitada.
- Preserve alterações existentes do usuário e não reverta código que não pertença à tarefa.

## Verificação antes de concluir

Faça as verificações aplicáveis à mudança:

- testar a interface em dimensões de celular e tablet;
- considerar Safari no iPhone/iPad e Chrome no Android;
- testar inclusão e remoção de fotos;
- testar a persistência das fotos e demais dados quando essa funcionalidade existir ou for modificada;
- testar inclusão e exibição das assinaturas;
- abrir a visualização de impressão em A4;
- confirmar que títulos e fotos não são separados ou cortados entre páginas;
- confirmar que espaços sem foto não aparecem na impressão;
- verificar se há erros no console do navegador.

O teste offline não é obrigatório em toda alteração. Ainda assim, não remova nem prejudique deliberadamente o Service Worker, o manifesto ou o cache da PWA.

## Git

- Não crie commits, tags, branches, pull requests nem envie alterações ao GitHub sem pedido explícito.
- Nunca sobrescreva ou descarte alterações existentes do usuário.
- Quando um commit for solicitado, use mensagens curtas seguindo o padrão existente, como `feat:`, `fix:` ou `refactor:`.
