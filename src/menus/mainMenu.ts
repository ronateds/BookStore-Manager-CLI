import { menuAutores } from './autorMenu';
import { encerrrar } from '../utils/encerrar';
import { escolherDoMenu, header, opcaoMenu } from '../utils/menuHelper';
import { menuLivros } from './LivroMenu';

export async function menuPrincipal(): Promise<void> {
    let msg;

    while (true) {
        header('Menu Principal', msg);

        const opcoes: opcaoMenu[] = [
            { value: 0, name: 'Autores' },
            { value: 1, name: 'Livros' },
            { value: 2, name: 'Clientes' },
            { value: 3, name: 'Empréstimos' },
            { value: -2, name: 'Encerrar aplicação' }
        ];

        const opcao: number = await escolherDoMenu(opcoes);

        switch (opcao) {
            case 0:
                await menuAutores();
                msg = null;
                continue;
            case '2':
                await menuLivros();
                msg = null;
                continue;
            case '-1':
            case -2:
                await encerrrar();
                break;
            default:
                msg = 'Opção inválida. Tente novamente.';
                continue;
        }
    }
}