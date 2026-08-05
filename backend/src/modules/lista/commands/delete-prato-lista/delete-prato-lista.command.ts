export class DeletePratoListaCommand {
  constructor(
    public readonly id: string,
    public readonly usuarioId: string,
  ) {}
}
