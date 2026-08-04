export class ItemLista {
  constructor(
    public readonly id: string,
    public posicao: number,

    public readonly pratoId: string,
    public readonly listaId: string,
  ) {}

  atualizar(data: Partial<Omit<ItemLista, 'id'>>) {
    Object.assign(
      this,
      Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined),
      ),
    );
  }
}
