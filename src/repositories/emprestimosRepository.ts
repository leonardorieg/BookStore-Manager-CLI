import { Emprestimo } from '../models/emprestimosModel.js';
import { pool } from '../database/conection.js';

const SELECT_BASE = `
    SELECT
        e.id_emprestimo,
        e.id_livro,
        l.titulo AS titulo_livro,
        e.id_cliente,
        c.nome AS nome_cliente,
        e.id_status,
        e.emprestado_em,
        e.devolvido_em
    FROM emprestimos e
    JOIN livros l
        ON l.id_livro = e.id_livro
    JOIN clientes c
        ON c.id_cliente = e.id_cliente
`;

export class EmprestimosRepository {

    async listarTodos(): Promise<Emprestimo[]> {
        try {
            const resultado = await pool.query<Emprestimo>(SELECT_BASE);

            return resultado.rows;

        } catch (erro) {
            throw new Error('Não foi possível realizar a consulta',);
        }
    }

    async buscaPorId(id: number): Promise<Emprestimo | null> {
        try {
            const resultado = await pool.query<Emprestimo>(
                `
                ${SELECT_BASE}
                WHERE e.id_emprestimo = $1
                `,
                [id]
            );

            const linha = resultado.rows[0];

            if (linha === undefined) {
                return null;
            }

            return linha;

        } catch (erro) {
            throw new Error('Não foi possível realizar a consulta por ID',);
        }
    }

    async inserir(id_livro: number, id_cliente: number, id_status: string | null): Promise<number> {

        try {
            const resultado = await pool.query(
                `
                INSERT INTO emprestimos (
                    id_livro,
                    id_cliente,
                    id_status
                )
                VALUES ($1, $2, $3)
                `,
                [id_livro, id_cliente, id_status]
            );

            return resultado.rowCount ?? 0;

        } catch (erro) {
            throw new Error('Não foi possível inserir o empréstimo');
        }
    }

    async atualizar(id: number, id_livro: number, id_cliente: number, id_status: string | null): Promise<number> {

        try {
            const resultado = await pool.query(
                `
                UPDATE emprestimos
                SET
                    id_livro = $1,
                    id_cliente = $2,
                    id_status = $3
                WHERE id_emprestimo = $4
                `,
                [
                    id_livro,
                    id_cliente,
                    id_status,
                    id
                ]
            );

            return resultado.rowCount ?? 0;

        } catch (erro) {
            throw new Error('Não foi possível atualizar o empréstimo');
        }
    }

    async remover(id: number): Promise<number> {

        try {
            const resultado = await pool.query(
                `
                DELETE FROM emprestimos
                WHERE id_emprestimo = $1
                `,
                [id]
            );

            return resultado.rowCount ?? 0;

        } catch (erro) {
            throw new Error('Não foi possível remover o empréstimo');
        }
    }
}