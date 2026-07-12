import { Autor } from "../models/Autor";
import { AutorRepository } from "../repositories/AutorRepository";

export class AutorService {
    private autorRepository = new AutorRepository();

    async listar(): Promise<Autor[]> {
        return this.autorRepository.listarTodos();
    }
}