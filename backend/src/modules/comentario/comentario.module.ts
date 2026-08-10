import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ComentarioController } from './controllers/comentario.controller';
import { PrismaComentarioRepository } from './repositories/prisma-comentario.repository';
import { ComentarioRepository } from './repositories/comentario.repository';
import { CreateComentarioHandler } from './commands/create-comentario/create-comentario.handler';
import { AddCurtidaComentarioHandler } from './commands/add-curtida-comentario/add-curtida-comentario.handler';
import { DeleteComentarioHandler } from './commands/delete-comentario/delete-comentario.handler';
import { RemoveCurtidaComentarioHandler } from './commands/remove-curtida-comentario/remove-curtida.comentario.handler';
import { UpdateComentarioHandler } from './commands/update-comentario/update-comentario.handler';
import { GetAllComentariosByAvaliacaoHandler } from './queries/get-all-comentarios-by-avaliacao/get-all-comentarios-by-avaliacao.handler';
import { GetAllComentariosByUsuarioHandler } from './queries/get-all-comentarios-by-usuario/get-all-comentarios-by-usuario.handler';
import { GetComentarioByIdHandler } from './queries/get-comentario-by-id/get-comentario-by-id.handler';

@Module({
  imports: [CqrsModule],
  controllers: [ComentarioController],
  providers: [
    PrismaComentarioRepository,

    {
      provide: ComentarioRepository,
      useClass: PrismaComentarioRepository,
    },

    CreateComentarioHandler,
    AddCurtidaComentarioHandler,
    DeleteComentarioHandler,
    RemoveCurtidaComentarioHandler,
    UpdateComentarioHandler,

    GetAllComentariosByAvaliacaoHandler,
    GetAllComentariosByUsuarioHandler,
    GetComentarioByIdHandler,
  ],
})
export class ComentarioModule {}
