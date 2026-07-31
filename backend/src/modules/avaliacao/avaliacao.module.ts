import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AvaliacaoController } from './controllers/avaliacao.controller';
import { PrismaAvaliacoesRepository } from './repositories/prisma-avaliacoes.repository';
import { AvaliacoesRepository } from './repositories/avaliacoes.repository';
import { AddCurtidaHandler } from './commands/add-curtida/add-curtida-handler';
import { AddFotoHandler } from './commands/add-foto/add-foto-handler';
import { CreateAvaliacaoHandler } from './commands/create-avaliacao/create-avaliacao.handler';
import { DeleteAvaliacaoHandler } from './commands/delete-avaliacao/delete-avaliacao.handler';
import { RemoveCurtidaHandler } from './commands/remove-curtida/remove-curtida.handler';
import { RemoveFotoHandler } from './commands/remove-foto/remove-foto.handler';
import { UpdateAvaliacaoHandler } from './commands/update-avaliacao/update-avaliacao.handler';
import { GetAllAvaliacoesHandler } from './queries/get-all-avaliacoes/get-all-avaliacoes.handler';
import { GetAllAvaliacoesByUserHandler } from './queries/get-all-avaliacoes-by-user/get-all-avaliacoes-by-user.handler';
import { GetAllFotosByAvaliacaoHandler } from './queries/get-all-fotos-by-avaliacao/get-all-fotos-by-avaliacao.handler';
import { GetAvaliacaoByIdHandler } from './queries/get-avaliacao-by-id/get-avaliacao-by-id.handler';

@Module({
  imports: [CqrsModule],
  controllers: [AvaliacaoController],
  providers: [
    PrismaAvaliacoesRepository,

    {
      provide: AvaliacoesRepository,
      useClass: PrismaAvaliacoesRepository,
    },

    AddCurtidaHandler,
    AddFotoHandler,
    CreateAvaliacaoHandler,
    DeleteAvaliacaoHandler,
    RemoveCurtidaHandler,
    RemoveFotoHandler,
    UpdateAvaliacaoHandler,

    GetAllAvaliacoesHandler,
    GetAllAvaliacoesByUserHandler,
    GetAllFotosByAvaliacaoHandler,
    GetAvaliacaoByIdHandler,
  ],
})
export class AvaliacaoModule {}
