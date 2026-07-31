import { UpdateAvaliacaoDto } from '../../dto/update-avaliacao.dto';

export class UpdateAvaliacaoCommand {
  constructor(
    public readonly id: string,
    public readonly usuarioId: string,
    public readonly data: UpdateAvaliacaoDto,
  ) {}
}
