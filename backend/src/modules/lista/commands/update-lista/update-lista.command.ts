import { UpdateListaDto } from '../../dto/update-lista.dto';

export class UpdateListaCommand {
  constructor(
    public readonly id: string,
    public readonly usuarioId: string,
    public readonly data: UpdateListaDto,
  ) {}
}
