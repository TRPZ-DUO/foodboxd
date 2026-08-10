import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateComentarioCommand } from './update-comentario.command';
import { ComentarioRepository } from '../../repositories/comentario.repository';
import { Comentario } from '../../entities/comentario.entity';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateComentarioCommand)
export class UpdateComentarioHandler implements ICommandHandler<UpdateComentarioCommand> {
  constructor(private readonly repository: ComentarioRepository) {}

  async execute(command: UpdateComentarioCommand): Promise<Comentario> {
    const comentario = await this.repository.findById(command.comentarioId);

    if (!comentario) {
      throw new NotFoundException('Comentario não encontrado');
    }

    if (comentario.usuarioId !== command.usuarioId) {
      throw new ForbiddenException();
    }

    comentario.atualizar({ conteudo: command.conteudo });

    return this.repository.update(comentario.id, comentario);
  }
}
