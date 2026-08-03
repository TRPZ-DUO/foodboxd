export class Favorito {
  constructor(
    public readonly id: string,
    public readonly usuarioId: string,
    public readonly pratoId: string,
    public readonly criadoEm: Date,
  ) {}
}
