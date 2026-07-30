import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRestauranteByIdQuery } from './get-restaurante-by-id.query';
import { RestauranteRepository } from '../../repositories/restaurante.repository';
import { Restaurante } from '../../entities/restaurante.entity';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetRestauranteByIdQuery)
export class GetRestauranteByIdHandler implements IQueryHandler<GetRestauranteByIdQuery> {
  constructor(private readonly repository: RestauranteRepository) {}

  async execute(query: GetRestauranteByIdQuery): Promise<Restaurante | null> {
    const restaurante = await this.repository.findById(query.id);

    if (!restaurante) {
      throw new NotFoundException(
        `Restaurante não encontrado, id: ${query.id}`,
      );
    }

    return restaurante;
  }
}
