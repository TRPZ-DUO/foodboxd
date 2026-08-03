export class CreateFavoritoCommand {
  constructor(
    public readonly usuarioId: string,
    public readonly pratoId: string,
  ) {}
}
