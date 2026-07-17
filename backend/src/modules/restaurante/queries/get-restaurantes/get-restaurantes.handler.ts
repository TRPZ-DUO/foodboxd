import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRestaurantesQuery } from './get-restaurantes.query';
import { RestauranteRepository } from '../../repositories/restaurante.repository';
import { Restaurante } from '../../entities/restaurante.entity';

@QueryHandler(GetRestaurantesQuery)
export class GetRestaurantesHandler implements IQueryHandler<GetRestaurantesQuery> {
  constructor(private readonly repository: RestauranteRepository) {}

  async execute(): Promise<Restaurante[]> {
    return this.repository.findAll();
  }
}
