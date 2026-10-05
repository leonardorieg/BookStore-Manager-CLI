import { Cliente } from '../models/clientesModel.js';
import { pool } from '../database/conection.js';

const SELECT_BASE = `
    SELECT
        c.id_cliente,
        c.nome,
        c.telefone,
        c.email,
        c.criado_em
    FROM clientes c
`;

export class ClientesRepository {

    async listarTodos(): Promise<Cliente[]> {
        try {
            const resultado = await pool.query<Cliente>(SELECT_BASE);

            return resultado.rows.map((linha) => ({
                id_cliente: linha.id_cliente,
                nome: linha.nome,
                telefone: linha.telefone,
                email: linha.email,
                criado_em: linha.criado_em
            }));

        } catch (erro) {
            throw new Error('Não foi possível realizar a consulta');
        }
    }

    async buscaPorId(id: number): Promise<Cliente | null> {
        try {
            const resultado = await pool.query<Cliente>(
                `
                ${SELECT_BASE}
                WHERE c.id_cliente = $1
                `,
                [id]
            );

            const linha = resultado.rows[0];

            if (linha === undefined) {
                return null;
            }

            return {
                id_cliente: linha.id_cliente,
                nome: linha.nome,
                telefone: linha.telefone,
                email: linha.email,
                criado_em: linha.criado_em
            };

        } catch (erro) {
            throw new Error('Não foi possível realizar a consulta por id');
        }
    }

    async inserir(nome: string, telefone: string | null, email: string | null): Promise<number> {
        try {
            const resultado = await pool.query(
                `
                INSERT INTO clientes (
                    nome,
                    telefone,
                    email
                )
                VALUES ($1, $2, $3)
                `,
                [nome, telefone, email]
            );

            return resultado.rowCount ?? 0;

        } catch (erro) {
            throw new Error('Não foi possível inserir o cliente');
        }
    }

    async atualizar(id: number, nome: string, telefone: string | null, email: string | null): Promise<number> {
        try {
            const resultado = await pool.query(
                `
                UPDATE clientes
                SET
                    nome = $1,
                    telefone = $2,
                    email = $3
                WHERE id_cliente = $4
                `,
                [nome, telefone, email, id]
            );

            return resultado.rowCount ?? 0;

        } catch (erro) {
            throw new Error('Não foi possível atualizar o cliente');
        }
    }

    async remover(id: number): Promise<number> {
        try {
            const resultado = await pool.query(
                `
                DELETE FROM clientes
                WHERE id_cliente = $1
                `,
                [id]
            );

            return resultado.rowCount ?? 0;

        } catch (erro) {
            throw new Error('Não foi possível remover o cliente');
        }
    }
}