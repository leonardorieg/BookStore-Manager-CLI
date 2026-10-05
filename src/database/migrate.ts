import { pool, fecharConexao } from "./conection.js";
import { SQL_CRIAR_TABELAS, SQL_APAGAR_TABELAS } from "./schema.js";


async function migrar(): Promise<void> {
    const deveResetar = process.argv.includes('--reset');

    try {
        if (deveResetar) {
            console.log('[INFO] - Apagando tabelas existentes...');
            await pool.query(SQL_APAGAR_TABELAS);
        }

        console.log('[INFO] - Criando tabelas...');
        await pool.query(SQL_CRIAR_TABELAS);

        console.log('[OK] - Migração concluída com sucesso.');
    } catch (erro) {
        console.error('[ERRO] - Falha na migração:', erro);
        process.exitCode = 1;
    } finally {
        await fecharConexao();
    }
}

migrar();