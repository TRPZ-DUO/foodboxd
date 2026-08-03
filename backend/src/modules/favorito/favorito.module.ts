import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '../../prisma/prisma.module';
import { FavoritoController } from './controllers/favorito.controller';
import { PrismaFavoritoRepository } from './repositories/prisma-favorito.repository';
import { FavoritoRepository } from './repositories/favorito.repository';
import { CreateFavoritoHandler } from './commands/create-favorito/create-favorito.handler';
import { RemoveFavoritoHandler } from './commands/remove-favorito/remove-favorito.handler';
import { GetFavoritoByIdHandler } from './queries/get-favorito-by-id/get-favorito-by-id.handler';
import { GetAllFavoritosHandler } from './queries/get-all-favoritos/get-all-favoritos.handler';

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [FavoritoController],
  providers: [
    PrismaFavoritoRepository,

    {
      provide: FavoritoRepository,
      useClass: PrismaFavoritoRepository,
    },

    CreateFavoritoHandler,
    RemoveFavoritoHandler,

    GetFavoritoByIdHandler,
    GetAllFavoritosHandler,
  ],
})
export class FavoritoModule {}
