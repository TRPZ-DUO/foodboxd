export class CreateAvaliacaoDto {
  public nota!: number;
  public descricao!: string | null;
  public readonly pratoId!: string;
  public readonly usuarioId!: string;
}
