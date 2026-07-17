import { Cliente, ICliente } from "../models/Cliente";
import { CrudRepository } from "./CrudRepository";

export class ClienteRepository extends CrudRepository<Cliente> {
    constructor() {
        super('clientes')
    }

    async cadastrar(cliente: Omit<ICliente, "id">): Promise<Cliente | undefined> {
        return this.create(cliente);
    }

    async listarTodos(): Promise<Cliente[]> {
        return this.readAll();
    }

    async buscarPorId(id: number): Promise<Cliente | undefined> {
        return this.readById(id);
    }
    
    async atualizar(id: number, cliente: ICliente): Promise<ICliente | undefined> {
        return this.update(id, cliente)
    }

    async remover(id: number): Promise<boolean> {
        return this.delete(id);
    }
}