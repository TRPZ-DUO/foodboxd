export class UpdateCategoriaCommand {
  constructor(
    public readonly id: string,
    public readonly nome: string,
  ) {}
}
