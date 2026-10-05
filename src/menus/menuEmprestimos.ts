import { perguntar } from '../utils/input.js';

import { EmprestimosRepository } from '../repositories/emprestimosRepository.js';
import { EmprestimosService } from '../services/emprestimosService.js';
import { EmprestimosController } from '../controllers/emprestimosController.js';

const emprestimosRepository = new EmprestimosRepository();
const emprestimosService = new EmprestimosService(emprestimosRepository);
const emprestimosController = new EmprestimosController(emprestimosService);

export async function menuEmprestimos(): Promise<void> {

    let opcao: string;

    do {

        console.log('\n================================');
        console.log('         EMPRÉSTIMOS');
        console.log('================================');
        console.log('1 - Listar empréstimos');
        console.log('2 - Buscar empréstimo por ID');
        console.log('3 - Cadastrar empréstimo');
        console.log('4 - Atualizar empréstimo');
        console.log('5 - Remover empréstimo');
        console.log('0 - Voltar');
        console.log('================================');

        opcao = await perguntar('Escolha uma opção: ');

        switch (opcao) {

            case '1':
                await emprestimosController.listarTodos();
                break;

            case '2': {
                const id = Number(await perguntar('Digite o ID do empréstimo: '));
                await emprestimosController.buscaPorId(id);
                break;
            }

            case '3': {
                const id_livro = Number(await perguntar('ID do livro: '));

                const id_cliente = Number(await perguntar('ID do cliente: '));

                const id_status = await perguntar('Status do empréstimo: ');

                await emprestimosController.inserir(id_livro, id_cliente, id_status || null);

                break;
            }

            case '4': {
                const id = Number(await perguntar('ID do empréstimo: '));

                const id_livro = Number(await perguntar('Novo ID do livro: '));

                const id_cliente = Number(await perguntar('Novo ID do cliente: '));

                const id_status = await perguntar('Novo status: ');

                await emprestimosController.atualizar(id, id_livro, id_cliente, id_status || null);

                break;
            }

            case '5': {
                const id = Number(await perguntar('Digite o ID do empréstimo: '));

                await emprestimosController.remover(id);
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