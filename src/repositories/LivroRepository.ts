import { ILivro } from '../models/Livro';
import { CrudRepository } from './crudRepositort';

export class LivroRepository extends CrudRepository<ILivro> {
  constructor() {
    super('livros');
  }

  async listarTodos():                          Promise<ILivro[]>                   { return this.readAll() };
  async buscarPorId(id: number):                Promise<ILivro | undefined>         { return this.readById(id) };
  async criar(livro: Omit<ILivro, 'id'>):       Promise<ILivro | undefined>         { return this.create(livro) };
  async atualizar(id: number, livro: ILivro):   Promise<ILivro | undefined>         { return this.update(id, livro) };
  async remover(id: number):                    Promise<boolean>                    { return this.delete(id) };
}