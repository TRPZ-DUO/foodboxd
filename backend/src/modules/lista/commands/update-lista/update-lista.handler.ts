import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateListaCommand } from './update-lista.command';
import { Lista } from '../../entities/lista.entity';
import { ListaRepository } from '../../repositories/lista.repository';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateListaCommand)
export class UpdateListaHandler implements ICommandHandler<UpdateListaCommand> {
  constructor(private readonly repository: ListaRepository) {}
  async execute(command: UpdateListaCommand): Promise<Lista> {
    const lista = await this.repository.findById(command.id);

    if (!lista) {
      throw new NotFoundException('Lista não encontrada');
    }

    if (lista.usuarioId !== command.usuarioId) {
      throw new ForbiddenException();
    }

    lista.atualizar(command.data);

    return this.repository.update(lista);
  }
}
