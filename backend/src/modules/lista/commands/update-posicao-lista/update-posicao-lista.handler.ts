import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePosicaoListaCommand } from './update-posicao-lista.command';
import { ListaRepository } from '../../repositories/lista.repository';
import { ItemLista } from '../../entities/item-lista.entity';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

@CommandHandler(UpdatePosicaoListaCommand)
export class UpdatePosicaoListaHandler implements ICommandHandler<UpdatePosicaoListaCommand> {
  constructor(private readonly repository: ListaRepository) {}

  async execute(command: UpdatePosicaoListaCommand): Promise<ItemLista> {
    const item = await this.repository.findItemById(command.id);

    if (!item) {
      throw new NotFoundException('Item não encontrado na lista.');
    }

    const lista = await this.repository.findById(item.listaId);

    if (!lista) {
      throw new NotFoundException('Lista não encontrada.');
    }

    if (lista.usuarioId !== command.usuarioId) {
      throw new ForbiddenException();
    }

    const novaPosicao = command.data.posicao ?? item.posicao;

    return this.repository.updatePosicao(item.id, item.listaId, novaPosicao);
  }
}
