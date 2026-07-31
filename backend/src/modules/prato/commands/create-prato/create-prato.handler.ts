import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePratoCommand } from './create-prato.command';
import { PratoRepository } from '../../repositories/prato.repository';
import { Prato } from '../../entities/prato.entity';

@CommandHandler(CreatePratoCommand)
export class CreatePratoHandler implements ICommandHandler<CreatePratoCommand> {
  constructor(private readonly repository: PratoRepository) {}

  async execute(command: CreatePratoCommand): Promise<Prato> {
    const prato = new Prato(
      crypto.randomUUID(),
      command.data.nome,
      command.data.descricao,
      command.data.imagemUrl,
      0,
      command.data.restauranteId,
    );
    return this.repository.create(prato);
  }
}
