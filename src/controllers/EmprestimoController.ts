import { input } from "@inquirer/i18n";
import { EmprestimoService } from "../services/EmprestimoService";
import { tratarErro } from "../utils/tratarErro";
import { IEmprestimo } from "../models/Emprestimo";
import { listarEmprestimo, listarTodosEmprestimos } from "../utils/formatters";
import { AppError } from "../utils/AppError";

export class EmprestimoController {
    private emprestimoService = new EmprestimoService();

    async listar(): Promise<void> {
        try {
            const emprestimos: IEmprestimo[] = await this.emprestimoService.listar();

            emprestimos.length ?
                listarTodosEmprestimos(emprestimos) :
                console.log('Nenhum emprestimo cadastrado.\n');

            return;
        } catch (error) {
            tratarErro(error);
            return;
        }
    }

    async cadastrar(): Promise<void> {
        try {
            const cliente_id = Number(await input({ message: "ID do cliente: " }));
            const livro_id = Number(await input({ message: "ID do livro: " }));

            const emprestimo = await this.emprestimoService.cadastrar({ cliente_id, livro_id });
            if (emprestimo) {
                console.log(`\nEmprestimo registrado com sucesso! (id: ${ emprestimo.id })\n`);
            }
        } catch (error) {
            tratarErro(error);
        }
    }

    async buscarPorId(): Promise<void> {
        try {
            const id = Number(await input({ message: "Informe o id do emprestimo: " }));
            const emprestimo = await this.emprestimoService.buscarPorId(id);

            console.log();
            listarEmprestimo(emprestimo);
            console.log();
        } catch (error) {
            tratarErro(error);
        }
    }

    async atualizar(): Promise<void> {
        try {
            // Procura emprestimo por id primeiro
            const id = Number(await input({ message: 'Informe o id do emprestimo: ' }));
            const emprestimo = await this.emprestimoService.buscarPorId(id);
            if (!emprestimo) throw new AppError(`Não foi encontrado emprestimo com id: ${ id }`);

            // Pede inputs ao usuario definindo como padrão os atributos do emprestimo existente
            const cliente_id = Number(await input({ message: "ID do cliente: ", default: String(emprestimo.cliente_id) }));
            const livro_id = Number(await input({ message: "ID do livro: ", default: String(emprestimo.livro_id) }));
            const data_emprestimo = new Date(await input({ message: "Data de empréstimo: ", default: String(emprestimo.data_emprestimo) }));
            const data_devolucao = new Date(await input({ message: "Data de empréstimo: ", default: String(emprestimo.data_devolucao) }));


            // Atualiza o emprestimo
            const emprestimoAtualizado = await this.emprestimoService.atualizar(id, {
                id,
                cliente_id,
                livro_id,
                data_emprestimo,
                data_devolucao
            });

            if (!emprestimoAtualizado) throw new AppError('Livro não foi atualizado.');

            console.log(`\nEmprestimo atualizado com sucesso!\n`);
            listarEmprestimo(emprestimoAtualizado);
            console.log();
        } catch (error) {
            tratarErro(error);
        }
    }

    async remover(): Promise<void> {
        try {
            const id = Number(await input({ message: 'Informe o id do emprestimo: ' }));
            await this.emprestimoService.remover(id);
            console.log('\nEmprestimo removido com sucesso!\n');
        } catch (error) {
            tratarErro(error);
        }
    }
}