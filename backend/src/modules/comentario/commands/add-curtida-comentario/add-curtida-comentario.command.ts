export class AddCurtidaComentarioCommand {
  constructor(
    public readonly usuarioId: string,
    public readonly comentarioId: string,
  ) {}
}
