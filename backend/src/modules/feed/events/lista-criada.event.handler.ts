import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ListaCriadaEvent } from '../../lista/events/lista-criada.event';
import { FeedService } from '../services/feed.service';
import { TipoAtividade } from '../../../generated/prisma/enums';

@EventsHandler(ListaCriadaEvent)
export class ListaCriadaEventHandler implements IEventHandler<ListaCriadaEvent> {
  constructor(private readonly feedService: FeedService) {}

  async handle(event: ListaCriadaEvent): Promise<void> {
    await this.feedService.registrar(
      TipoAtividade.LISTA_CRIADA,
      event.usuarioId,
      event.listaId,
    );
  }
}
