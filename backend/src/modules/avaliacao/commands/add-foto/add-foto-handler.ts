import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddFotoCommand } from './add-foto-command';
import { AvaliacoesRepository } from '../../repositories/avaliacoes.repository';
import { FotoAvaliacao } from '../../entities/foto-avaliacao.entity';

@CommandHandler(AddFotoCommand)
export class AddFotoHandler implements ICommandHandler<AddFotoCommand> {
  constructor(private readonly repository: AvaliacoesRepository) {}

  async execute(command: AddFotoCommand): Promise<FotoAvaliacao> {
    return this.repository.addFoto(command.avaliacaoId, command.imagemUrl);
  }
}
