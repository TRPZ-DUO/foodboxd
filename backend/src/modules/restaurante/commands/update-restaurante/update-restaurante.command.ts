import { UpdateRestauranteDto } from '../../dto/update-restaurante.dto';

export class UpdateRestauranteCommand {
  constructor(
    public readonly id: string,
    public readonly data: Omit<UpdateRestauranteDto, 'id'>,
  ) {}
}
