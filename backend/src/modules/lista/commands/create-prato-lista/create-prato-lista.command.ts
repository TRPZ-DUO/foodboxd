import { CreatePratoListaDto } from '../../dto/create-prato-lista.dto';

export class CreatePratoListaCommand {
  constructor(
    public readonly usuarioId: string,
    public readonly data: CreatePratoListaDto,
  ) {}
}
