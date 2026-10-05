import { AutoresService } from "../services/autoresService.js";
import { mostrarErro } from '../errors/error.js';

export class AutoresController {
    constructor(private readonly autoresService: AutoresService) {
    }

    async listarTodos() {
        const autores = await this.autoresService.listarTodos();

        if (autores[0] === undefined) {
            console.log(`[INFO] - Ainda não há autores cadastrados`);
            return
        }
        console.table(autores);
    }
    async buscaPorid(id: number): Promise<void> {
        try {
            const autor = await this.autoresService.buscarPorId(id);
            console.log(`[OK] - Autor encontrado com sucesso\n`);
            console.log(autor); //todo melhorar impressão

        } catch (erro) {
            mostrarErro(erro)
        }
    }
    async inserir(nome: string): Promise<void> {
        try {
            const resultado = await this.autoresService.inserir(nome);
            console.log(`[OK] - ${resultado}`);
        } catch (erro) {
            mostrarErro(erro)
        }

    }
    async atualizar(id: number, nome: string): Promise<void> {
        try {
            const resultado = await this.autoresService.atualizar(id, nome);

            console.log(`[OK] - ${resultado}`);

        } catch (erro) {
            mostrarErro(erro)
        }

    }
    async remover(id: number): Promise<void> {
        try {
            const resposta = await this.autoresService.remover(id);

            console.log(`[OK] - ${resposta}`);

        } catch (erro) {
            mostrarErro(erro)
        }

    }

}