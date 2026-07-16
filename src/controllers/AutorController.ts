import { input } from "@inquirer/i18n";
import { AutorService } from "../services/AutorService";
import { tratarErro } from "../utils/tratarErro";
import { IAutor } from "../models/Autor";
import { listarTodosAutores } from "../utils/formatters";

export class AutorController {
    private autorService = new AutorService();

    async listar(): Promise<void> {
        try {
            const autores: IAutor[] = await this.autorService.listar();

            autores.length ?
                listarTodosAutores(autores) :
                console.log('Nenhum autor cadastrado.\n');

            return;
        } catch (error) {
            tratarErro(error);
            return;
        }
    }

    async cadastrar(): Promise<void> {
        try {
            const nome = await input({ message: "Nome do Autor(a): " });
            const nacionalidade = await input({ message: "Nacionalidade: " })

            const autor = await this.autorService.cadastrar({ nome, nacionalidade });
            if (autor) {
                console.log(`\nAutor(a) ${ autor.nome } cadastrado com sucesso! (id: ${ autor.id })\n`);
            }
        } catch (error) {
            tratarErro(error);
        }
    }

    async buscarPorId(): Promise<void> {
        try {
            const id = Number(await input({ message: "Informe o id do autor(a): " }));
            const autor = await this.autorService.buscarPorId(id);
            console.log(`\n[${ autor.id }] ${ autor.nome } - ${ autor.nacionalidade }\n`);
        } catch (error) {
            tratarErro(error);
        }
    }

    async atualizar(): Promise<void> {
        try {
            const id = Number(await input({ message: 'Informe o id do autor: ' }));
            const nome = await input({ message: 'Novo nome: ' });
            const nacionalidade = await input({ message: 'Nova nacionalidade: ' });

            const autor = await this.autorService.atualizar({ id, nome, nacionalidade });
            console.log(`\nAutor atualizado com sucesso! [${ autor.id }] ${ autor.nome }\n`);
        } catch (error) {
            tratarErro(error);
        }
    }

    async remover(): Promise<void> {
        try {
            const id = Number(await input({ message: 'Informe o id do autor: ' }));
            await this.autorService.remover(id);
            console.log('\nAutor removido com sucesso!\n');
        } catch (error) {
            tratarErro(error);
        }
    }
}