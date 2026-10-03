import { perguntar } from '../utils/input.js';

import { LivrosRepository } from '../repositories/livrosRepository.js';
import { LivrosService } from '../services/livrosService.js';
import { LivrosController } from '../controllers/livrosController.js';


const livrosRepository = new LivrosRepository();
const livrosService = new LivrosService(livrosRepository);
const livrosController = new LivrosController(livrosService);

export async function menuLivros(): Promise<void> {

    let opcao: string;

    do {

        console.log('\n================================');
        console.log('            LIVROS');
        console.log('================================');
        console.log('1 - Listar livros');
        console.log('2 - Buscar livro por ID');
        console.log('3 - Cadastrar livro');
        console.log('4 - Atualizar livro');
        console.log('5 - Remover livro');
        console.log('0 - Voltar');
        console.log('================================');

        opcao = await perguntar('Escolha uma opção: ');

        switch (opcao) {

            case '1':
                await livrosController.listarTodos();
                break;

            case '2': {
                const id = Number(await perguntar('Digite o ID do livro: '));
                await livrosController.buscaPorId(id);
                break;
            }

            case '3': {
                const titulo = await perguntar('Título do livro: ');

                const id_autor = Number(await perguntar('ID do autor: '));

                const qtd_disponivel = Number(await perguntar('Quantidade disponível: '));

                await livrosController.inserir(titulo, id_autor, qtd_disponivel);

                break;
            }

            case '4': {
                const id = Number(await perguntar('Digite o ID do livro: '));

                const titulo = await perguntar('Novo título: ');

                const id_autor = Number(await perguntar('Novo ID do autor: '));

                const qtd_disponivel = Number(await perguntar('Nova quantidade disponível: '));

                await livrosController.atualizar(id, titulo, id_autor, qtd_disponivel);
                break;
            }

            case '5': {
                const id = Number(await perguntar('Digite o ID do livro: '));

                await livrosController.remover(id);
                break;
            }

            case '0':
                console.log('\nVoltando ao menu principal...');
                break;

            default:
                console.log('\n[ERRO] - Opção inválida');
        }

    } while (opcao !== '0');
}