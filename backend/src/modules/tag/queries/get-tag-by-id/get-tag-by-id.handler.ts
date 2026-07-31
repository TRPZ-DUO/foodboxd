import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTagByIdQuery } from './get-tag-by-id.query';
import { TagRepository } from '../../repositories/tag.repository';
import { NotFoundException } from '@nestjs/common';
import { Tag } from '../../entities/tag.entity';

@QueryHandler(GetTagByIdQuery)
export class GetTagByIdHandler implements IQueryHandler<GetTagByIdQuery> {
  constructor(private readonly repository: TagRepository) {}

  async execute(query: GetTagByIdQuery): Promise<Tag | null> {
    const tag = await this.repository.findById(query.id);

    if (!tag) {
      throw new NotFoundException(`Tag não encontrada, id: ${query.id}`);
    }

    return new Tag(tag.id, tag.nome);
  }
}
