export class CreateSeguidorCommand {
  constructor(
    public readonly usuarioId: string,
    public readonly seguidoId: string,
  ) {}
}
