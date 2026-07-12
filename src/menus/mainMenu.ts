import { select, Separator } from '@inquirer/i18n/pt';
import { menuAutores } from './autorMenu';
import { header } from '../utils/formatters';
import { encerrrar } from '../utils/encerrar';

export async function menuPrincipal(): Promise<void> {
    let msg;
    while (true) {
        header('Menu Principal', msg);
        const opcao = await select({
            message: 'Escolha uma opção',
            choices: [
                new Separator(),
                {
                    name: '1  Autores',
                    value: '1',
                },
                {
                    name: '2  Livros',
                    value: '2',
                },
                {
                    name: '3  Clientes',
                    value: '3',
                },
                {
                    name: '4  Empréstimos',
                    value: '4',
                },
                {
                    name: 'X  Encerrar aplicação',
                    value: '-1',
                },
            ],
        });

        switch (opcao) {
            case '1':
                await menuAutores();
                msg = null;
                continue;
            case '-1':
                await encerrrar();
                break;
            default:
                msg = 'Opção inválida. Tente novamente.';
                continue;
        }
    }
}