export class RemoveCurtidaComentarioCommand {
  constructor(
    public readonly usuarioId: string,
    public readonly comentarioId: string,
  ) {}
}
