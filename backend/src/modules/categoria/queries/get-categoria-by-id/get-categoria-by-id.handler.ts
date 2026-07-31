import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCategoriaByIdQuery } from './get-categoria-by-id.query';
import { CategoriaRepository } from '../../repositories/categoria.repository';
import { Categoria } from '../../entities/categoria.entity';

@QueryHandler(GetCategoriaByIdQuery)
export class GetCategoriaByIdHandler implements IQueryHandler<GetCategoriaByIdQuery> {
  constructor(private readonly repository: CategoriaRepository) {}

  async execute(query: GetCategoriaByIdQuery): Promise<Categoria | null> {
    return this.repository.findById(query.id);
  }
}
