import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AvaliacoesRepository } from '../../repositories/avaliacoes.repository';
import { Avaliacao } from '../../entities/avaliacao.entity';
import { UpdateAvaliacaoCommand } from './update-avaliacao.command';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateAvaliacaoCommand)
export class UpdateAvaliacaoHandler implements ICommandHandler<UpdateAvaliacaoCommand> {
  constructor(private readonly repository: AvaliacoesRepository) {}

  async execute(command: UpdateAvaliacaoCommand): Promise<Avaliacao | null> {
    const avaliacao = await this.repository.findById(command.id);

    if (!avaliacao) {
      throw new NotFoundException(
        `Avaliação não encontrada, id: ${command.id}`,
      );
    }

    if (avaliacao.usuarioId !== command.usuarioId) {
      throw new ForbiddenException('Você não pode editar esta avaliação');
    }

    avaliacao.atualizar(command.data);

    return this.repository.update(avaliacao);
  }
}
