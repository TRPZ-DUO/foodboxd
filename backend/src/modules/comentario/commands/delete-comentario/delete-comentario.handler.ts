import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

import { DeleteComentarioCommand } from './delete-comentario.command';
import { ComentarioRepository } from '../../repositories/comentario.repository';

@CommandHandler(DeleteComentarioCommand)
export class DeleteComentarioHandler implements ICommandHandler<DeleteComentarioCommand> {
  constructor(private readonly repository: ComentarioRepository) {}

  async execute(command: DeleteComentarioCommand): Promise<void> {
    const comentario = await this.repository.findById(command.comentarioId);

    if (!comentario) {
      throw new NotFoundException('Comentário não encontrado.');
    }

    if (comentario.usuarioId !== command.usuarioId) {
      throw new ForbiddenException();
    }

    await this.repository.delete(comentario.id);
  }
}
