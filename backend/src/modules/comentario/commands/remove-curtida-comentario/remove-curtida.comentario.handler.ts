import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveCurtidaComentarioCommand } from './remove-curtida-comentario.command';
import { ComentarioRepository } from '../../repositories/comentario.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(RemoveCurtidaComentarioCommand)
export class RemoveCurtidaComentarioHandler implements ICommandHandler<RemoveCurtidaComentarioCommand> {
  constructor(private readonly repository: ComentarioRepository) {}

  async execute(command: RemoveCurtidaComentarioCommand): Promise<any> {
    const existe = await this.repository.existsCurtida(
      command.usuarioId,
      command.comentarioId,
    );

    if (!existe) {
      throw new NotFoundException('Curtida não encontrada');
    }

    await this.repository.removeCurtida(
      command.usuarioId,
      command.comentarioId,
    );
  }
}
