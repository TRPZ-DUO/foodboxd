export class Restaurante {
  constructor(
    public readonly id: string,
    public nome: string,
    public descricao: string | null,
    public endereco: string,
    public cidade: string,
    public estado: string,
    public latitude: number | null,
    public longitude: number | null,
    public categoriaId: string,
  ) {}
}
