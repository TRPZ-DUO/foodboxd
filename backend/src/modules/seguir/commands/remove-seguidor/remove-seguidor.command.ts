export class RemoveSeguidorCommand {
  constructor(
    public readonly usuarioId: string,
    public readonly id: string,
  ) {}
}
