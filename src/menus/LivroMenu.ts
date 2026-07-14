import { LivroController } from '../controllers/LivroController';
import { select, Separator } from '@inquirer/i18n/pt';
import { header } from '../utils/formatters';
import { encerrrar } from '../utils/encerrar';

export async function menuLivros(): Promise<void> {
  const controller = new LivroController();
  let msg;

  while (true) {
    header('Menu Livros', msg)

    const opcao = await select({
      message: 'Escolha uma opção',
      loop: false,
      choices: [
        new Separator(),
        {
          name: '1  Cadastrar livro',
          value: '1',
        },
        {
          name: '2  Listar livros',
          value: '2',
        },
        {
          name: '3  Consultar livro por id',
          value: '3',
        },
        {
          name: '4  Atualizar livro',
          value: '4',
        },
        {
          name: '5  Remover livro',
          value: '5',
        },
        {
          name: '<  Voltar',
          value: '0',
        },
        {
          name: 'X  Encerrar aplicação',
          value: '-1',
        },
      ],
    });

    switch (opcao) {
      
      case '2':
        header('Listar livros');
        await controller.listar();
        break;
      case '0':
        return;
      case '-1':
        await encerrrar();
        break;
      default:
        msg = 'Opção inválida. Tente novamente.';
        continue;
    }

    if (msg) {
      console.log(msg, '\n');
    }

       const menuVoltar = await select({
      message: 'Escolha uma opção',
      choices: [
        new Separator(),
        {
          name: '<  Voltar',
          value: '0'
        },
        {
          name: 'X  Encerrar aplicação',
          value: '-1',
        }
      ]
    })
    msg = null;

    if (menuVoltar === "-1") await encerrrar();
  }
}
