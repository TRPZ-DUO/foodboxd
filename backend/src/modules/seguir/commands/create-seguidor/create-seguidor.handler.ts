import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSeguidorCommand } from './create-seguidor.command';
import { SeguirRepository } from '../../repositories/seguir.repository';
import { Seguidor } from '../../entities/seguidor.entity';
import { BadRequestException, ConflictException } from '@nestjs/common';

@CommandHandler(CreateSeguidorCommand)
export class CreateSeguidorHandler implements ICommandHandler<CreateSeguidorCommand> {
  constructor(private readonly repository: SeguirRepository) {}

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

    return this.repository.create(data);
  }
}
