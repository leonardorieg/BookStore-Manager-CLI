import { Livro } from '../models/livrosModel.js';
import { pool } from '../database/conection.js';

const SELECT_BASE = `
    SELECT
        l.id_livro,
        l.titulo,
        a.nome AS autor,
        l.qtd_disponivel,
        l.criado_em
    FROM livros l
    JOIN autores a
        ON a.id_autor = l.id_autor
`

export class LivrosRepository {
    async listarTodos(): Promise<Livro[]> {
        try {
            const resultado = await pool.query<Livro>(SELECT_BASE);
            return resultado.rows.map((linha) => ({
                id_livro: linha.id_livro,
                titulo: linha.titulo,
                autor: linha.autor,
                qtd_disponivel: linha.qtd_disponivel,
                criado_em: linha.criado_em,
            }));
        } catch (erro) {
            throw new Error('Ocorreu um erro ao realizar consulta');
        }
    }
    async buscaPorId(id: number): Promise<Livro | null> {
        try {
            const resultado = await pool.query<Livro>(
                `
                ${SELECT_BASE}
                WHERE id_livro = $1
                `, [id]
            )
            const linha = resultado.rows[0];

            if (linha === undefined) {
                return null;
            }

            return {
                id_livro: linha.id_livro,
                titulo: linha.titulo,
                autor: linha.autor,
                qtd_disponivel: linha.qtd_disponivel,
                criado_em: linha.criado_em,
            }
        } catch (erro) {
            throw new Error('Ocorreu um erro ao realizar consulta');
        }

    }
    async inserir(titulo: string, id_autor: number, qtd_disponivel: number) {
        try {
            const resultado = await pool.query(
                `
                INSERT INTO livros (titulo, id_autor, qtd_disponivel)
                VALUES ($1, $2, $3)
                `, [titulo, id_autor, qtd_disponivel]
            );
            return resultado.rowCount ?? 0;
        } catch (erro) {
            throw new Error('Ocorreu um erro ao inserir livro');
        }

    }
    async atualizar(id: number, titulo: string, id_autor: number, qtd_disponivel: number): Promise<number> {
        try {
            const resultado = await pool.query(
                `
            UPDATE livros
            SET
                titulo = $1,
                id_autor = $2,
                qtd_disponivel = $3
            WHERE id_livro = $4
            `,
                [titulo, id_autor, qtd_disponivel, id]
            );

            return resultado.rowCount ?? 0;
        } catch (erro) {
            throw new Error('Ocorreu um erro ao atualizar o livro');
            
        }


    }
    async remover(id: number): Promise<number> {
        try {
            const resultado = await pool.query(
                `
                DELETE FROM livros
                    WHERE id_livro = $1
                `, [id]
            )

            return resultado.rowCount ?? 0

        } catch (erro) {
            throw new Error('Ocorreu um erro ao remover livro');
        }
    }
}