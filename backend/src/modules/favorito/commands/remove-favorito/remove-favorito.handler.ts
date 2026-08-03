import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveFavoritoCommand } from './remove-favorito.command';
import { FavoritoRepository } from '../../repositories/favorito.repository';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

@CommandHandler(RemoveFavoritoCommand)
export class RemoveFavoritoHandler implements ICommandHandler<RemoveFavoritoCommand> {
  constructor(private readonly repository: FavoritoRepository) {}

  async execute(command: RemoveFavoritoCommand): Promise<void> {
    const favorito = await this.repository.findById(command.id);

    if (!favorito) {
      throw new NotFoundException('Favorito não encontrado.');
    }

    if (favorito.usuarioId !== command.usuarioId) {
      throw new ForbiddenException();
    }

    await this.repository.remove(favorito.id);
  }
}
