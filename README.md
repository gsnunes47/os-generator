# OS Generator

Aplicação web progressiva (PWA) para preenchimento e geração de ordens de serviço em campo.

O projeto foi desenvolvido para uso em celulares e tablets, permitindo registrar informações do atendimento, serviços executados, checklist, fotografias e assinaturas diretamente no navegador, com geração do documento final por impressão ou PDF.

## Funcionalidades

- Preenchimento de dados da ordem de serviço
- Registro de serviços executados
- Checklist operacional
- Inclusão de fotos pela galeria ou pela câmera do dispositivo
- Redimensionamento e otimização das imagens no navegador
- Assinatura digital diretamente na tela
- Geração da ordem de serviço em PDF por impressão
- Layout responsivo para celulares e tablets
- Funcionamento offline como PWA
- Cache de arquivos com Service Worker

## Tecnologias

- HTML
- CSS
- JavaScript
- Canvas API
- File API
- Service Worker
- Web App Manifest
- GitHub Pages

## Como funciona

A aplicação roda inteiramente no navegador e não depende de backend.

O usuário preenche os dados da ordem de serviço, seleciona os serviços executados, adiciona observações, inclui registros fotográficos e coleta as assinaturas do contratante e do técnico.

As imagens são processadas no próprio navegador antes de serem exibidas no documento, reduzindo suas dimensões e convertendo-as para JPEG.

Ao final, a ordem de serviço pode ser gerada utilizando a impressão do navegador e salva em PDF.

## Estrutura do projeto

```text
index.html      Estrutura e conteúdo do formulário
styles.css      Interface, responsividade e estilos de impressão
script.js       Comportamento da aplicação, fotos e assinaturas
sw.js           Cache e funcionamento offline
manifest.json   Configuração da PWA
mman.png        Identidade visual utilizada na aplicação
```

## PWA e funcionamento offline

O projeto utiliza um Service Worker para manter os principais arquivos em cache.

Isso permite que a aplicação continue disponível mesmo sem conexão com a internet após o primeiro carregamento, característica importante para uso em atendimentos externos.

## Execução

Por ser uma aplicação estática, não há processo de build nem dependências para instalar.

Para testes básicos, abra o arquivo:

```text
index.html
```

Para utilizar corretamente recursos como Service Worker e instalação como PWA, execute a aplicação através de um servidor HTTP ou acesse a versão publicada no GitHub Pages.

## Contexto

O projeto surgiu da necessidade de digitalizar o preenchimento de ordens de serviço utilizadas em atendimentos externos, substituindo um processo manual por uma aplicação simples, responsiva e adequada para uso em campo.

A proposta é manter a aplicação leve e independente de infraestrutura de servidor, utilizando apenas tecnologias nativas da Web.
