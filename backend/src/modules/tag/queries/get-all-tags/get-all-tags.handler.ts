import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllTagsQuery } from './get-all-tags.query';
import { TagRepository } from '../../repositories/tag.repository';
import { Tag } from '../../entities/tag.entity';

@QueryHandler(GetAllTagsQuery)
export class GetAllTagsHandler implements IQueryHandler<GetAllTagsQuery> {
  constructor(private readonly repository: TagRepository) {}

  async execute(): Promise<Tag[]> {
    return this.repository.findAll();
  }
}
