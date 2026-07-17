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

    async buscarPorId(id: number): Promise<ICliente | undefined> {
        return this.readById(id);
    }
    
    async atualizar(id: number, cliente: ICliente): Promise<ICliente | undefined> {
        return this.update(id, cliente)
    }

    // TODO remover
}