import { RelatoriosController } from "../controllers/RelatorioController";
import { encerrrar } from "../utils/encerrar";
import { header, escolherDoMenu, opcaoMenu } from "../utils/menuHelper";

export async function relatoriosMenu(): Promise<void> {
    const controller = new RelatoriosController();
    let msg;

    while (true) {
        header('Gerar Relatórios', msg);

        const opcoesPorMetodos: opcaoMenu[] = [
            { value: 0, name: 'Livros disponíveis', method: 'livrosDisponiveis' },
            { value: 1, name: 'Livros emprestados', method: 'livrosEmprestados' },
            { value: 2, name: 'Livros cadastrados por autor', method: 'livrosPorAutor' },
            { value: 3, name: 'Quantidade de empréstimos por livro', method: 'emprestimosPorLivros' },
            { value: 4, name: 'Clientes com empréstimos ativos', method: 'emprestimosAtivos' },
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

        const metodo = opcoesPorMetodos[opcao].method as keyof RelatoriosController;
        await controller[metodo](); // chama controller com método da opção selecionada

        // Menu para voltar após interação com o banco de dados
        const menuVoltar = await escolherDoMenu(opcoesVoltarEncerrar);
        msg = null;

        if (menuVoltar === -2) await encerrrar(); // encerra aplicação
    }
}