import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateSeguidorCommand } from './create-seguidor.command';
import { SeguirRepository } from '../../repositories/seguir.repository';
import { Seguidor } from '../../entities/seguidor.entity';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { SeguidorCriadoEvent } from '../../events/seguidor-criado.event';

@CommandHandler(CreateSeguidorCommand)
export class CreateSeguidorHandler implements ICommandHandler<CreateSeguidorCommand> {
  constructor(
    private readonly repository: SeguirRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateSeguidorCommand): Promise<Seguidor> {
    const data = new Seguidor(
      crypto.randomUUID(),
      new Date(),
      command.usuarioId,
      command.seguidoId,
    );

    if (command.usuarioId === command.seguidoId) {
      throw new BadRequestException('Você não pode seguir a si mesmo.');
    }

    const existe = await this.repository.exists(
      command.usuarioId,
      command.seguidoId,
    );

    if (existe) {
      throw new ConflictException('Usuário já seguido.');
    }

    const criado = await this.repository.create(data);

    this.eventBus.publish(
      new SeguidorCriadoEvent(criado.seguidorId, criado.seguidoId),
    );

    return criado;
  }
}
