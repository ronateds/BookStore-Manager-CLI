import { Autor, IAutor } from "../models/Autor";
import { AutorRepository } from "../repositories/AutorRepository";
import { AppError } from "../utils/AppError";
import { isTextoValido } from "../utils/validators";

export class AutorService {
    private autorRepository = new AutorRepository();

    async listar(): Promise<Autor[]> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.autorRepository.listarTodos());
            } catch (error) {
                reject(error);
            }
        })
    }

    async cadastrar(dados: Omit<IAutor, "id">): Promise<Autor | undefined> {
        if (!isTextoValido(dados.nome)) {
            throw new AppError('Nome do autor inválido. Informe pelo menos 2 caracteres.');
        }
        if (!isTextoValido(dados.nacionalidade)) {
            throw new AppError('Nacionalidade inválida. Informe pelo menos 2 caracteres.');
        }
        return this.autorRepository.cadastrar(dados);
    }

    async buscarPorId(id: number): Promise<Autor> {
        const autor = await this.autorRepository.buscarPorId(id);
        if (!autor) {
            throw new AppError(`Autor com id ${ id } não encontrado.`);
        }
        return autor;
    }

    async atualizar(dados: IAutor): Promise<Autor> {
        await this.buscarPorId(dados.id);
        if (!isTextoValido(dados.nome) || !isTextoValido(dados.nacionalidade)) {
            throw new AppError('Dados inválidos para atualização do autor.');
        }
        const atualizado = await this.autorRepository.atualizar(dados);
        if (!atualizado) {
            throw new AppError('Não foi possível atualizar o autor.');
        }
        return atualizado;
    }

    async remover(id: number): Promise<void> {
        await this.buscarPorId(id);
        const possuiLivros = await this.autorRepository.possuiLivrosVinculados(id);
        if (possuiLivros) {
            throw new AppError('Não é possível remover o autor: existem livros vinculados a ele.');
        }
        await this.autorRepository.remover(id);
    }
}