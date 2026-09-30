import { Autor } from '../models/autoresModel.js';
import { pool } from '../database/conection.js';

const SELECT_BASE = `
    SELECT id_autor, nome, criado_em
    FROM autores
`;

export class AutoresRepository {

    async listarTodos(): Promise<Autor[]>  {
        try {
            const resultado = await pool.query<Autor>(SELECT_BASE);

            return resultado.rows.map((linha) => ({
                id_autor: linha.id_autor,
                nome: linha.nome,
                criado_em: linha.criado_em
            }));

        } catch (erro) {
            console.error('[Erro] - Ocorreu um erro ao realizar consulta', erro);
            throw erro;
        }
    }

    async buscarPorId(id: number): Promise<Autor | null> {
        try {
            const resultado = await pool.query<Autor>(
                `${SELECT_BASE}
                 WHERE id_autor = $1`,
                [id]
            );

            const linha = resultado.rows[0];

            if (linha === undefined) {
                return null;
            }

            return {
                id_autor: linha.id_autor,
                nome: linha.nome,
                criado_em: linha.criado_em
            };

        } catch (erro) {
            console.error('[Erro] - Ocorreu um erro ao realizar consulta', erro);
            return null
        }
    }

    async inserir(nome: string): Promise<number> {
        try {
            const resultado = await pool.query(
                `INSERT INTO autores (nome)
                 VALUES ($1)`,
                [nome]
            );

            return resultado.rowCount ?? 0;

        } catch (erro) {
            console.error('[Erro] - Ocorreu um erro ao inserir autor', erro);
            throw erro;
        }
    }

    async atualizar(id: number, nome: string): Promise<number> {
        try {
            const resultado = await pool.query(
                `
            UPDATE autores
            SET nome = $1
            WHERE id_autor = $2
            `, [nome, id]);

            return resultado.rowCount ?? 0;

        } catch (erro) {
            console.error('[Erro] - Ocorreu um erro ao atualizar o autor', erro);
            throw erro;
        }
    }
    async remover(id: number): Promise<number> {
        try {
            const resultado = await pool.query(
                `
                DELETE FROM autores WHERE id_autor = $1
                `, [id]
            )

            return resultado.rowCount ?? 0; 
        } catch (erro) {
            console.error('[Erro] - Ocorreu um erro ao remover autor', erro);
            throw erro;
        }
    }
}