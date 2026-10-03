import { perguntar, fecharInput } from '../utils/input.js';

import { menuAutores } from './menuAutores.js';
import { menuClientes } from './menuClientes.js';
import { menuLivros } from './menuLivros.js';
import { menuEmprestimos } from './menuEmprestimos.js';

export async function menuPrincipal(): Promise<void> {

    let opcao: string;

    do {

        console.log('\n');
        console.log('================================');
        console.log('      SISTEMA DE BIBLIOTECA');
        console.log('================================');
        console.log('1 - Autores');
        console.log('2 - Livros');
        console.log('3 - Clientes');
        console.log('4 - Empréstimos');
        console.log('0 - Sair');
        console.log('================================');

        opcao = await perguntar('Escolha uma opção: ');

        switch (opcao) {

            case '1':
                await menuAutores();
                break;

            case '2':
                await menuLivros();
                break;

            case '3':
                await menuClientes();
                break;

            case '4':
                await menuEmprestimos();
                break;

            case '0':
                console.log('\n[INFO] - Encerrando sistema...');
                break;

            default:
                console.log('\n[ERRO] - Opção inválida');
        }

    } while (opcao !== '0');

    fecharInput();
}
