import { Emprestimo } from '../models/emprestimosModel.js';
import { EmprestimosRepository } from '../repositories/emprestimosRepository.js';

export class EmprestimosService {

    constructor(
        private readonly emprestimosRepository: EmprestimosRepository
    ) { }

    async listarTodos(): Promise<Emprestimo[]> {

        return await this.emprestimosRepository.listarTodos();
    }

    async buscarPorId(id: number): Promise<Emprestimo> {

        if (id <= 0) {
            throw new Error('O ID deve ser maior que 0');
        }

        const resposta = await this.emprestimosRepository.buscaPorId(id);

        if (resposta === null) {
            throw new Error( `Nenhum empréstimo encontrado com o ID: ${id}` );
        }

        return resposta;
    }

    /**
     * Regras do método inserir
     * 1 - O ID do livro deve ser maior que 0
     * 2 - O ID do cliente deve ser maior que 0
     * 3 - O status não pode estar vazio, caso informado
     */
    async inserir(id_livro: number, id_cliente: number, id_status: string | null): Promise<string> {

        if (id_livro <= 0) {
            throw new Error('O ID do livro deve ser maior que 0');
        }

        if (id_cliente <= 0) {
            throw new Error('O ID do cliente deve ser maior que 0');
        }

        if (id_status !== null && !id_status.trim()) {
            throw new Error('O status não pode estar vazio');
        }

        const linhasAfetadas = await this.emprestimosRepository.inserir(id_livro, id_cliente, id_status);

        if (linhasAfetadas === 0) {
            throw new Error('Houve um problema ao adicionar o empréstimo');
        }

        return 'Empréstimo adicionado com sucesso';
    }

    /**
     * Regras do método atualizar
     * 1 - O ID deve ser maior que 0
     * 2 - O ID do livro deve ser maior que 0
     * 3 - O ID do cliente deve ser maior que 0
     * 4 - O status não pode estar vazio, caso informado
     */
    async atualizar(id: number, id_livro: number, id_cliente: number, id_status: string | null): Promise<string> {

        if (id <= 0) {
            throw new Error('O ID do empréstimo deve ser maior que 0');
        }

        if (id_livro <= 0) {
            throw new Error('O ID do livro deve ser maior que 0');
        }

        if (id_cliente <= 0) {
            throw new Error('O ID do cliente deve ser maior que 0');
        }

        if (id_status !== null && !id_status.trim()) {
            throw new Error('O status não pode estar vazio');
        }

        const linhasAfetadas =
            await this.emprestimosRepository.atualizar(id, id_livro, id_cliente, id_status);

        if (linhasAfetadas === 0) {
            throw new Error(`Empréstimo com o ID ${id} não encontrado`);
        }

        return `Empréstimo com o ID: ${id} atualizado com sucesso`;
    }

    async remover(id: number): Promise<string> {

        if (id <= 0) {
            throw new Error('O ID do empréstimo deve ser maior que 0');
        }

        const linhasAfetadas =
            await this.emprestimosRepository.remover(id);

        if (linhasAfetadas === 0) {
            throw new Error(`Não foi possível remover o empréstimo com o ID: ${id}`);
        }

        return `Empréstimo com o ID: ${id} removido com sucesso`;
    }
}