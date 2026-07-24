import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PratoRepository } from '../../repositories/prato.repository';
import { NotFoundException } from '@nestjs/common';
import { DeletePratoCommand } from './delete-prato.command';

@CommandHandler(DeletePratoCommand)
export class DeletePratoHandler implements ICommandHandler<DeletePratoCommand> {
  constructor(private readonly repository: PratoRepository) {}

  async execute(command: DeletePratoCommand): Promise<void | null> {
    const prato = await this.repository.findById(command.id);

    if (!prato) {
      throw new NotFoundException('Prato não existe');
    }

    await this.repository.delete(prato.id);
  }
}
