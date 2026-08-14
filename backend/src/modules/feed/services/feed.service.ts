import { Injectable } from '@nestjs/common';
import { FeedRepository } from '../repositories/feed.repository';
import { TipoAtividade } from '../../../generated/prisma/enums';
import { Atividade } from '../entities/atividade.entity';

@Injectable()
export class FeedService {
  constructor(private readonly repository: FeedRepository) {}

  async registrar(
    tipo: TipoAtividade,
    usuarioId: string,
    referenciaId: string,
  ): Promise<Atividade> {
    const atividade = new Atividade(
      crypto.randomUUID(),
      tipo,
      usuarioId,
      referenciaId,
      new Date(),
    );

    return this.repository.create(atividade);
  }
}
