import { ClientesService } from '../services/clientesService.js';
import { mostrarErro } from '../errors/error.js';

export class ClientesController {
    constructor(private readonly clientesService: ClientesService) { }

    async listarTodos(): Promise<void> {

        try {
            const clientes = await this.clientesService.listarTodos();
            if (clientes[0] === undefined) {
                console.log(`[INFO] - Ainda não há clientes cadastrados`);
                return;
            }
            console.table(clientes);

        } catch (erro) {
            mostrarErro(erro);
        }
    }

    async buscaPorId(id: number): Promise<void> {

        try {
            const cliente = await this.clientesService.buscarPorId(id);

            console.log('[OK] - Cliente encontrado com sucesso\n');
            console.log(cliente);

        } catch (erro) {
            mostrarErro(erro);
        }
    }

    async inserir(nome: string, telefone: string | null, email: string | null): Promise<void> {
        try {
            const resultado = await this.clientesService.inserir(nome, telefone, email);
            console.log(`[OK] - ${resultado}`);
        } catch (erro) {
            mostrarErro(erro);
        }
    }

    async atualizar(id: number, nome: string, telefone: string | null, email: string | null): Promise<void> {
        try {
            const resultado = await this.clientesService.atualizar(id, nome, telefone, email);
            console.log(`[OK] - ${resultado}`);
        } catch (erro) {
            mostrarErro(erro);
        }
    }

    async remover(id: number): Promise<void> {
        try {
            const resultado = await this.clientesService.remover(id);
            console.log(`[OK] - ${resultado}`);
        } catch (erro) {
            mostrarErro(erro);
        }
    }
}