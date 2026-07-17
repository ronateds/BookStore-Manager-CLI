import { ICliente } from "../models/Cliente";
import { CrudRepository } from "./CrudRepository";

export class ClienteRepository extends CrudRepository<ICliente> {
    constructor() {
        super('clientes')
    }

    async cadastrar(cliente: Omit<ICliente, "id">): Promise<ICliente | undefined> {
        return this.create(cliente);
    }

    async listarTodos(): Promise<ICliente[]> {
        return this.readAll();
    }

    // TODO buscarPorId

    // TODO atualizar

    // TODO remover
}