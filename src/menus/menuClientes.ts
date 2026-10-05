import { perguntar } from '../utils/input.js';

import { ClientesRepository } from '../repositories/clientesRepository.js';
import { ClientesService } from '../services/clientesService.js';
import { ClientesController } from '../controllers/clientesController.js';

const clientesRepository = new ClientesRepository();
const clientesService = new ClientesService(clientesRepository);
const clientesController = new ClientesController(clientesService);


export async function menuClientes(): Promise<void> {

    let opcao: string;

    do {

        console.log('\n================================');
        console.log('           CLIENTES');
        console.log('================================');
        console.log('1 - Listar clientes');
        console.log('2 - Buscar cliente por ID');
        console.log('3 - Cadastrar cliente');
        console.log('4 - Atualizar cliente');
        console.log('5 - Remover cliente');
        console.log('0 - Voltar');
        console.log('================================');

        opcao = await perguntar('Escolha uma opção: ');

        switch (opcao) {

            case '1':
                await clientesController.listarTodos();
                break;

            case '2': {
                const id = Number(
                    await perguntar('Digite o ID do cliente: ')
                );

                await clientesController.buscaPorId(id);
                break;
            }

            case '3': {
                const nome = await perguntar('Nome do cliente: ');

                const telefone = await perguntar('Telefone: ');

                const email = await perguntar('E-mail: ');

                await clientesController.inserir(nome, telefone || null, email || null);

                break;
            }

            case '4': {
                const id = Number(await perguntar('Digite o ID do cliente: '));

                const nome = await perguntar('Novo nome: ');

                const telefone = await perguntar('Novo telefone: ');

                const email = await perguntar('Novo e-mail: ');

                await clientesController.atualizar(id, nome, telefone || null, email || null);
                break;
            }

            case '5': {
                const id = Number(await perguntar('Digite o ID do cliente: '));
                await clientesController.remover(id);
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
