import { Visibilidade } from '../../../generated/prisma/enums';

export class Lista {
  constructor(
    public readonly id: string,
    public titulo: string,
    public descricao: string | null,
    public visibilidade: Visibilidade,
    public criadoEm: Date,

    public readonly usuarioId: string,
  ) {}

  atualizar(data: Partial<Omit<Lista, 'id'>>) {
    Object.assign(
      this,
      Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined),
      ),
    );
  }
}
