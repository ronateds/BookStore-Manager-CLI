import { LivroController } from '../controllers/LivroController';
import { encerrrar } from "../utils/encerrar";
import { header, escolherDoMenu, opcaoMenu } from "../utils/menuHelper";

export async function menuLivros(): Promise<void> {
  const controller = new LivroController();
  let msg;

  while (true) {
    header('Menu Livros', msg);

    const opcoesPorMetodos: opcaoMenu[] = [
      { value: 0, name: 'Cadastrar Livro', method: 'cadastrar' },
      { value: 1, name: 'Listar livros', method: 'listar' },
      { value: 2, name: 'Buscar livro por id', method: 'buscarPorId' },
      { value: 3, name: 'Atualizar livro', method: 'atualizar' },
      { value: 4, name: 'Remover livro', method: 'remover' },
    ];

    const opcoesVoltarEncerrar: opcaoMenu[] = [
      { value: -1, name: 'Voltar' },
      { value: -2, name: 'Encerrar aplicação' }
    ];

    const opcao: number = await escolherDoMenu([...opcoesPorMetodos, ...opcoesVoltarEncerrar]);

    if (opcao === -1) return; // volta para o menu anterior
    if (opcao === -2) await encerrrar(); // encerra aplicação

    if (opcao === undefined || opcao === null || !opcoesPorMetodos[opcao]) {
      msg = 'Opção inválida. Tente novamente.';
      continue;
    }

    header(opcoesPorMetodos[opcao].name); // muda cabeçalho para opção selecionda

    const metodo = opcoesPorMetodos[opcao].method as keyof LivroController;
    await controller[metodo](); // chama controller com método da opção selecionada

    // Menu para voltar após interação com o banco de dados
    const menuVoltar = await escolherDoMenu(opcoesVoltarEncerrar);
    msg = null;

    if (menuVoltar === -2) await encerrrar(); // encerra aplicação
  }
}