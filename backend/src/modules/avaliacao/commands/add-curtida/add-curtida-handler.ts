import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddCurtidaCommand } from './add-curtida-command';
import { AvaliacoesRepository } from '../../repositories/avaliacoes.repository';
import { CurtidaAvaliacao } from '../../entities/curtida-avaliacao.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';

@CommandHandler(AddCurtidaCommand)
export class AddCurtidaHandler implements ICommandHandler<AddCurtidaCommand> {
  constructor(private readonly repository: AvaliacoesRepository) {}

  async execute(command: AddCurtidaCommand): Promise<CurtidaAvaliacao> {
    const avaliacao = await this.repository.findById(command.avaliacaoId);

    if (!avaliacao) {
      throw new NotFoundException('Avaliacao não encontrada');
    }

    const curtida = await this.repository.existsCurtida(
      command.usuarioId,
      command.avaliacaoId,
    );

    if (curtida) {
      throw new ConflictException('Usuário já curtiu essa avaliação');
    }

    return this.repository.addCurtida(command.usuarioId, command.avaliacaoId);
  }
}
