import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRestauranteByIdQuery } from './get-restaurante-by-id.query';
import { RestauranteRepository } from '../../repositories/restaurante.repository';
import { Restaurante } from '../../entities/restaurante.entity';

@QueryHandler(GetRestauranteByIdQuery)
export class GetRestauranteByIdHandler implements IQueryHandler<GetRestauranteByIdQuery> {
  constructor(private readonly repository: RestauranteRepository) {}

  async execute(query: GetRestauranteByIdQuery): Promise<Restaurante | null> {
    return this.repository.findById(query.id);
  }
}
