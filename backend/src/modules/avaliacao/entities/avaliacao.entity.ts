export class Avaliacao {
  constructor(
    public readonly id: string,
    public nota: number,
    public descricao: string | null,
    public readonly pratoId: string,
    public readonly usuarioId: string,
    public readonly criadoEm?: Date,
    public readonly atualizadoEm?: Date,
  ) {}

  atualizar(data: Partial<Pick<Avaliacao, 'nota' | 'descricao'>>) {
    Object.assign(
      this,
      Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined),
      ),
    );
  }
}
