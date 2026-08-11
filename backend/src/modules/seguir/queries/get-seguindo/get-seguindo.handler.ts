import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSeguindoQuery } from './get-seguindo.query';
import { SeguirRepository } from '../../repositories/seguir.repository';
import { Seguidor } from '../../entities/seguidor.entity';

@QueryHandler(GetSeguindoQuery)
export class GetSeguindoHandler implements IQueryHandler<GetSeguindoQuery> {
  constructor(private readonly repository: SeguirRepository) {}

  async execute(query: GetSeguindoQuery): Promise<Seguidor[]> {
    return this.repository.findSeguindo(query.usuarioId);
  }
}
