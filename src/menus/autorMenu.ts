import { select, Separator } from "@inquirer/i18n/pt";
import { header } from "../utils/formatters";
import { AutorController } from "../controllers/AutorController";
import { encerrrar } from "../utils/encerrar";

export async function menuAutores(): Promise<void> {
    const controller = new AutorController();
    let msg;

    while (true) {
        header('Menu Autores', msg)

        const opcao = await select({
            message: 'Escolha uma opção',
            loop: false,
            choices: [
                new Separator(),
                {
                    name: '1  Cadastrar autor',
                    value: '1',
                },
                {
                    name: '2  Listar autores',
                    value: '2',
                },
                {
                    name: '3  Buscar autor(a) por id',
                    value: '3',
                },
                {
                    name: '4  Atualizar autor(a)',
                    value: '4',
                },
                {
                    name: '5  Remover autor(a)',
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
            case '1':
                header('Cadastrar Autores');
                await controller.cadastrar();
                break;
            case '2':
                header('Lista de Autores');
                await controller.listar();
                break;
            case '3':
                header('Buscar autor(a) por id');
                await controller.buscarPorId();
                break;
            case '4':
                header('Atualizar autor(a)');
                await controller.atualizar();
                break;
            case '5':
                header('Remover autor(a)');
                await controller.remover();
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

        // Voltar para o menu após retorno do banco de dados
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

        if(menuVoltar === "-1") await encerrrar();
    }
}