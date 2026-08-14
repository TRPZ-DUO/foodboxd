import { CreateComentarioCommand } from './create-comentario.command';
import { ComentarioRepository } from '../../repositories/comentario.repository';
import { Comentario } from '../../entities/comentario.entity';

import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ComentarioCriadoEvent } from '../../events/comentario-criado.event';

@CommandHandler(CreateComentarioCommand)
export class CreateComentarioHandler implements ICommandHandler<CreateComentarioCommand> {
  constructor(
    private readonly repository: ComentarioRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateComentarioCommand): Promise<Comentario> {
    const comentario = new Comentario(
      crypto.randomUUID(),
      command.conteudo,
      new Date(),
      new Date(),
      command.avaliacaoId,
      command.usuarioId,
    );

    const criado = await this.repository.create(comentario);

    this.eventBus.publish(
      new ComentarioCriadoEvent(criado.id, criado.usuarioId),
    );

    return criado;
  }
}
