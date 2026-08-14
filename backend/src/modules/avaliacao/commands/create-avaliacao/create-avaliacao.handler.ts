import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateAvaliacaoCommand } from './create-avaliacao.command';
import { AvaliacoesRepository } from '../../repositories/avaliacoes.repository';
import { Avaliacao } from '../../entities/avaliacao.entity';
import { ConflictException } from '@nestjs/common';
import { AvaliacaoCriadaEvent } from '../../events/avaliacao-criada.event';

@CommandHandler(CreateAvaliacaoCommand)
export class CreateAvaliacaoHandler implements ICommandHandler<CreateAvaliacaoCommand> {
  constructor(
    private readonly repository: AvaliacoesRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateAvaliacaoCommand): Promise<Avaliacao> {
    const exists = await this.repository.existsAvaliacao(
      command.usuarioId,
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
      command.usuarioId,
    );

    const criado = await this.repository.create(avaliacao);

    this.eventBus.publish(
      new AvaliacaoCriadaEvent(avaliacao.id, avaliacao.usuarioId),
    );

    return criado;
  }
}
