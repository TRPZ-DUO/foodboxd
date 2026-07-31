import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchRestauranteQuery } from './search-restaurante.query';
import { RestauranteRepository } from '../../repositories/restaurante.repository';
import { Restaurante } from '../../entities/restaurante.entity';

@QueryHandler(SearchRestauranteQuery)
export class SearchRestauranteHandler implements IQueryHandler<SearchRestauranteQuery> {
  constructor(private readonly repository: RestauranteRepository) {}

  async execute(query: SearchRestauranteQuery): Promise<Restaurante[]> {
    return this.repository.search(query.filters);
  }
}
