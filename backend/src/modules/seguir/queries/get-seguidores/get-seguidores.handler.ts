import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSeguidoresQuery } from './get-seguidores.query';
import { SeguirRepository } from '../../repositories/seguir.repository';
import { Seguidor } from '../../entities/seguidor.entity';

@QueryHandler(GetSeguidoresQuery)
export class GetSeguidoresHandler implements IQueryHandler<GetSeguidoresQuery> {
  constructor(private readonly repository: SeguirRepository) {}

  async execute(query: GetSeguidoresQuery): Promise<Seguidor[]> {
    return this.repository.findSeguidores(query.usuarioId);
  }
}
