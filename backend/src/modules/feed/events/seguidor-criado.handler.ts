import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SeguidorCriadoEvent } from '../../seguir/events/seguidor-criado.event';
import { FeedService } from '../services/feed.service';
import { TipoAtividade } from '../../../generated/prisma/enums';

@EventsHandler(SeguidorCriadoEvent)
export class SeguidorCriadoEventHandler implements IEventHandler<SeguidorCriadoEvent> {
  constructor(private readonly feedService: FeedService) {}

  async handle(event: SeguidorCriadoEvent): Promise<void> {
    await this.feedService.registrar(
      TipoAtividade.SEGUIDOR_ADICIONADO,
      event.seguidorId,
      event.seguidoId,
    );
  }
}
