import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CategoriaRepository } from '../../repositories/categoria.repository';
import { GetAllCategoriasQuery } from './get-categorias.query';
import { Categoria } from '../../entities/categoria.entity';

@QueryHandler(GetAllCategoriasQuery)
export class GetAllCategoriasHandler implements IQueryHandler<GetAllCategoriasQuery> {
  constructor(private readonly repository: CategoriaRepository) {}

  async execute(): Promise<Categoria[]> {
    return this.repository.findAll();
  }
}
