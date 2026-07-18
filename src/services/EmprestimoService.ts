import { Emprestimo, IEmprestimo } from "../models/Emprestimo";
import { EmprestimoRepository } from "../repositories/EmprestimoRepository";

export class EmprestimoService {
    private emprestimoRepository = new EmprestimoRepository();

    async listar(): Promise<Emprestimo[]> {
        return await this.emprestimoRepository.listar();
    }

    // TODO cadastrar

    // TODO buscarPorId

    // TODO atualizar

    // TODO remover
}