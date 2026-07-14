import { LivroRepository } from '../repositories/LivroRepository';
import { AutorRepository } from '../repositories/AutorRepository';
import { ILivro, ILivroComAutor, Livro } from '../models/Livro';
import { AppError } from '../utils/AppError';
import { isAnoValido, isInteiroNaoNegativo, isTextoValido } from '../utils/validators';

export class LivroService {
  private livroRepository = new LivroRepository();
  private autorRepository = new AutorRepository();

   async listar(): Promise<ILivroComAutor[]> {
    return this.livroRepository.listarTodos();
  }

}

