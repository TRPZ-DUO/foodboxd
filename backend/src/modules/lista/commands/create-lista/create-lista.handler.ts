import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateListaCommand } from './create-lista.command';
import { ListaRepository } from '../../repositories/lista.repository';
import { Lista } from '../../entities/lista.entity';

@CommandHandler(CreateListaCommand)
export class CreateListaHandler implements ICommandHandler<CreateListaCommand> {
  constructor(private readonly repository: ListaRepository) {}

  async execute(command: CreateListaCommand): Promise<Lista> {
    const lista = new Lista(
      crypto.randomUUID(),
      command.data.titulo,
      command.data.descricao,
      command.data.visibilidade,
      new Date(),
      command.usuarioId,
    );

    return await this.repository.create(lista);
  }
}
