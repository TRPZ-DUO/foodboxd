export class CurtidaComentario {
  constructor(
    public readonly id: string,
    public criadoEm: Date,
    public readonly comentarioId: string,
    public readonly usuarioId: string,
  ) {}
}
