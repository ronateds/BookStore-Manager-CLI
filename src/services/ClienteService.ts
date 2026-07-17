import { Cliente, ICliente } from "../models/Cliente";
import { ClienteRepository } from "../repositories/ClienteRepository";
import { AppError } from "../utils/AppError";
import { isEmailValido, isTextoValido } from "../utils/validators";

export class ClienteService {
    private clienteRepository = new ClienteRepository();

    async listar(): Promise<Cliente[]> {
        return await this.clienteRepository.listarTodos();
    }

    async cadastrar(dados: Omit<ICliente, "id">): Promise<Cliente | undefined> {
        const validacaoNome = isTextoValido(dados.nome);
        if(!validacaoNome.ok) {
            throw new AppError(validacaoNome.msg);
        }

        const validacaoEmail= isEmailValido(dados.nome);
        if (!validacaoEmail.ok) {
            throw new AppError(validacaoNome.msg);
        }

        return this.clienteRepository.cadastrar(dados);
    }

    // TODO buscarPorId

    // TODO atualizar

    // TODO remover
}