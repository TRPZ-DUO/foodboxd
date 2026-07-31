export class FotoAvaliacao {
  constructor(
    public readonly id: string,
    public urlImagem: string | null,
    public readonly avaliacaoId: string,
  ) {}
}
