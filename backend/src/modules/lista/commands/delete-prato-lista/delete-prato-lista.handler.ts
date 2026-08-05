import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePratoListaCommand } from './delete-prato-lista.command';
import { ListaRepository } from '../../repositories/lista.repository';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

@CommandHandler(DeletePratoListaCommand)
export class DeletePratoListaHandler implements ICommandHandler<DeletePratoListaCommand> {
  constructor(private readonly repository: ListaRepository) {}

  async execute(command: DeletePratoListaCommand): Promise<void> {
    const item = await this.repository.findItemById(command.id);

    if (!item) {
      throw new NotFoundException('Item não encontrado.');
    }

    const lista = await this.repository.findById(item.listaId);

    if (!lista) {
      throw new NotFoundException('Lista não encontrada.');
    }

    if (lista.usuarioId !== command.usuarioId) {
      throw new ForbiddenException();
    }

    await this.repository.removePrato(item.id);
  }
}
