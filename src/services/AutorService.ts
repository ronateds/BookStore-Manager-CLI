import { Autor, IAutor } from "../models/Autor";
import { AutorRepository } from "../repositories/AutorRepository";
import { AppError } from "../utils/AppError";

export class AutorService {
    private autorRepository = new AutorRepository();

    async listar(): Promise<Autor[]> {
        return await this.autorRepository.listarTodos();
    }

    async cadastrar(dados: Omit<IAutor, "id">): Promise<Autor | undefined> {
        return this.autorRepository.cadastrar(dados);
    }

    async buscarPorId(id: number): Promise<Autor> {
        const autor = await this.autorRepository.buscarPorId(id);
        if (!autor) {
            throw new AppError(`Autor com id ${ id } não encontrado.`);
        }
        return autor;
    }

    async atualizar(id: number, dados: IAutor): Promise<Autor> {
        await this.buscarPorId(id);

        const atualizado = await this.autorRepository.atualizar(id, dados);
        if (!atualizado) {
            throw new AppError('Não foi possível atualizar o autor.');
        }
        return atualizado;
    }

    async remover(id: number): Promise<void> {
        await this.autorRepository.remover(id);
    }
}