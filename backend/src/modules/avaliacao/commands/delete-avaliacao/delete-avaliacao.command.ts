export class DeleteAvaliacaoCommand {
  constructor(
    public readonly id: string,
    public readonly usuarioId: string,
  ) {}
}
