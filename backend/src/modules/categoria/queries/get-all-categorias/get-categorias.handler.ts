import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CategoriaRepository } from '../../repositories/categoria.repository';
import { Categoria } from 'generated/prisma/client';
import { GetAllCategoriasQuery } from './get-categorias.query';

@QueryHandler(GetAllCategoriasQuery)
export class GetAllCategoriasHandler implements IQueryHandler<GetAllCategoriasQuery> {
  constructor(private readonly repository: CategoriaRepository) {}

  async execute(): Promise<Categoria[]> {
    return this.repository.findAll();
  }
}
