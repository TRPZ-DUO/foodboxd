import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteListaCommand } from './delete-lista.command';
import { ListaRepository } from '../../repositories/lista.repository';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteListaCommand)
export class DeleteListaHandler implements ICommandHandler<DeleteListaCommand> {
  constructor(private readonly repository: ListaRepository) {}

  async execute(command: DeleteListaCommand): Promise<void> {
    const lista = await this.repository.findById(command.id);

    if (!lista) {
      throw new NotFoundException('Lista não encontrada');
    }

    if (lista.usuarioId !== command.usuarioId) {
      throw new ForbiddenException();
    }

    return this.repository.delete(lista.id);
  }
}
