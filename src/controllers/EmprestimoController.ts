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

    // TODO cadastrar

    // TODO buscarPorId

    // TODO atualizar

    // TODO remover
}