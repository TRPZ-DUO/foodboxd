import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddCurtidaComentarioCommand } from './add-curtida-comentario.command';
import { ComentarioRepository } from '../../repositories/comentario.repository';
import { CurtidaComentario } from '../../entities/curtida-comentario.entity';
import { ConflictException } from '@nestjs/common';

@CommandHandler(AddCurtidaComentarioCommand)
export class AddCurtidaComentarioHandler implements ICommandHandler<AddCurtidaComentarioCommand> {
  constructor(private readonly repository: ComentarioRepository) {}

  async execute(
    command: AddCurtidaComentarioCommand,
  ): Promise<CurtidaComentario> {
    const existe = await this.repository.existsCurtida(
      command.usuarioId,
      command.comentarioId,
    );

    if (existe) {
      throw new ConflictException('Comentário já curtido.');
    }

    const curtida = new CurtidaComentario(
      crypto.randomUUID(),
      new Date(),
      command.comentarioId,
      command.usuarioId,
    );

    return this.repository.addCurtida(curtida);
  }
}
