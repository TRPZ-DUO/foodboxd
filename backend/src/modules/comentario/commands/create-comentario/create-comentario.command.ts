export class CreateComentarioCommand {
  constructor(
    public readonly usuarioId: string,
    public readonly avaliacaoId: string,
    public readonly conteudo: string,
  ) {}
}
