import { Prato } from '../entities/prato.entity';

export abstract class PratoRepository {
  abstract create(prato: Prato): Promise<Prato>;

  abstract update(prato: Prato): Promise<Prato>;

  abstract delete(id: string): Promise<void | null>;

  abstract findById(id: string): Promise<Prato | null>;

  abstract findAll(): Promise<Prato[]>;

  abstract addTag(pratoId: string, tagId: string): Promise<void>;

  abstract removeTag(pratoId: string, tagId: string): Promise<void>;

  abstract existsTag(pratoId: string, tagId: string): Promise<boolean>;
}
