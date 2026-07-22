import { SearchRestauranteDto } from '../dto/search-restaurante.dto';
import { Restaurante } from '../entities/restaurante.entity';

export abstract class RestauranteRepository {
  abstract create(restaurante: Restaurante): Promise<Restaurante>;

  abstract findById(id: string): Promise<Restaurante | null>;

  abstract findAll(): Promise<Restaurante[]>;

  abstract update(restaurante: Restaurante): Promise<Restaurante>;

  abstract delete(id: string): Promise<void>;

  abstract search(filters: SearchRestauranteDto): Promise<Restaurante[]>;
}
