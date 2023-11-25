# Arquitetura utilizada

## Linguagem utilizada

Javascript/Node.js e EJS/HTML

## MVC

Resolvi utilizar MVC para que o usuário pudesse visualizar e manipular os dados e também porque é um projeto simples.

### Model
Os modelos são armazenados no meu banco de dados MongoDB. Os modelos existentes são: Vacinas, Pontos de vacinação e Cidades de Alagoas.

### View
Dentro da pasta de views estão os arquivos responsáveis pela visualização e layout das páginas web.

### Controller
Utilizando o pacote express e mongoose de javascript/node.js, no arquivo app.js é iniciado o servidor e onde liga as rotas que foram definidas na pasta de rotas.


