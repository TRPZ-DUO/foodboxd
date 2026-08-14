import { Atividade } from '../entities/atividade.entity';

export abstract class FeedRepository {
  abstract create(atividade: Atividade): Promise<Atividade>;

  abstract findFeed(
    usuarioId: string,
    limit: number,
    cursor?: Date,
  ): Promise<Atividade[]>;

  abstract findAtividadesByUsuario(
    usuarioId: string,
    limit: number,
    cursor?: Date,
  ): Promise<Atividade[]>;
}
