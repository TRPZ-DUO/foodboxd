import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFavoritoCommand } from './create-favorito.command';
import { FavoritoRepository } from '../../repositories/favorito.repository';
import { Favorito } from '../../entities/favorito.entity';
import { ConflictException } from '@nestjs/common';

@CommandHandler(CreateFavoritoCommand)
export class CreateFavoritoHandler implements ICommandHandler<CreateFavoritoCommand> {
  constructor(private readonly repository: FavoritoRepository) {}

  async execute(command: CreateFavoritoCommand): Promise<Favorito> {
    const favoritado = await this.repository.exists(
      command.usuarioId,
      command.pratoId,
    );

    if (favoritado) {
      throw new ConflictException('Prato já favoritado.');
    }

    const data = new Favorito(
      crypto.randomUUID(),
      command.usuarioId,
      command.pratoId,
      new Date(),
    );

    return this.repository.create(data);
  }
}
