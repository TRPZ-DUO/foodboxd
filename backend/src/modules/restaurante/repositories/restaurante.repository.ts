import { Restaurante } from '../entities/restaurante.entity';

export abstract class RestauranteRepository {
  abstract create(restaurante: Restaurante): Promise<Restaurante>;

  abstract findByNome(nome: string): Promise<Restaurante | null>;

  abstract findById(id: string): Promise<Restaurante | null>;

  abstract findAll(): Promise<Restaurante[]>;

  abstract update(restaurante: Restaurante): Promise<Restaurante>;

  abstract delete(id: string): Promise<void>;
}
