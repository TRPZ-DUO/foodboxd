import { Favorito } from '../entities/favorito.entity';

export abstract class FavoritoRepository {
  abstract create(favorito: Favorito): Promise<Favorito>;

  abstract remove(id: string): Promise<void>;

  abstract findById(favoritoId: string): Promise<Favorito | null>;

  abstract findAll(): Promise<Favorito[]>;

  abstract exists(usuarioId: string, pratoId: string): Promise<boolean>;
}
