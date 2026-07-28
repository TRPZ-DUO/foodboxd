import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllPratosQuery } from './get-all-pratos.query';
import { PratoRepository } from '../../repositories/prato.repository';
import { Prato } from '../../entities/prato.entity';

@QueryHandler(GetAllPratosQuery)
export class GetAllPratosHandler implements IQueryHandler<GetAllPratosQuery> {
  constructor(private readonly repository: PratoRepository) {}

  async execute(): Promise<Prato[]> {
    return this.repository.findAll();
  }
}
