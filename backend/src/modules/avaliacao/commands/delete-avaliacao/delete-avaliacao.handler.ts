import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAvaliacaoCommand } from './delete-avaliacao.command';
import { AvaliacoesRepository } from '../../repositories/avaliacoes.repository';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteAvaliacaoCommand)
export class DeleteAvaliacaoHandler implements ICommandHandler<DeleteAvaliacaoCommand> {
  constructor(private readonly repository: AvaliacoesRepository) {}

  async execute(command: DeleteAvaliacaoCommand): Promise<void | null> {
    const avaliacao = await this.repository.findById(command.id);

    if (!avaliacao) {
      throw new NotFoundException(
        `Avaliação não encontrada, id: ${command.id}`,
      );
    }

    if (avaliacao.usuarioId !== command.usuarioId) {
      throw new ForbiddenException('Você não pode excluir esta avaliação.');
    }

    return this.repository.delete(avaliacao.id);
  }
}
