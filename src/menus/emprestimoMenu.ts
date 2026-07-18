import { EmprestimoController } from "../controllers/EmprestimoController";
import { encerrrar } from "../utils/encerrar";
import { header, escolherDoMenu, opcaoMenu } from "../utils/menuHelper";

export async function emprestimoMenu(): Promise<void> {
    const controller = new EmprestimoController();
    let msg;

    while (true) {
        header('Menu Emprestimos', msg);

        const opcoesPorMetodos: opcaoMenu[] = [
            { value: 0, name: 'Cadastrar Emprestimos', method: 'cadastrar' },
            { value: 1, name: 'Listar emprestimos', method: 'listar' },
            { value: 2, name: 'Buscar emprestimo por id', method: 'buscarPorId' },
            { value: 3, name: 'Atualizar emprestimo', method: 'atualizar' },
            { value: 4, name: 'Remover emprestimo', method: 'remover' },
        ];

        const opcoesVoltarEncerrar: opcaoMenu[] = [
            { value: -1, name: 'Voltar' },
            { value: -2, name: 'Encerrar aplicação' }
        ]

        const opcao: number = await escolherDoMenu([...opcoesPorMetodos, ...opcoesVoltarEncerrar]);

        if (opcao === -1) return; // volta para o menu anterior
        if (opcao === -2) await encerrrar(); // encerra aplicação

        if (opcao === undefined || opcao === null || !opcoesPorMetodos[opcao]) {
            msg = 'Opção inválida. Tente novamente.';
            continue;
        }

        header(opcoesPorMetodos[opcao].name); // muda cabeçalho para opção selecionda

        const metodo = opcoesPorMetodos[opcao].method as keyof EmprestimoController;
        await controller[metodo](); // chama controller com método da opção selecionada

        // Menu para voltar após interação com o banco de dados
        const menuVoltar = await escolherDoMenu(opcoesVoltarEncerrar);
        msg = null;

        if (menuVoltar === -2) await encerrrar(); // encerra aplicação
    }
}