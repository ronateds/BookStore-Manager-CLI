import { LivroService } from '../services/LivroService';
import { AppError } from '../utils/AppError';
import { tratarErro } from '../utils/tratarErro';

export class LivroController {
  private livroService = new LivroService();

  async listar(): Promise<void> {
    try {
      const livros = await this.livroService.listar();
      if (livros.length === 0) {
        console.log('Nenhum livro cadastrado.');
        return;
      }

      livros.forEach((livro) => {
        // TODO formatter
        console.log(
          `[${ livro.id }] ${ livro.titulo } (${ livro.anoPublicacao }) - Autor: ${ livro.nomeAutor } - Disponíveis: ${ livro.quantidadeDisponivel }/${ livro.quantidadeTotal }`,
        );
      });
      console.log();
    } catch (error) {
      tratarErro(error);
    }
  } 
}