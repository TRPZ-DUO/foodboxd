import { Injectable } from '@nestjs/common';
import { Tag } from '../entities/tag.entity';
import { TagRepository } from './tag.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrismaTagRepository implements TagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(tag: Tag): Promise<Tag> {
    const data = await this.prisma.tag.create({
      data: {
        id: tag.id,
        nome: tag.nome,
      },
    });

    return new Tag(data.id, data.nome);
  }

  async findById(id: string): Promise<Tag | null> {
    const tag = await this.prisma.tag.findUnique({ where: { id } });

    if (!tag) {
      return null;
    }

    return new Tag(tag.id, tag.nome);
  }

  async findAll(): Promise<Tag[]> {
    const tags = await this.prisma.tag.findMany();

    return tags.map((tags) => new Tag(tags.id, tags.nome));
  }

  async update(tag: Tag): Promise<Tag> {
    const data = await this.prisma.tag.update({
      where: {
        id: tag.id,
      },
      data: {
        id: tag.id,
        nome: tag.nome,
      },
    });
    return new Tag(data.id, data.nome);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.tag.delete({ where: { id } });
  }
}
