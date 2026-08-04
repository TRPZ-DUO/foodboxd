import { UpdatePosicaoListaDto } from '../../dto/update-posicao-lista.dto';

export class UpdatePosicaoListaCommand {
  constructor(
    public readonly id: string,
    public readonly data: UpdatePosicaoListaDto,
  ) {}
}
