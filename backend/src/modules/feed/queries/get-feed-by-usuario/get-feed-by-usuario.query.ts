export class GetFeedByUsuarioQuery {
  constructor(
    public readonly usuarioId: string,
    public readonly limit: number,
    public readonly cursor?: {
      criadoEm: Date;
      id: string;
    },
  ) {}
}
