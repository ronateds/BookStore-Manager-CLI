import { select } from '@inquirer/i18n/pt';

export async function menuPrincipal(): Promise<void> {
    console.clear();
    console.log('============================================');
    console.log('   BookStore Manager CLI - Menu Principal');
    console.log('============================================\n');

    const opcao = await select({
        message: 'Escolha uma opção',
        choices: [
            {
                name: '1. Autores',
                value: '1',
            },
            {
                name: '2. Livros',
                value: '2',
            },
            {
                name: '3. Clientes',
                value: '3',
            },
            {
                name: '4. Empréstimos',
                value: '4',
            },
            {
                name: 'Encerrar aplicação',
                value: '0',
            },
        ],
    });

    switch (opcao) {
        case '1':
            console.log('Autores');
            break;
        case '0':
            console.log('\nEncerrando a aplicação. Até logo!');
            return;
        default:
            console.log('\nOpção inválida. Tente novamente.');
    }
}