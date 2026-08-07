import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSeguidorCommand } from './create-seguidor.command';
import { SeguirRepository } from '../../repositories/seguir.repository';
import { Seguidor } from '../../entities/seguidor.entity';

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

    return this.repository.create(data);
  }
}
