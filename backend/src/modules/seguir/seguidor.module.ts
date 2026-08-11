import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '../../prisma/prisma.module';
import { SeguidorController } from './controllers/seguidor.controller';
import { PrismaSeguirRepository } from './repositories/prisma-seguir.repository';
import { SeguirRepository } from './repositories/seguir.repository';
import { CreateSeguidorHandler } from './commands/create-seguidor/create-seguidor.handler';
import { RemoveSeguidorHandler } from './commands/remove-seguidor/remove-seguidor.handle';
import { GetSeguidorByIdHandler } from './queries/get-seguidor-by-id/get-seguidor-by-id-handler';
import { GetSeguidoresHandler } from './queries/get-seguidores/get-seguidores.handler';
import { GetSeguindoHandler } from './queries/get-seguindo/get-seguindo.handler';

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [SeguidorController],
  providers: [
    PrismaSeguirRepository,

    {
      provide: SeguirRepository,
      useClass: PrismaSeguirRepository,
    },

    CreateSeguidorHandler,
    RemoveSeguidorHandler,

    GetSeguidorByIdHandler,
    GetSeguidoresHandler,
    GetSeguindoHandler,
  ],
})
export class SeguidorModule {}
