import { LivrosService } from '../services/livrosService.js';
import { mostrarErro } from '../errors/error.js';

export class LivrosController {
    constructor(private readonly livrosService: LivrosService) { }

    async listarTodos(): Promise<void> {

        try {
            const livros = await this.livrosService.listarTodos();

            if (livros[0] === undefined) {
                console.log(`[INFO] - Ainda não há livros cadastrados`);
                return;
            }
            console.table(livros);
        } catch (erro) {
            mostrarErro(erro);
        }
    }
    async buscaPorId(id: number): Promise<void> {
        try {
            const livro = await this.livrosService.buscarPorId(id);
            console.log('[OK] - Livro encontrado com sucesso\n');
            console.log(livro);
        } catch (erro) {
            mostrarErro(erro);
        }

    }
    async inserir(titulo: string, id_autor: number, qtd_disponivel: number): Promise<void> {
        try {
            const resultado = await this.livrosService.inserir(titulo, id_autor, qtd_disponivel);
            console.log(`[OK] - ${resultado}`);
        } catch (erro) {
            mostrarErro(erro);
        }
    }
    async atualizar(id: number, titulo: string, id_autor: number, qtd_disponivel: number): Promise<void> {
        try {
            const resultado = await this.livrosService.atualizar(id, titulo, id_autor, qtd_disponivel);
            console.log(`[OK] - ${resultado}`);
        } catch (erro) {
            mostrarErro(erro);
        }

    }
    async remover(id: number): Promise<void> {
        try {
            const resultado = await this.livrosService.remover(id);
            console.log(`[OK]  - ${resultado}`);
        } catch (erro) {
            mostrarErro(erro);
        }

    }
}