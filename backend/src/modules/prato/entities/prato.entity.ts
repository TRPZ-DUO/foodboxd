export class Prato {
  constructor(
    public readonly id: string,
    public nome: string,
    public descricao: string | null,
    public imagemUrl: string | null,
    public mediaAvaliacoes: number,
    public readonly restauranteId: string,
  ) {}
}
