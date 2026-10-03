import { perguntar, fecharInput } from '../utils/input.js';

import { AutoresRepository } from '../repositories/autoresRepository.js';
import { AutoresService } from '../services/autoresService.js';
import { AutoresController } from '../controllers/autoresController.js';

const autoresRepository = new AutoresRepository();
const autoresService = new AutoresService(autoresRepository);
const autoresController = new AutoresController(autoresService);

export async function menuAutores(): Promise<void> {

    let opcao: string;

    do {

        console.log('\n================================');
        console.log('           AUTORES');
        console.log('================================');
        console.log('1 - Listar autores');
        console.log('2 - Buscar autor por ID');
        console.log('3 - Cadastrar autor');
        console.log('4 - Atualizar autor');
        console.log('5 - Remover autor');
        console.log('0 - Voltar');
        console.log('================================');

        opcao = await perguntar('Escolha uma opção: ');

        switch (opcao) {

            case '1':
                await autoresController.listarTodos();
                break;

            case '2': {
                const id = Number(await perguntar('Digite o ID do autor: '));
                await autoresController.buscaPorid(id);
                break;
            }

            case '3': {
                const nome = await perguntar('Nome do autor: ');

                await autoresController.inserir(nome);
                break;
            }

            case '4': {
                const id = Number(await perguntar('Digite o ID do autor: '));

                const nome = await perguntar('Digite o novo nome do autor: ');

                await autoresController.atualizar(id, nome);

                break;
            }

            case '5': {
                const id = Number(await perguntar('Digite o ID do autor: '));
                await autoresController.remover(id);
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