import { Categoria } from '../entities/categoria.entity';

export abstract class CategoriaRepository {
  abstract create(categoria: Categoria): Promise<Categoria>;

  abstract findByNome(nome: string): Promise<Categoria | null>;

  abstract findAll(): Promise<Categoria[]>;

  abstract update(categoria: Categoria): Promise<Categoria>;

  abstract findById(id: string): Promise<Categoria | null>;

  abstract delete(id: string): Promise<void>;
}
