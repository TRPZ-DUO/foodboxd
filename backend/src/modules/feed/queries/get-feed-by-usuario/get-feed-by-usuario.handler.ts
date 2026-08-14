import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFeedByUsuarioQuery } from './get-feed-by-usuario.query';
import { FeedRepository } from '../../repositories/feed.repository';
import { FeedResult } from '../../interfaces/feed-result.interface';

@QueryHandler(GetFeedByUsuarioQuery)
export class GetFeedByUsuarioHandler implements IQueryHandler<GetFeedByUsuarioQuery> {
  constructor(private readonly repository: FeedRepository) {}

  async execute(query: GetFeedByUsuarioQuery): Promise<FeedResult> {
    return this.repository.findAtividadesByUsuario(
      query.usuarioId,
      query.limit,
      query.cursor,
    );
  }
}
