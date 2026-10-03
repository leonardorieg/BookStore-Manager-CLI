import { Cliente } from '../models/clientesModel.js';
import { ClientesRepository } from '../repositories/clientesRepository.js';

export class ClientesService {
    constructor(
        private readonly clientesRepository: ClientesRepository) { }

    async listarTodos(): Promise<Cliente[]> {
        return await this.clientesRepository.listarTodos();
    }

    async buscarPorId(id: number): Promise<Cliente> {
        if (id <= 0) {
            throw new Error('O ID deve ser maior que 0');
        }

        const resposta = await this.clientesRepository.buscaPorId(id);

        if (resposta === null) {
            throw new Error(`Nenhum cliente encontrado com o ID: ${id}`);
        }
        return resposta;
    }

    /*
     * Regras do método inserir
     * 1 - O nome não pode estar em branco
     * 2 - O cliente não pode estar cadastrado
     */
    async inserir(nome: string, telefone: string | null, email: string | null): Promise<string> {
        if (!nome.trim()) {
            throw new Error('O nome não pode estar vazio');
        }

        const clientes = await this.listarTodos();

        const jaExiste = clientes.find(
            cliente => cliente.nome === nome
        );
        if (jaExiste) {
            throw new Error(`Cliente ${nome}, já está cadastrado`);
        }

        const linhasAfetadas = await this.clientesRepository.inserir(nome, telefone, email);

        if (linhasAfetadas === 0) {
            throw new Error('Houve um problema ao adicionar o cliente');
        }
        return 'Cliente adicionado com sucesso';
    }

    /*
     * Regras do método atualizar
     * 1 - O ID deve ser maior que 0
     * 2 - O nome não pode estar vazio
     * 3 - O cliente precisa existir
     */
    async atualizar(id: number, nome: string, telefone: string | null, email: string | null): Promise<string> {

        if (id <= 0) {
            throw new Error('ID do cliente deve ser maior que 0');
        }
        if (!nome.trim()) {
            throw new Error('O nome não pode estar vazio');
        }

        const linhasAfetadas = await this.clientesRepository.atualizar(id, nome, telefone, email);

        if (linhasAfetadas === 0) {
            throw new Error(`Cliente com o ID ${id} não encontrado`);
        }
        return `Cliente com o ID: ${id} atualizado com sucesso`;
    }

    async remover(id: number): Promise<string> {

        if (id <= 0) {
            throw new Error('ID do cliente deve ser maior que 0');
        }

        const linhasAfetadas = await this.clientesRepository.remover(id);

        if (linhasAfetadas === 0) {
            throw new Error(`Não foi possível remover o cliente com o ID: ${id}`);
        }
        return `Cliente com o ID: ${id} removido com sucesso`;
    }
}