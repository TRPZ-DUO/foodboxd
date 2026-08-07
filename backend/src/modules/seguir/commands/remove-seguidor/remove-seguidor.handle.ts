import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveSeguidorCommand } from './remove-seguidor.command';
import { SeguirRepository } from '../../repositories/seguir.repository';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

@CommandHandler(RemoveSeguidorCommand)
export class RemoveSeguidorHandler implements ICommandHandler<RemoveSeguidorCommand> {
  constructor(private readonly repository: SeguirRepository) {}

  async execute(command: RemoveSeguidorCommand): Promise<void> {
    const seguir = await this.repository.findById(command.id);

    if (!seguir) {
      throw new NotFoundException('Seguidor não encontrado');
    }

    if (seguir.seguidorId !== command.usuarioId) {
      throw new ForbiddenException();
    }

    return this.repository.remove(seguir.id);
  }
}
