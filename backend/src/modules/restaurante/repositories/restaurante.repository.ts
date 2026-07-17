import { Restaurante } from '../entities/restaurante.entity';

export abstract class RestauranteRepository {
  abstract create(restaurante: Restaurante): Promise<Restaurante>;

  abstract findByNome(nome: string): Promise<Restaurante | null>;

  abstract findAll(): Promise<Restaurante[]>;
}
