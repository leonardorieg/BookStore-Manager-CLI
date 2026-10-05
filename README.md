# BookStore-Manager-CLI

Projeto avaliativo SCTEC, sistema de gerenciamento de biblioteca desenvolvido em node.js + TypeScript + PostgreSQL, executado via terminal.

## Stack utilizada
- Node.js
- TypeScript
- PostgreSQL
- pg
- dotenv
- readline


## Pré-requisitos

Antes de executar o projeto, é necessário possuir instalado:

- Node.js
- npm
- Git


## Funcionalidades

O sistema permite gerenciar:

### Autores
- Listar autores
- Buscar autor por ID
- Cadastrar autor
- Atualizar autor
- Remover autor

### Livros

- Listar livros
- Buscar livro por ID
- Cadastrar livro
- Atualizar livro
- Remover livro

### Clientes

- Listar clientes
- Buscar cliente por ID
- Cadastrar cliente
- Atualizar cliente
- Remover cliente

### Empréstimos

- Listar empréstimos
- Buscar empréstimo por ID
- Cadastrar empréstimo
- Atualizar empréstimo
- Remover empréstimo


## Arquitetura 
O projeto est dividido em camadas:

```text
       CLI
        ↓
    Controllers
        ↓
     Services
        ↓
    Repository
```
`

- CLI           -> Exibe os menus, recebe as entradas dos usuários e chama o controller.
- Controller    -> Recebe as entradas e chama o serviços.
- Service       -> Aplica as regras de negocio e chama o repository.
- Repository    -> Persiste os dados no banco de dados (PostgreSQL).
- Model         -> interface dos objetos utilizados na aplicação.
- errors        -> Lida com erros recebe o erro trata ele e retorna ele no terminal.
- Utils         -> Funções auxiliares.
    
## Estrutura de pastas

```text
BookStore-Manager-CLI/
│
├── src/
│   ├── controllers/
│   │   ├── autoresController.ts
│   │   ├── clientesController.ts
│   │   ├── emprestimosController.ts
│   │   └── livrosController.ts
│   ├── database/
│   │   ├── conection.ts
│   │   ├── criarBanco.ts
│   │   ├── migrate.ts
│   │   ├── schema.sql
│   │   └── schema.ts
│   ├── errors/
│   │   └── error.ts
│   ├── menus/
│   │   ├── menuAutores.ts
│   │   ├── menuClientes.ts
│   │   ├── menuEmprestimos.ts
│   │   └── menuLivros.ts
│   ├── models/
│   │   ├── autoresModel.ts
│   │   ├── clientesModel.ts
│   │   ├── emprestimosModel.ts
│   │   └── livrosModel.ts
│   ├── repositories/
│   │   ├── autoresRepository.ts
│   │   ├── clientesRepository.ts
│   │   ├── emprestimosRepository.ts
│   │   └── livrosRepository.ts
│   ├── services/
│   │   ├── autoresServices.ts
│   │   ├── clientesServices.ts
│   │   ├── emprestimosServices.ts
│   │   └── livrosServices.ts
│   ├── utils
│   │   └── input.ts
│   │
│   └── main.ts
│
├── .env
├── .env.example
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## Como instalar

Clone o repositório:

```bash
git clone https://github.com/leonardorieg/BookStore-Manager-CLI.git
```

Entre na pasta do projeto:

```bash
cd BookStore-Manager-CLI
```

Instale as dependências:

```bash
npm install
```

---

## Como executar

Para executar o projeto em ambiente de desenvolvimento:

Crie um arquivo .env na raiz do projeto:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=bookstore
```

Cria o banco de dados da aplicação
```bash
npm run db:create
```

Cria as tabelas do banco de dados
```bash
npm run db:migrate 
```
Inicia a aplicação 
```bash
npm run start
```

A aplicação será iniciada diretamente no terminal.

Também é possivel utilizar essa opção para resetar as tabelas do banco.
```bash
npm run db:reset 
```
---

- Ponto inicial da aplicação: Menu principal:

```
================================
      SISTEMA DE BIBLIOTECA
================================
1 - Autores
2 - Livros
3 - Clientes
4 - Empréstimos
0 - Sair
================================
Escolha uma opção:
```

- Cadastro de autor
```
Escolha uma opção: 1

================================
           AUTORES
================================
1 - Listar autores
2 - Buscar autor por ID
3 - Cadastrar autor
4 - Atualizar autor
5 - Remover autor
0 - Voltar
================================

Escolha uma opção: 3

Nome do autor: J. K. Rowling

[OK] - Autor adicionado com sucesso
```
- Cadastro de livro
```
Escolha uma opção: 2

Escolha uma opção: 3

Título do livro: Harry Potter e a Pedra Filosofal
ID do autor: 1
Quantidade disponível: 5

[OK] - Livro adicionado com sucesso
```

- Cadastro de cliente
```
Escolha uma opção: 3

Escolha uma opção: 3

Nome do cliente: João Silva
Telefone: 48999999999
E-mail: joao@email.com

[OK] - Cliente 
```

- Cadastro de empréstimo

```
Escolha uma opção: 4

Escolha uma opção: 3

ID do livro: 1
ID do cliente: 1
Status do empréstimo: ATIVO

[OK] - Empréstimo adicionado com sucesso
```

- Tratamento de erros

Os erros são tratados pela aplicação para evitar que exceções sejam exibidas diretamente ao usuário.

Exemplo:
```
[ERRO] - O ID deve ser maior que 0
```
O Controller utiliza a função mostrarErro() para centralizar a apresentação dos erros:

```
try {
    // operação
} catch (erro) {
    mostrarErro(erro);
}
```
## Melhorias Futuras 
- Atualizar estoque de livros automaticamente nos emprestimos
- Preencher data de devolução automaticamente
- Definir status dos emprestimos através de valores controlados
- Implementar busca por nomes nas entidades
- Implementar relatórios
- Melhorar o tratamento de erros vindo do banco

## Autor

**Leonardo Floriano Rieg**