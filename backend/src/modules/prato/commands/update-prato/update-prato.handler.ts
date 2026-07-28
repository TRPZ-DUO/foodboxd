import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePratoCommand } from './update-prato.command';
import { PratoRepository } from '../../repositories/prato.repository';
import { Prato } from '../../entities/prato.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdatePratoCommand)
export class UpdatePratoHandler implements ICommandHandler<UpdatePratoCommand> {
  constructor(private readonly repository: PratoRepository) {}

  async execute(command: UpdatePratoCommand): Promise<Prato> {
    const prato = await this.repository.findById(command.id);

    if (!prato) {
      throw new NotFoundException(`Prato não encontrado, id: ${command.id}`);
    }

    prato.atualizar(command.data);

    return this.repository.update(prato);
  }
}
