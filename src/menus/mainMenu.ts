import { select, Separator } from '@inquirer/i18n/pt';
import { menuAutores } from './autorMenu';
import { header } from '../utils/formatters';

export async function menuPrincipal(): Promise<void> {
    while (true) {
        header('Menu Principal');
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
                    value: '0',
                },
            ],
        });

        switch (opcao) {
            case '1':
                await menuAutores();
                return;
            case '0':
                console.log('\nEncerrando a aplicação. Até logo!\n');
                return;
            default:
                console.log('\nOpção inválida. Tente novamente.\n');
        }
    }
}