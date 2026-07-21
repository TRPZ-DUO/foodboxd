import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RestauranteController } from './controllers/restaurante.controller';
import { PrismaRestauranteRepository } from './repositories/prisma-restaurante.repository';
import { RestauranteRepository } from './repositories/restaurante.repository';
import { CreateRestauranteHandler } from './commands/create-restaurante/create-restaurante.handler';
import { GetRestauranteByNomeHandler } from './queries/get-restaurente-by-nome/get-restaurante-by-nome.handler';
import { GetAllRestaurantesHandler } from './queries/get-all-restaurantes/get-all-restaurantes.handler';
import { DeleteRestauranteHandler } from './commands/delete-restaurante/delete-restaurante.handler';
import { UpdateRestauranteHandler } from './commands/update-restaurante/update-restaurante.handler';
import { GetRestauranteByIdHandler } from './queries/get-restaurante-by-id/get-restaurante-by-id.handler';

@Module({
  imports: [CqrsModule],
  controllers: [RestauranteController],
  providers: [
    PrismaRestauranteRepository,

    {
      provide: RestauranteRepository,
      useClass: PrismaRestauranteRepository,
    },

    CreateRestauranteHandler,
    DeleteRestauranteHandler,
    UpdateRestauranteHandler,

    GetRestauranteByNomeHandler,
    GetAllRestaurantesHandler,
    GetRestauranteByIdHandler,
  ],
})
export class RestauranteModule {}
