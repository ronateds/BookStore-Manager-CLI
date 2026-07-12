import { input } from "@inquirer/i18n";
import { AutorService } from "../services/AutorService";
import { tratarErro } from "../utils/tratarErro";

export class AutorController {
    private autorService = new AutorService();

    async listar(): Promise<void> {
        try {
            const autores = await this.autorService.listar();
            if (autores.length === 0) {
                console.log('Nenhum autor cadastrado.\n');
                return;
            }
            autores.forEach((a) => {
                console.log(`[${ a.id }] ${ a.nome } - ${ a.nacionalidade }`);
            });
            console.log(); // pra deixar uma linha vazia
            return;
        } catch (error) {
            tratarErro(error);
        }
    }

    async cadastrar(): Promise<void> {
        try {
            const nome = await input({ message: "Nome do Autor(a): " });
            const nacionalidade = await input({ message: "Nacionalidade: " })

            const autor = await this.autorService.cadastrar({ nome, nacionalidade });
            if(autor) {
                console.log(`\nAutor(a) ${ autor.nome } cadastrado com sucesso! (id: ${ autor.id }\n)`);
            }
        } catch (error) {
            console.log(error);
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
}