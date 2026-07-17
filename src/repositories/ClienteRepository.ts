import { ICliente } from "../models/Cliente";
import { CrudRepository } from "./CrudRepository";

export class ClienteRepository extends CrudRepository<ICliente> {
    constructor() {
        super('clientes')
    }

    // TODO cadastrar

    // TODO listarTodos

    // TODO buscarPorId

    // TODO atualizar

    // TODO remover
}