import { input } from "@inquirer/i18n";
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

    async cadastrar(): Promise<void> {
        try {
            const nome = await input({ message: "Nome: " });
            const email = await input({ message: "Email: " })

            const cliente = await this.clienteService.cadastrar({ nome, email });
            if (cliente) {
                console.log(`\nCliente ${ cliente.nome } cadastrado com sucesso! (id: ${ cliente.id })\n`);
            }
        } catch (error) {
            tratarErro(error);
        }
    }

    async buscarPorId(): Promise<void> {
        try {
            const id = Number(await input({ message: "Informe o id do cliente(a): " }));
            const cliente = await this.clienteService.buscarPorId(id);
            listarCliente(cliente);
        } catch (error) {
            tratarErro(error);
        }
    }

    // TODO atualizar

    // TODO remover
}