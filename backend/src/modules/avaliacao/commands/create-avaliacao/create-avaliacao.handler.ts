import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAvaliacaoCommand } from './create-avaliacao.command';
import { AvaliacoesRepository } from '../../repositories/avaliacoes.repository';
import { Avaliacao } from '../../entities/avaliacao.entity';
import { ConflictException } from '@nestjs/common';

@CommandHandler(CreateAvaliacaoCommand)
export class CreateAvaliacaoHandler implements ICommandHandler<CreateAvaliacaoCommand> {
  constructor(private readonly repository: AvaliacoesRepository) {}

  async execute(command: CreateAvaliacaoCommand): Promise<Avaliacao> {
    const exists = await this.repository.existsAvaliacao(
      command.data.usuarioId,
      command.data.pratoId,
    );

    if (exists) {
      throw new ConflictException('Você já avaliou este prato');
    }

    const avaliacao = new Avaliacao(
      crypto.randomUUID(),
      Number(command.data.nota),
      command.data.descricao,
      command.data.pratoId,
      command.data.usuarioId,
    );

    return this.repository.create(avaliacao);
  }
}
