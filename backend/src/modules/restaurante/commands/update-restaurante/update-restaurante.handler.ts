import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRestauranteCommand } from './update-restaurante.command';
import { Restaurante } from '../../entities/restaurante.entity';
import { RestauranteRepository } from '../../repositories/restaurante.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateRestauranteCommand)
export class UpdateRestauranteHandler implements ICommandHandler<UpdateRestauranteCommand> {
  constructor(private readonly repository: RestauranteRepository) {}

  async execute(command: UpdateRestauranteCommand): Promise<Restaurante> {
    const restaurante = await this.repository.findById(command.id);

    if (!restaurante) {
      throw new NotFoundException('Restaurante não encontrado');
    }

    restaurante.atualizar(command.data);

    return this.repository.update(restaurante);
  }
}
