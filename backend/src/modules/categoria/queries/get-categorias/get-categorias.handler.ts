import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCategoriasQuery } from './get-categorias.query';
import { CategoriaRepository } from '../../repositories/categoria.repository';
import { Categoria } from 'generated/prisma/client';

@QueryHandler(GetCategoriasQuery)
export class GetCategoriasHandler implements IQueryHandler<GetCategoriasQuery> {
  constructor(private readonly repository: CategoriaRepository) {}

  async execute(): Promise<Categoria[]> {
    return this.repository.findAll();
  }
}
