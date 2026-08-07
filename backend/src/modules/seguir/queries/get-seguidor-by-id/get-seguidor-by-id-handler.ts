import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSeguidorByIdQuery } from './get-seguidor-by-id.query';
import { SeguirRepository } from '../../repositories/seguir.repository';
import { Seguidor } from '../../entities/seguidor.entity';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetSeguidorByIdQuery)
export class GetSeguidorByIdHandler implements IQueryHandler<GetSeguidorByIdQuery> {
  constructor(private readonly repository: SeguirRepository) {}

  async execute(query: GetSeguidorByIdQuery): Promise<Seguidor | null> {
    const seguir = await this.repository.findById(query.id);

    if (!seguir) {
      throw new NotFoundException('Seguidor não encontrado');
    }

    return seguir;
  }
}
