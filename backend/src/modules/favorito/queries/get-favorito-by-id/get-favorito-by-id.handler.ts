import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFavoritoByIdQuery } from './get-favorito-by-id.query';
import { Favorito } from '../../entities/favorito.entity';
import { FavoritoRepository } from '../../repositories/favorito.repository';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetFavoritoByIdQuery)
export class GetFavoritoByIdHandler implements IQueryHandler<GetFavoritoByIdQuery> {
  constructor(private readonly repository: FavoritoRepository) {}
  async execute(query: GetFavoritoByIdQuery): Promise<Favorito | null> {
    const data = await this.repository.findById(query.id);

    if (!data) {
      throw new NotFoundException('Favoritado não encontrado');
    }

    return data;
  }
}
