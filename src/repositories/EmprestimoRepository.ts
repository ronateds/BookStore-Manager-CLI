import { Emprestimo, IEmprestimo } from '../models/Emprestimo';
import { CrudRepository } from './CrudRepository';

export class EmprestimoRepository extends CrudRepository<IEmprestimo> {
    constructor() {
        super('emprestimos');
    }

    async listar(): Promise<Emprestimo[]> {
        return this.readAll();
    }

    // TODO cadastrar

    // TODO buscarPorId

    // TODO atualizar

    // TODO remover
}