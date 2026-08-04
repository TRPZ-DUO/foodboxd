import { Visibilidade } from '../enums/visibilidade.enum';

export class Lista {
  constructor(
    public readonly id: string,
    public titulo: string,
    public descricao: string | null,
    public visibilidade: Visibilidade,
    public criadoEm: Date,

    public readonly usuarioId: string,
  ) {}
}
