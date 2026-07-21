import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRestauranteByNomeQuery } from './get-restaurante-by-nome.query';
import { RestauranteRepository } from '../../repositories/restaurante.repository';
import { Restaurante } from '../../entities/restaurante.entity';

@QueryHandler(GetRestauranteByNomeQuery)
export class GetRestauranteByNomeHandler implements IQueryHandler<GetRestauranteByNomeQuery> {
  constructor(private readonly repository: RestauranteRepository) {}

  async execute(query: GetRestauranteByNomeQuery): Promise<Restaurante | null> {
    return this.repository.findByNome(query.nome);
  }
}
