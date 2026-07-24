import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPratoByIdQuery } from './get-prato-by-id.query';
import { Prato } from '../../entities/prato.entity';
import { PratoRepository } from '../../repositories/prato.repository';

@QueryHandler(GetPratoByIdQuery)
export class GetPratoByIdHandler implements IQueryHandler<GetPratoByIdQuery> {
  constructor(private readonly repository: PratoRepository) {}

  async execute(query: GetPratoByIdQuery): Promise<Prato | null> {
    return this.repository.findById(query.id);
  }
}
