import { CreateRestauranteDto } from '../../dto/create-restaurante.dto';

export class CreateRestauranteCommand {
  constructor(public readonly data: CreateRestauranteDto) {}
}
