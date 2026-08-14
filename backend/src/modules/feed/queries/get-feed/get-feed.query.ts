export class GetFeedQuery {
  constructor(
    public readonly usuarioId: string,
    public readonly limit: number,
    public readonly cursor?: Date,
  ) {}
}
