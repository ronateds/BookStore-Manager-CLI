import { Emprestimo, IEmprestimo } from '../models/Emprestimo';
import { CrudRepository } from './CrudRepository';

export class EmprestimoRepository extends CrudRepository<IEmprestimo> {
    constructor() {
        super('emprestimos');
    }

    // TODO listar

    // TODO cadastrar

    // TODO buscarPorId

    // TODO atualizar

    // TODO remover
}