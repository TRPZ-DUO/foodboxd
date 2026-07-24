import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RestauranteRepository } from '../../repositories/restaurante.repository';
import { Restaurante } from '../../entities/restaurante.entity';
import { CreateRestauranteCommand } from './create-restaurante.command';

@CommandHandler(CreateRestauranteCommand)
export class CreateRestauranteHandler implements ICommandHandler<CreateRestauranteCommand> {
  constructor(private readonly repository: RestauranteRepository) {}

  async execute(command: CreateRestauranteCommand): Promise<any> {
    const restaurante = new Restaurante(
      crypto.randomUUID(),
      command.data.nome,
      command.data.descricao,
      command.data.endereco,
      command.data.cidade,
      command.data.estado,
      command.data.latitude,
      command.data.longitude,
      command.data.categoriaId,
    );

    return this.repository.create(restaurante);
  }
}
