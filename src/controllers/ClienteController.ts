import { input } from "@inquirer/i18n";
import { ICliente } from "../models/Cliente";
import { ClienteService } from "../services/ClienteService";
import { listarCliente, listarTodosClientes } from "../utils/formatters";
import { tratarErro } from "../utils/tratarErro";
import { AppError } from "../utils/AppError";
import { isEmailValido, isTextoValido } from "../utils/validators";

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
            const validacaoNome = isTextoValido(nome);
            if(!validacaoNome.ok) throw new AppError(validacaoNome.msg);

            const email = await input({ message: "Email: " })
            const validacaoEmail = isEmailValido(email);
            if (!validacaoEmail.ok) throw new AppError(validacaoEmail.msg);

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

    async atualizar(): Promise<void> {
        try {
            const id = Number(await input({ message: 'Informe o id do cliente: ' }));
            const cliente = await this.clienteService.buscarPorId(id);
            if (!cliente) throw new AppError(`Não foi encontrado cliente com id: ${ id }`);

            const nome = await input({ message: 'Nome: ', default: cliente.nome });
            const validacaoNome = isTextoValido(nome);
            if (!validacaoNome.ok) throw new AppError(validacaoNome.msg);

            const email = await input({ message: 'Email: ', default: cliente.email });
            const validacaoEmail = isEmailValido(email);
            if (!validacaoEmail.ok) throw new AppError(validacaoEmail.msg);

            const clienteAtualizado = await this.clienteService.atualizar(id, {
                id,
                nome,
                email
            });

            if (!clienteAtualizado) throw new AppError('Cliente não foi atualizado.');

            console.log(`\nCliente atualizado com sucesso!\n`);
            listarCliente(clienteAtualizado);
            console.log();
        } catch (error) {
            tratarErro(error);
        }
    }

    async remover(): Promise<void> {
        try {
            const id = Number(await input({ message: 'Informe o id do cliente: ' }));
            await this.clienteService.remover(id);
            console.log('\nCliente removido com sucesso!\n');
        } catch (error) {
            tratarErro(error);
        }
    }
}