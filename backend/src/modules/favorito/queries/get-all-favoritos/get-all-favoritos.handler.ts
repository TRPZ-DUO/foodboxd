import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllFavoritosQuery } from './get-all-favoritos.query';
import { FavoritoRepository } from '../../repositories/favorito.repository';
import { Favorito } from '../../entities/favorito.entity';

@QueryHandler(GetAllFavoritosQuery)
export class GetAllFavoritosHandler implements IQueryHandler<GetAllFavoritosQuery> {
  constructor(private readonly repository: FavoritoRepository) {}

  async execute(): Promise<Favorito[]> {
    return this.repository.findAll();
  }
}
