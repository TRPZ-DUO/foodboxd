import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { FavoritoAdicionadoEvent } from '../../favorito/events/favorito-adicionado.event';
import { FeedService } from '../services/feed.service';
import { TipoAtividade } from '../../../generated/prisma/enums';

@EventsHandler(FavoritoAdicionadoEvent)
export class FavoritoAdicionadoEventHandler implements IEventHandler<FavoritoAdicionadoEvent> {
  constructor(private readonly feedService: FeedService) {}

  async handle(event: FavoritoAdicionadoEvent): Promise<void> {
    await this.feedService.registrar(
      TipoAtividade.FAVORITO_ADICIONADO,
      event.usuarioId,
      event.pratoId,
    );
  }
}
