import { ICliente } from "../models/Cliente";
import { ClienteService } from "../services/ClienteService";
import { listarCliente, listarTodosClientes } from "../utils/formatters";
import { tratarErro } from "../utils/tratarErro";


export class ClienteController {
    private clienteService = new ClienteService();

    async listar(): Promise<void> {
        try {
            const clientes: ICliente[] = await this.clienteService.listar();

            clientes.length ?
                listarTodosClientes(clientes) :
                console.log('Nenhum cliente cadastrado.\n');

            return;
        } catch (error) {
            tratarErro(error);
            return;
        }
    }

    // TODO cadastrar

    // TODO buscarPorId

    // TODO atualizar

    // TODO remover
}