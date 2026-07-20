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

        const validacaoEmail= isEmailValido(dados.email);
        if (!validacaoEmail.ok) {
            throw new AppError(validacaoEmail.msg);
        }

        return this.clienteRepository.cadastrar(dados);
    }

    async buscarPorId(id: number): Promise<Cliente> {
        const cliente = await this.clienteRepository.buscarPorId(id);
        if (!cliente) {
            throw new AppError(`Cliente com id ${ id } não encontrado.`);
        }
        return cliente;
    }

    async atualizar(id: number, dados: ICliente): Promise<Cliente> {
        const validacaoNome = isTextoValido(dados.nome);
        if (!validacaoNome.ok) {
            throw new AppError(validacaoNome.msg);
        }

        const validacaoEmail = isEmailValido(dados.nome);
        if (!validacaoEmail.ok) {
            throw new AppError(validacaoNome.msg);
        }

        const atualizado = await this.clienteRepository.atualizar(id, dados);
        if (!atualizado) {
            throw new AppError('Não foi possível atualizar o cliente.');
        }
        return atualizado;
    }

    async remover(id: number): Promise<void> {
        await this.clienteRepository.remover(id);
    }
}