import { Emprestimo, IEmprestimo } from "../models/Emprestimo";
import { EmprestimoRepository } from "../repositories/EmprestimoRepository";
import { AppError } from "../utils/AppError";
import { isInteiroPositivo } from "../utils/validators";

export class EmprestimoService {
    private emprestimoRepository = new EmprestimoRepository();

    async listar(): Promise<Emprestimo[]> {
        return await this.emprestimoRepository.listar();
    }

   async cadastrar(dados: Omit<IEmprestimo, "id">): Promise<Emprestimo | undefined> {
        const validacaoClienteId = isInteiroPositivo(dados.cliente_id);
        if(!validacaoClienteId.ok) {
            throw new AppError(validacaoClienteId.msg);
        }

        const validacaoLivroId = isInteiroPositivo(dados.livro_id);
        if (!validacaoLivroId.ok) {
            throw new AppError(validacaoLivroId.msg);
        }

        return this.emprestimoRepository.cadastrar(dados);
    }
    

    // TODO buscarPorId

    // TODO atualizar

    // TODO remover
}