import { AutoresRepository } from "../repositories/autoresRepository.js";
import { Autor } from "../models/autoresModel.js";



export class AutoresService {

    constructor(
        private readonly autoresRepository: AutoresRepository
    ) { }


    async listarTodos(): Promise<Autor[]> {
        return await this.autoresRepository.listarTodos();
    }

    async buscarPorId(id: number): Promise<Autor | string> {
        if(id <= 0){
            throw new Error('O ID deve ser maior que 0');
        }

        const resposta = await this.autoresRepository.buscarPorId(id);

        if(resposta === null){
            throw new Error(`Nenhum autor encontrado com o ID:${id}`);
        }
        return resposta;
    }

    /*
    * Regras do metodo inserir
    * 1 - O nome não pode ser uma string vazia
    * 2 - O nome não pode existir 
    */

    async inserir(nome: string): Promise<string> {

        if (!nome.trim()) {
            throw new Error('O nome não pode estar vazio');
        }
        const autores = await this.autoresRepository.listarTodos();

        const jaExiste = autores.find(autor => autor.nome === nome);

        if (jaExiste) {
           throw new Error(`Autor "${nome}" já esta cadastrado`);
        }

        const linhasAfetadas = await this.autoresRepository.inserir(nome);

        if (linhasAfetadas === 0) {
            throw new Error('Houve um problema ao adicionar o autor');
        }
        return 'Autor adicionado com sucesso';
    }

    /*
    * Regras para o metodo atualizar
    * 1 - Não pode atualizar um autor inexistente
    * 2 - O nome do autor não pode estar vazio
    * 3 - O id não pode ser menor que 0
    */
    async atualizar(id: number, nome: string): Promise<string> {
        // todo - Implentar checagem para o caso do novo nome já esteja cadastrado

        if (id <= 0) {
            throw new Error('ID do autor deve ser maior que 0');
        }
        if (!nome.trim()) {
            throw new Error('O nome não pode estar vazio');
        }

        const linhasAfetadas = await this.autoresRepository.atualizar(id, nome);

        if (linhasAfetadas === 0) {
            throw new Error(`Autor com o id: ${id} não encontrado`);
        } 
        return `Autor com o id: ${id} atualizado com sucesso`;
    }
    /*
    * Regras para o metodo remover
    * 1 - o id não pode ser menor que 0
    * 2 - Não pode remover um autor inexistente
    */
    async remover(id: number): Promise<string> {
        if (id <= 0) {
            throw new Error('ID do autor deve ser maior que 0');
        }

        const linhasAfetadas = await this.autoresRepository.remover(id);

        if (linhasAfetadas === 0) {
            throw new Error(`Não foi possivel remover autor com o id: ${id} não encontrado`);
        }

        return `Autor com o id: ${id} removido com sucesso`;
    }
}
