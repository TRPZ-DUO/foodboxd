export class FavoritoAdicionadoEvent {
  constructor(
    public readonly pratoId: string,
    public readonly usuarioId: string,
  ) {}
}
