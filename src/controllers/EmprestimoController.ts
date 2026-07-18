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

    // TODO atualizar

    // TODO remover
}