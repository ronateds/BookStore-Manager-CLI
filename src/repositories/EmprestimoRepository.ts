import { Emprestimo, IEmprestimo } from '../models/Emprestimo';
import { CrudRepository } from './CrudRepository';

export class EmprestimoRepository extends CrudRepository<IEmprestimo> {
    constructor() {
        super('emprestimos');
    }

    async listar(): Promise<Emprestimo[]> {
        return this.readAll();
    }

    async cadastrar(emprestimo: Omit<IEmprestimo, "id">): Promise<Emprestimo | undefined> {
        return this.create(emprestimo);
    }

    async buscarPorId(id: number): Promise<Emprestimo | undefined> {
        return this.readById(id);
    }

    // TODO atualizar

    // TODO remover
}