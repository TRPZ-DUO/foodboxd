import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSeguindosQuery } from './get-seguindos.query';
import { SeguirRepository } from '../../repositories/seguir.repository';
import { Seguidor } from '../../entities/seguidor.entity';

@QueryHandler(GetSeguindosQuery)
export class GetSeguindosHandler implements IQueryHandler<GetSeguindosQuery> {
  constructor(private readonly repository: SeguirRepository) {}

  async execute(query: GetSeguindosQuery): Promise<Seguidor[]> {
    return this.repository.findSeguindo(query.usuarioId);
  }
}
