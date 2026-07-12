import { AutorService } from "../services/AutorService";
import { header } from "../utils/formatters";

export class AutorController {
    private autorService = new AutorService();

    async listar(): Promise<void> {
        header('Lista de Autores');
        try {
            const autores = await this.autorService.listar();
            if (autores.length === 0) {
                console.log('Nenhum autor cadastrado.\n');
                return;
            }
            autores.forEach((a) => {
                console.log(`[${ a.id }] ${ a.nome } - ${ a.nacionalidade }`);
            });
            return;
        } catch (error) {
            console.error(error);
        }
    }
}