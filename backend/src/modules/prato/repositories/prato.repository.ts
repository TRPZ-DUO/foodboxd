import { Prato } from '../entities/prato.entity';

export abstract class PratoRepository {
  abstract create(prato: Prato): Promise<Prato>;
}
