import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCategoriaByNomeQuery } from './get-categoria-by-nome.query';
import { CategoriaRepository } from '../../repositories/categoria.repository';
import { Categoria } from 'generated/prisma/client';

@QueryHandler(GetCategoriaByNomeQuery)
export class GetCategoriaByNomeHandler implements IQueryHandler<GetCategoriaByNomeQuery> {
  constructor(private readonly repository: CategoriaRepository) {}

  async execute(query: GetCategoriaByNomeQuery): Promise<Categoria | null> {
    return this.repository.findByNome(query.nome);
  }
}
