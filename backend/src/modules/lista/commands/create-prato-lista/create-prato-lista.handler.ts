import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePratoListaCommand } from './create-prato-lista.command';
import { ListaRepository } from '../../repositories/lista.repository';
import { ItemLista } from '../../entities/item-lista.entity';
import { ConflictException } from '@nestjs/common';

@CommandHandler(CreatePratoListaCommand)
export class CreatePratoListaHandler implements ICommandHandler<CreatePratoListaCommand> {
  constructor(private readonly repository: ListaRepository) {}

  async execute(command: CreatePratoListaCommand): Promise<ItemLista> {
    const existe = await this.repository.existsPratoNaLista(
      command.data.listaId,
      command.data.pratoId,
    );

    if (existe) {
      throw new ConflictException('Este prato já está presente na lista.');
    }

    const itemLista = new ItemLista(
      crypto.randomUUID(),
      command.data.posicao,
      command.data.pratoId,
      command.data.listaId,
    );

    return this.repository.addPrato(itemLista);
  }
}
