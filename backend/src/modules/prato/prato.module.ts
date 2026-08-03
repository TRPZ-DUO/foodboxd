import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PratoController } from './controllers/prato.controller';
import { PrismaPratoRepository } from './repositories/prisma-prato.repository';
import { PratoRepository } from './repositories/prato.repository';
import { CreatePratoHandler } from './commands/create-prato/create-prato.handler';
import { DeletePratoHandler } from './commands/delete-prato/delete-prato.handler';
import { GetPratoByIdHandler } from './queries/get-prato-by-id/get-prato-by-id.handler';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [PratoController],
  providers: [
    PrismaPratoRepository,

    {
      provide: PratoRepository,
      useClass: PrismaPratoRepository,
    },

    CreatePratoHandler,
    DeletePratoHandler,

    GetPratoByIdHandler,
  ],
})
export class PratoModule {}
