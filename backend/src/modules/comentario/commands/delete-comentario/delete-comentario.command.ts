export class DeleteComentarioCommand {
  constructor(
    public readonly comentarioId: string,
    public readonly usuarioId: string,
  ) {}
}
