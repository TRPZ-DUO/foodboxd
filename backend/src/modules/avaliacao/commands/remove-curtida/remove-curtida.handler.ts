import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveCurtidaCommand } from './remove-curtida.command';
import { AvaliacoesRepository } from '../../repositories/avaliacoes.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(RemoveCurtidaCommand)
export class RemoveCurtidaHandler implements ICommandHandler<RemoveCurtidaCommand> {
  constructor(private readonly repository: AvaliacoesRepository) {}

  async execute(command: RemoveCurtidaCommand): Promise<void> {
    const avaliacao = await this.repository.findById(command.avaliacaoId);

    if (!avaliacao) {
      throw new NotFoundException('Avaliacao não encontrada');
    }

    return this.repository.removeCurtida(
      command.usuarioId,
      command.avaliacaoId,
    );
  }
}
