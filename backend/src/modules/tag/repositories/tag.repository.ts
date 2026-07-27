import { Tag } from '../entities/tag.entity';

export abstract class TagRepository {
  abstract create(tag: Tag): Promise<Tag>;

  abstract findById(id: string): Promise<Tag | null>;

  abstract findAll(): Promise<Tag[]>;

  abstract update(tag: Tag): Promise<Tag>;

  abstract delete(id: string): Promise<void>;
}
