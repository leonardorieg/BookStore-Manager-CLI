import { Livro } from '../models/livrosModel.js';
import { LivrosRepository } from '../repositories/livrosRepository.js';

export class LivrosService {
    constructor(
        private readonly livrosRepository: LivrosRepository
    ) { }

    async listarTodos(): Promise<Livro[]> {
        return await this.livrosRepository.listarTodos();
    }
    async buscarPorId(id: number): Promise<Livro | String> {
        if (id <= 0) {
            throw new Error('O ID deve ser maior que 0');
        }

        const resposta = await this.livrosRepository.buscaPorId(id);

        if (resposta === null) {
            throw new Error(`Nenhum livro encontrado com o ID: ${id}`);
        }
        return resposta;

    }
    /*
    * Regras do metodo inserir
    * 1 - O titulo não pode estar em branco
    * 2 - A quantidade disponivel precisa ser maior que 0
    */

    async inserir(titulo: string, id_autor: number, qtd_disponivel: number): Promise<string> {
        if (!titulo.trim()) {
            throw new Error('O titulo não pode estar vazio');
        }
        const livros = await this.listarTodos();

        const jaExiste = livros.find(livro => livro.titulo === titulo);

        if (jaExiste) {
            throw new Error(`Livro ${titulo}, já está cadastrado`);
        }

        if (qtd_disponivel < 0) {
            throw new Error('A quantidade de livros disponiveis precisa ser maior que 0');
        }

        const linhasAfetadas = await this.livrosRepository.inserir(titulo, id_autor, qtd_disponivel);

        if (linhasAfetadas === 0) {
            throw new Error('Houve um problema ao adicionar o livro');
        }
        return 'Autor adicionado com sucesso';
    }

    /*
    * Regras do metodo Atualizar
    * 1 - Não pode atualizar um livro inexistente
    * 2 - O titulo não pode estar vazio
    * 3 - a nova quantidade não pode ser menor que 0
    * 4 - O id não pode ser menor que 0
    */
    async atualizar(id: number, titulo: string, id_autor: number, qtd_disponivel: number): Promise<string> {
        if (id <= 0) {
            throw new Error('ID do livro deve ser maior que 0');
        }
        if (!titulo.trim()) {
            throw new Error('O novo nome não pode estar vazio');
        }
        if (qtd_disponivel < 0) {
            throw new Error('A quantidade disponivel não pode ser menor que 0');
        }

        const linhasAfetadas = await this.livrosRepository.atualizar(id, titulo, id_autor, qtd_disponivel);
        if (linhasAfetadas === 0) {
            throw new Error(`Livro com o ${id} não encontrado`);
        }
        return `Autor com o ID: ${id} atualizado com sucesso`;
    }

    async remover(id: number): Promise<string> {
        if (id <= 0) {
            throw new Error('ID do livro deve ser maior que 0');
        }
        const linhasAfetadas = await this.livrosRepository.remover(id);

        if (linhasAfetadas === 0) {
            throw new Error(`Não foi possivel remover o livro com op ID:${id}`);
        }

        return `Livro com o ID; ${id} removido com sucesso`;

    }
}