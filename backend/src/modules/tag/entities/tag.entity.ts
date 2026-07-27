export class Tag {
  constructor(
    public readonly id: string,
    public nome: string,
  ) {}

  atualizar(data: Partial<Omit<Tag, 'id'>>) {
    Object.assign(
      this,
      Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined),
      ),
    );
  }
}
