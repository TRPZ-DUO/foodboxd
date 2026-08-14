import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFeedQuery } from './get-feed.query';
import { FeedRepository } from '../../repositories/feed.repository';
import { FeedResult } from '../../interfaces/feed-result.interface';

@QueryHandler(GetFeedQuery)
export class GetFeedHandler implements IQueryHandler<GetFeedQuery> {
  constructor(private readonly repository: FeedRepository) {}

  async execute(query: GetFeedQuery): Promise<FeedResult> {
    return this.repository.findFeed(query.usuarioId, query.limit, query.cursor);
  }
}
