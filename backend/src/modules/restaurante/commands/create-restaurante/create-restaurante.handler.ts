import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RestauranteRepository } from '../../repositories/restaurante.repository';
import { ConflictException } from '@nestjs/common';
import { Restaurante } from '../../entities/restaurante.entity';
import { CreateRestauranteCommand } from './create-restaurante.command';

@CommandHandler(CreateRestauranteCommand)
export class CreateRestauranteHandler implements ICommandHandler<CreateRestauranteCommand> {
  constructor(private readonly repository: RestauranteRepository) {}

  async execute(command: CreateRestauranteCommand): Promise<any> {
    const existe = await this.repository.findByNome(command.nome);

    if (existe) {
      throw new ConflictException('Restaurante já cadastrado');
    }

    const restaurante = new Restaurante(
      crypto.randomUUID(),
      command.nome,
      command.descricao,
      command.endereco,
      command.cidade,
      command.estado,
      command.latitude,
      command.longitude,
      command.categoriaId,
    );

    return this.repository.create(restaurante);
  }
}
