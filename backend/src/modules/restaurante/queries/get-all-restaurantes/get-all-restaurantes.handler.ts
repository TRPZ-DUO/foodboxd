import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllRestaurantesQuery } from './get-all-restaurantes.query';
import { RestauranteRepository } from '../../repositories/restaurante.repository';
import { Restaurante } from '../../entities/restaurante.entity';

@QueryHandler(GetAllRestaurantesQuery)
export class GetAllRestaurantesHandler implements IQueryHandler<GetAllRestaurantesQuery> {
  constructor(private readonly repository: RestauranteRepository) {}

  async execute(): Promise<Restaurante[]> {
    return this.repository.findAll();
  }
}
