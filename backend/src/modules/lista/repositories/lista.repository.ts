import { ItemLista } from '../entities/item-lista.entity';
import { Lista } from '../entities/lista.entity';

export abstract class ListaRepository {
  abstract create(lista: Lista): Promise<Lista>;

  abstract update(lista: Lista): Promise<Lista>;

  abstract findById(id: string): Promise<Lista | null>;

  abstract findAll(): Promise<Lista[]>;

  abstract delete(id: string): Promise<void>;

  abstract addPrato(item: ItemLista): Promise<ItemLista>;

  abstract removePrato(itemId: string): Promise<void>;

  abstract updatePosicao(
    itemId: string,
    listaId: string,
    posicao: number,
  ): Promise<ItemLista>;

  abstract findItemById(itemId: string): Promise<ItemLista | null>;

  abstract findItensByLista(listaId: string): Promise<ItemLista[]>;

  abstract existsPratoNaLista(
    listaId: string,
    pratoId: string,
  ): Promise<boolean>;
}
