import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateListaCommand } from './create-lista.command';
import { ListaRepository } from '../../repositories/lista.repository';
import { Lista } from '../../entities/lista.entity';
import { ListaCriadaEvent } from '../../events/lista-criada.event';

@CommandHandler(CreateListaCommand)
export class CreateListaHandler implements ICommandHandler<CreateListaCommand> {
  constructor(
    private readonly repository: ListaRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateListaCommand): Promise<Lista> {
    const lista = new Lista(
      crypto.randomUUID(),
      command.data.titulo,
      command.data.descricao,
      command.data.visibilidade,
      new Date(),
      command.usuarioId,
    );

    const criado = await this.repository.create(lista);

    this.eventBus.publish(new ListaCriadaEvent(criado.id, criado.usuarioId));

    return criado;
  }
}
