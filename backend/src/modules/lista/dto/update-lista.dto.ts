import { Visibilidade } from '../../../generated/prisma/enums';

export class UpdateListaDto {
  titulo?: string;
  descricao?: string;
  visibilidade?: Visibilidade;
  usuarioId?: string;
}
