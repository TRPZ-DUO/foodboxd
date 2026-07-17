import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRestauranteQuery } from './get-restaurante.query';
import { RestauranteRepository } from '../../repositories/restaurante.repository';
import { Restaurante } from '../../entities/restaurante.entity';

@QueryHandler(GetRestauranteQuery)
export class GetRestauranteHandler implements IQueryHandler<GetRestauranteQuery> {
  constructor(private readonly repository: RestauranteRepository) {}

  async execute(query: GetRestauranteQuery): Promise<Restaurante | null> {
    return this.repository.findByNome(query.nome);
  }
}
