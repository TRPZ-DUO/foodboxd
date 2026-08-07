import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateComentarioCommand } from './create-comentario.command';
import { ComentarioRepository } from '../../repositories/comentario.repository';
import { Comentario } from '../../entities/comentario.entity';

@CommandHandler(CreateComentarioCommand)
export class CreateComentarioHandler implements ICommandHandler<CreateComentarioCommand> {
  constructor(private readonly repository: ComentarioRepository) {}

  async execute(command: CreateComentarioCommand): Promise<Comentario> {
    const comentario = new Comentario(
      crypto.randomUUID(),
      command.conteudo,
      new Date(),
      new Date(),
      command.avaliacaoId,
      command.usuarioId,
    );

    return this.repository.create(comentario);
  }
}
