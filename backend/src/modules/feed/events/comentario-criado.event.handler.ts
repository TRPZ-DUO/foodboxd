import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ComentarioCriadoEvent } from '../../comentario/events/comentario-criado.event';
import { FeedService } from '../services/feed.service';
import { TipoAtividade } from '../../../generated/prisma/enums';

@EventsHandler(ComentarioCriadoEvent)
export class ComentarioCriadoEventHandler implements IEventHandler<ComentarioCriadoEvent> {
  constructor(private readonly feedService: FeedService) {}

  async handle(event: ComentarioCriadoEvent): Promise<void> {
    await this.feedService.registrar(
      TipoAtividade.COMENTARIO_CRIADO,
      event.usuarioId,
      event.comentarioId,
    );
  }
}
