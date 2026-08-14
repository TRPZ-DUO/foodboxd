import { Atividade } from '../entities/atividade.entity';
import { FeedResult } from '../interfaces/feed-result.interface';

export abstract class FeedRepository {
  abstract create(atividade: Atividade): Promise<Atividade>;

  abstract findFeed(
    usuarioId: string,
    limit: number,
    cursor?: {
      criadoEm: Date;
      id: string;
    },
  ): Promise<FeedResult>;

  abstract findAtividadesByUsuario(
    usuarioId: string,
    limit: number,
    cursor?: {
      criadoEm: Date;
      id: string;
    },
  ): Promise<FeedResult>;
}
