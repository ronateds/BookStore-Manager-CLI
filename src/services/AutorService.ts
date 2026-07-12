import { Autor, IAutor } from "../models/Autor";
import { AutorRepository } from "../repositories/AutorRepository";
import { AppError } from "../utils/AppError";
import { isTextoValido } from "../utils/validators";

export class AutorService {
    private autorRepository = new AutorRepository();

    async listar(): Promise<Autor[]> {
        return this.autorRepository.listarTodos();
    }

    async cadastrar(dados: IAutor): Promise<Autor | undefined> {
        if (!isTextoValido(dados.nome)) {
            throw new AppError('Nome do autor inválido. Informe pelo menos 2 caracteres.');
        }
        if (!isTextoValido(dados.nacionalidade)) {
            throw new AppError('Nacionalidade inválida. Informe pelo menos 2 caracteres.');
        }
        return this.autorRepository.cadastrar(dados);
    }
}