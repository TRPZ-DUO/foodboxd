import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRestauranteCommand } from './delete-restaurante.command';
import { RestauranteRepository } from '../../repositories/restaurante.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteRestauranteCommand)
export class DeleteRestauranteHandler implements ICommandHandler<DeleteRestauranteCommand> {
  constructor(private readonly repository: RestauranteRepository) {}

  async execute(command: DeleteRestauranteCommand): Promise<void> {
    const restaurante = await this.repository.findById(command.id);

    if (!restaurante) {
      throw new NotFoundException('Restaurante não encontrado');
    }

    return this.repository.delete(restaurante.id);
  }
}
