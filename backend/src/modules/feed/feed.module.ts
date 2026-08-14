import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FeedController } from './controllers/feed.controller';
import { FeedService } from './services/feed.service';
import { PrismaFeedRepository } from './repositories/prisma-feed.repository';
import { FeedRepository } from './repositories/feed.repository';
import { GetFeedHandler } from './queries/get-feed/get-feed.handler';
import { GetFeedByUsuarioHandler } from './queries/get-feed-by-usuario/get-feed-by-usuario.handler';
import { ComentarioCriadoEventHandler } from './events/comentario-criado.event.handler';
import { AvaliacaoCriadaEventHandler } from './events/avaliacao-criada.event.handler';
import { FavoritoAdicionadoEventHandler } from './events/favorito-adicionado.event.handler';
import { ListaCriadaEventHandler } from './events/lista-criada.event.handler';
import { SeguidorCriadoEventHandler } from './events/seguidor-criado.handler';

@Module({
  imports: [CqrsModule],
  controllers: [FeedController],
  providers: [
    FeedService,
    PrismaFeedRepository,

    {
      provide: FeedRepository,
      useClass: PrismaFeedRepository,
    },

    AvaliacaoCriadaEventHandler,
    ComentarioCriadoEventHandler,
    FavoritoAdicionadoEventHandler,
    ListaCriadaEventHandler,
    SeguidorCriadoEventHandler,

    GetFeedHandler,
    GetFeedByUsuarioHandler,
  ],
})
export class FeedModule {}
