import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PratoController } from './controllers/prato.controller';
import { PrismaPratoRepository } from './repositories/prisma-prato.repository';
import { PratoRepository } from './repositories/prato.repository';
import { CreatePratoHandler } from './commands/create-prato/create-prato.handler';

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
  ],
})
export class PratoModule {}
