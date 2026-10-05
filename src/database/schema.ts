export const SQL_CRIAR_TABELAS = `
CREATE TABLE IF NOT EXISTS clientes (
    id_cliente SERIAL PRIMARY KEY, 
    nome VARCHAR(256) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(256),
    criado_em TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS autores (
    id_autor SERIAL PRIMARY KEY,
    nome VARCHAR(256) NOT NULL,
    criado_em TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS livros (
    id_livro SERIAL PRIMARY KEY,
    titulo VARCHAR(256) NOT NULL,
    id_autor INT NOT NULL,
    qtd_disponivel INT CHECK (qtd_disponivel >= 0),
    criado_em TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT fk_livros_autores
        FOREIGN KEY (id_autor)
        REFERENCES autores(id_autor)
);

CREATE TABLE IF NOT EXISTS emprestimos (
    id_emprestimo SERIAL PRIMARY KEY,
    id_livro INT NOT NULL,
    id_cliente INT NOT NULL,
    id_status VARCHAR(256),
    emprestado_em TIMESTAMPTZ DEFAULT NOW(),
    devolvido_em TIMESTAMPTZ,

    CONSTRAINT fk_emprestimos_livros
        FOREIGN KEY (id_livro)
        REFERENCES livros(id_livro),

    CONSTRAINT fk_emprestimos_clientes
        FOREIGN KEY (id_cliente)
        REFERENCES clientes(id_cliente)
);
`;

export const SQL_APAGAR_TABELAS = `
DROP TABLE IF EXISTS EMPRESTIMOS;
DROP TABLE IF EXISTS livros;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS autores;
`;