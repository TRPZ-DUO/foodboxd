import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AvaliacaoCriadaEvent } from '../../avaliacao/events/avaliacao-criada.event';
import { FeedService } from '../services/feed.service';
import { TipoAtividade } from '../../../generated/prisma/enums';

@EventsHandler(AvaliacaoCriadaEvent)
export class AvaliacaoCriadaEventHandler implements IEventHandler<AvaliacaoCriadaEvent> {
  constructor(private readonly feedService: FeedService) {}

  async handle(event: AvaliacaoCriadaEvent): Promise<void> {
    await this.feedService.registrar(
      TipoAtividade.AVALIACAO_CRIADA,
      event.usuarioId,
      event.avaliacaoId,
    );
  }
}
