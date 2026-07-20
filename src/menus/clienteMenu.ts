import { ClienteController } from "../controllers/ClienteController";
import { encerrrar } from "../utils/encerrar";
import { escolherDoMenu, header, opcaoMenu } from "../utils/menuHelper";

export async function clienteMenu(): Promise<void> {
    const controller = new ClienteController();
    let msg;

    while (true) {
        header('Menu Clientes', msg);

        const opcoesPorMetodos: opcaoMenu[] = [
            { value: 0, name: 'Cadastrar Clientes', method: 'cadastrar' },
            { value: 1, name: 'Listar Clientes', method: 'listar' },
            { value: 2, name: 'Buscar cliente por id', method: 'buscarPorId' },
            { value: 3, name: 'Atualizar cliente', method: 'atualizar' },
            { value: 4, name: 'Remover cliente', method: 'remover' },
        ];

        const opcoesVoltarEncerrar: opcaoMenu[] = [
            { value: -1, name: 'Voltar' },
            { value: -2, name: 'Encerrar aplicação' }
        ]

        const opcao: number = await escolherDoMenu([...opcoesPorMetodos, ...opcoesVoltarEncerrar]);

        if (opcao === -1) return; 
        if (opcao === -2) await encerrrar(); 

        if (opcao === undefined || opcao === null || !opcoesPorMetodos[opcao]) {
            msg = 'Opção inválida. Tente novamente.';
            continue;
        }

        header(opcoesPorMetodos[opcao].name); 

        const metodo = opcoesPorMetodos[opcao].method as keyof ClienteController;
        await controller[metodo](); 

        const menuVoltar = await escolherDoMenu(opcoesVoltarEncerrar);
        msg = null;

        if (menuVoltar === -2) await encerrrar(); 
    }
}