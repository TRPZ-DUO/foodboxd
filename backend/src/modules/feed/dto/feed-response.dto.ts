import { Atividade } from '../entities/atividade.entity';

export class FeedResponse {
  constructor(
    public readonly items: Atividade[],
    public readonly nextCursor: Date | null,
    public readonly hasNextPage: boolean,
  ) {}
}
