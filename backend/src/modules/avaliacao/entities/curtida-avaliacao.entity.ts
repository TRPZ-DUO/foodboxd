export class CurtidaAvaliacao {
  constructor(
    public readonly id: string,
    public readonly avaliacaoId: string,
    public readonly usuarioId: string,
    public readonly criadoEm?: Date,
  ) {}
}
