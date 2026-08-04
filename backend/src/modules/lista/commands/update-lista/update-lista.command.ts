import { UpdateListaDto } from '../../dto/update-lista.dto';

export class UpdateListaCommand {
  constructor(
    public readonly listaId: string,
    public readonly data: UpdateListaDto,
  ) {}
}
