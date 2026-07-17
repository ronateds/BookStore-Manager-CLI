import { Cliente, ICliente } from "../models/Cliente";
import { ClienteRepository } from "../repositories/ClienteRepository";

export class ClienteService {
    private clienteRepository = new ClienteRepository();

    async listar(): Promise<Cliente[]> {
        return await this.clienteRepository.listarTodos();
    }

    // TODO cadastrar

    // TODO buscarPorId

    // TODO atualizar

    // TODO remover
}