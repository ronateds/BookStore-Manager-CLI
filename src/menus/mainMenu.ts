import { encerrrar } from '../utils/encerrar';
import { escolherDoMenu, header, opcaoMenu } from '../utils/menuHelper';
import { menuAutores } from './autorMenu';
import { menuLivros } from './LivroMenu';
import { clienteMenu } from './clienteMenu';
import { emprestimoMenu } from './emprestimoMenu';
import { relatoriosMenu } from './relatorioMenu';

export async function menuPrincipal(): Promise<void> {
    let msg;

    while (true) {
        header('Menu Principal', msg);

        const opcoes: opcaoMenu[] = [
            { value: 0, name: 'Autores' },
            { value: 1, name: 'Livros' },
            { value: 2, name: 'Clientes' },
            { value: 3, name: 'Empréstimos' },
            { value: 4, name: 'Gerar Relatórios' },
            { value: -2, name: 'Encerrar aplicação' }
        ];

        const opcao: number = await escolherDoMenu(opcoes);

        switch (opcao) {
            case 0:
                await menuAutores();
                msg = null;
                continue;
            case 1:
                await menuLivros();
                msg = null;
                continue;
            case 2:
                await clienteMenu();
                msg = null;
                continue;
            case 3:
                await emprestimoMenu();
                msg = null;
                continue;
            case 4:
                await relatoriosMenu();
                msg = null;
                continue;
            case -2:
                await encerrrar();
            default:
                msg = 'Opção inválida. Tente novamente.';
                continue;
        }
    }
}