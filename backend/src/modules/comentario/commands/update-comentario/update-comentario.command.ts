export class UpdateComentarioCommand {
  constructor(
    public readonly comentarioId: string,
    public readonly usuarioId: string,
    public readonly conteudo: string,
  ) {}
}
