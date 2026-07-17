import { ICliente } from "../models/Cliente";
import { CrudRepository } from "./CrudRepository";

export class ClienteRepository extends CrudRepository<ICliente> {
    constructor() {
        super('clientes')
    }

    async cadastrar(cliente: Omit<ICliente, "id">): Promise<ICliente | undefined> {
        return this.create(cliente);
    }

    // TODO listarTodos

    // TODO buscarPorId

    // TODO atualizar

    // TODO remover
}