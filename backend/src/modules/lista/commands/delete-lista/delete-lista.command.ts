export class DeleteListaCommand {
  constructor(
    public readonly id: string,
    public readonly usuarioId: string,
  ) {}
}
