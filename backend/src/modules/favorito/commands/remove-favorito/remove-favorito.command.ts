export class RemoveFavoritoCommand {
  constructor(
    public readonly id: string,
    public readonly usuarioId: string,
  ) {}
}
