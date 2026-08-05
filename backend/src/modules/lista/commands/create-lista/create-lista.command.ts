import { CreateListaDto } from '../../dto/create-lista.dto';

export class CreateListaCommand {
  constructor(
    public readonly usuarioId: string,
    public readonly data: CreateListaDto,
  ) {}
}
