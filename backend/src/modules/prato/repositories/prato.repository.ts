import { Prato } from '../entities/prato.entity';

export abstract class PratoRepository {
  abstract create(prato: Prato): Promise<Prato>;

  abstract delete(id: string): Promise<void | null>;

  abstract findById(id: string): Promise<Prato | null>;
}
