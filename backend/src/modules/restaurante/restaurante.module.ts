import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RestauranteController } from './controllers/restaurante.controller';
import { PrismaRestauranteRepository } from './repositories/prisma-restaurante.repository';
import { RestauranteRepository } from './repositories/restaurante.repository';
import { CreateRestauranteHandler } from './commands/create-restaurante.handler';
import { GetRestauranteHandler } from './queries/get-restaurente/get-restaurante.handler';
import { GetRestaurantesHandler } from './queries/get-restaurantes/get-restaurantes.handler';

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [RestauranteController],
  providers: [
    PrismaRestauranteRepository,

    {
      provide: RestauranteRepository,
      useClass: PrismaRestauranteRepository,
    },

    CreateRestauranteHandler,
    GetRestauranteHandler,
    GetRestaurantesHandler,
  ],
})
export class RestauranteModule {}
