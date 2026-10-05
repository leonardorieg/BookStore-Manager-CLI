import { EmprestimosService } from '../services/emprestimosService.js';
import { mostrarErro } from '../errors/error.js';

export class EmprestimosController {

    constructor(
        private readonly emprestimosService: EmprestimosService
    ) { }

    async listarTodos(): Promise<void> {

        try {
            const emprestimos = await this.emprestimosService.listarTodos();

            if (emprestimos[0] === undefined) {
                console.log('[INFO] - Ainda não há empréstimos cadastrados');
                return;
            }

            console.table(emprestimos);

        } catch (erro) {
            mostrarErro(erro);
        }
    }

    async buscaPorId(id: number): Promise<void> {

        try {
            const emprestimo = await this.emprestimosService.buscarPorId(id);

            console.log(
                '[OK] - Empréstimo encontrado com sucesso\n'
            );

            console.log(emprestimo);

        } catch (erro) {
            mostrarErro(erro);
        }
    }

    async inserir(id_livro: number, id_cliente: number, id_status: string | null): Promise<void> {

        try {
            const resultado = await this.emprestimosService.inserir(id_livro, id_cliente, id_status);

            console.log(`[OK] - ${resultado}`);

        } catch (erro) {
            mostrarErro(erro);
        }
    }

    async atualizar(id: number, id_livro: number, id_cliente: number, id_status: string | null): Promise<void> {

        try {
            const resultado = await this.emprestimosService.atualizar(id, id_livro, id_cliente, id_status);

            console.log(`[OK] - ${resultado}`);

        } catch (erro) {
            mostrarErro(erro);
        }
    }

    async remover(id: number): Promise<void> {

        try {
            const resultado = await this.emprestimosService.remover(id);

            console.log(`[OK] - ${resultado}`);

        } catch (erro) {
            mostrarErro(erro);
        }
    }
}