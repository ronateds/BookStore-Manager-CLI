import { input } from "@inquirer/i18n";
import { AutorService } from "../services/AutorService";
import { tratarErro } from "../utils/tratarErro";
import { IAutor } from "../models/Autor";
import { listarAutor, listarTodosAutores } from "../utils/formatters";
import { AppError } from "../utils/AppError";

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
            // Procura autor por id primeiro
            const id = Number(await input({ message: 'Informe o id do autor: ' }));
            const autor = await this.autorService.buscarPorId(id);
            if (!autor) throw new AppError(`Não foi encontrado autor com id: ${ id }`);

            // Pede inputs ao usuario definindo como padrão os atributos do autor existente
            const nome = await input({ message: 'Nome do Autor(a): ', default: autor.nome });
            const nacionalidade = await input({ message: 'Nacionalidade: ', default: autor.nacionalidade });

            // Atualiza o autor
            const autorAtualizado = await this.autorService.atualizar(id, {
                id,
                nome,
                nacionalidade
            });

            if (!autorAtualizado) throw new AppError('Livro não foi atualizado.');
            
            console.log(`\nAutor atualizado com sucesso!\n`);
            listarAutor(autorAtualizado);
            console.log();
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