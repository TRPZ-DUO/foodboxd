export class Comentario {
  constructor(
    public readonly id: string,
    public conteudo: string,
    public criadoEm: Date,
    public atualizadoEm: Date,

    public readonly avaliacaoId: string,
    public readonly usuarioId: string,
  ) {}
}
