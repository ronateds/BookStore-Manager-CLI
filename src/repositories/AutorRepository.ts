import { Autor, IAutor } from '../models/Autor';
import { CrudRepository } from './CrudRepository';

export class AutorRepository extends CrudRepository<IAutor> {
    constructor() {
        super('autores');
    }

    async cadastrar(autor: Omit<IAutor, "id">): Promise<Autor | undefined> {
        return this.create(autor);
    }

    async listarTodos(): Promise<Autor[]> {
        return this.readAll();
    }

    async buscarPorId(id: number): Promise<Autor | undefined> {
        return this.readById(id);
    }

    async atualizar(id: number, autor: IAutor): Promise<Autor | undefined> {
        return this.update(id, autor)
    }

    async remover(id: number): Promise<boolean> {
        return this.delete(id);
    }
}