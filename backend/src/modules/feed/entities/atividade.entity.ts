import { TipoAtividade } from '../../../generated/prisma/enums';

export class Atividade {
  constructor(
    public readonly id: string,
    public readonly tipo: TipoAtividade,
    public readonly usuarioId: string,
    public readonly referenciaId: string,
    public readonly criadoEm: Date,
  ) {}
}
