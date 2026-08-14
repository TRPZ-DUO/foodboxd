import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFeedByUsuarioQuery } from './get-feed-by-usuario.query';
import { Atividade } from '../../entities/atividade.entity';
import { FeedRepository } from '../../repositories/feed.repository';

@QueryHandler(GetFeedByUsuarioQuery)
export class GetFeedByUsuarioHandler implements IQueryHandler<GetFeedByUsuarioQuery> {
  constructor(private readonly repository: FeedRepository) {}

  async execute(query: GetFeedByUsuarioQuery): Promise<Atividade[]> {
    return this.repository.findAtividadesByUsuario(
      query.usuarioId,
      query.limit,
      query.cursor,
    );
  }
}
