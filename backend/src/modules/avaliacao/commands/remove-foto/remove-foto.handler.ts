import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveFotoCommand } from './remove-foto.command';
import { AvaliacoesRepository } from '../../repositories/avaliacoes.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(RemoveFotoCommand)
export class RemoveFotoHandler implements ICommandHandler<RemoveFotoCommand> {
  constructor(private readonly repository: AvaliacoesRepository) {}

  async execute(command: RemoveFotoCommand): Promise<any> {
    const foto = await this.repository.findFotoById(command.fotoId);

    if (!foto) {
      throw new NotFoundException('Foto não existe');
    }

    return this.repository.removeFoto(foto.id);
  }
}
