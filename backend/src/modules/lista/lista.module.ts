import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '../../prisma/prisma.module';
import { ListaController } from './controllers/lista.controller';
import { PrismaListaRepository } from './repositories/prisma-lista.repository';
import { ListaRepository } from './repositories/lista.repository';
import { CreateListaHandler } from './commands/create-lista/create-lista.handler';
import { CreatePratoListaHandler } from './commands/create-prato-lista/create-prato-lista.handler';
import { DeleteListaHandler } from './commands/delete-lista/delete-lista.handler';
import { DeletePratoListaHandler } from './commands/delete-prato-lista/delete-prato-lista.handler';
import { UpdateListaHandler } from './commands/update-lista/update-lista.handler';
import { UpdatePosicaoListaHandler } from './commands/update-posicao-lista/update-posicao-lista.handler';
import { FindAllListasHandler } from './queries/find-all-listas/find-all-listas.handler';
import { FindItemByIdHandler } from './queries/find-item-by-id/find-item-by-id.handler';
import { FindItensByListaIdHandler } from './queries/find-itens-by-lista-id/find-itens-by-lista-id.handler';
import { FindListaByIdQuery } from './queries/find-lista-by-id/find-lista-by-id.query';

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [ListaController],
  providers: [
    PrismaListaRepository,

    {
      provide: ListaRepository,
      useClass: PrismaListaRepository,
    },

    CreateListaHandler,
    CreatePratoListaHandler,
    DeleteListaHandler,
    DeletePratoListaHandler,
    UpdateListaHandler,
    UpdatePosicaoListaHandler,

    FindAllListasHandler,
    FindItemByIdHandler,
    FindItensByListaIdHandler,
    FindListaByIdQuery,
  ],
})
export class ListaModule {}
