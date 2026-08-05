import { Visibilidade } from '../../../generated/prisma/enums';

export class CreateListaDto {
  titulo!: string;
  descricao!: string;
  visibilidade!: Visibilidade;
}
