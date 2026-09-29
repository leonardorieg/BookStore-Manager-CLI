import 'dotenv/config';
import pg from "pg";

const { Pool } = pg;

function env(nome: string, padrao: string) {
    const valor = process.env[nome];
    return valor === undefined || valor.trim() === '' ? padrao : valor;
}


function criarPool(): pg.Pool {
    return new Pool({
        host: env('DB_HOST', 'localhost'),
        port: Number(env('DB_PORT', '5432')),
        user: env('DB_USER', 'postgres'),
        password: env('DB_PASSWORD', 'postgres'),
        database: env('DB_NAME', 'postgres'),
        max: 10,
        idleTimeoutMillis: 30_000,
        connectionTimeoutMillis: 5_000,
    })
}

export const pool = criarPool()

pool.on('error', (err: Error) => {
    console.error('Erro inesperado no cliente do banco de dados');
});

export async function testarConexao(): Promise<void> {
    try {
        const resultado = await pool.query('SELECT NOW() AS agora')
        const linha = resultado.rows[0];

        if (linha === undefined) {
            throw new Error('O banco respondeu mas não retornou dados.');
        }
        console.log(linha);
    } catch (error) {
        console.error('Erro ao testar conexão com o banco');
        throw error;
    }
}

export async function fecharConexao(): Promise<void> {
    await pool.end();

}