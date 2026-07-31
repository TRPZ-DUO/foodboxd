import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TagController } from './controllers/tag.controller';
import { PrismaTagRepository } from './repositories/prisma-tag.repository';
import { TagRepository } from './repositories/tag.repository';
import { CreateTagHandler } from './commands/create-tag/create-tag.handler';
import { DeleteTagHandler } from './commands/delete-tag/delete.tag.handler';
import { UpdateTagHandler } from './commands/update-tag/update-tag.handler';
import { GetAllTagsHandler } from './queries/get-all-tags/get-all-tags.handler';
import { GetTagByIdHandler } from './queries/get-tag-by-id/get-tag-by-id.handler';

@Module({
  imports: [CqrsModule],
  controllers: [TagController],
  providers: [
    PrismaTagRepository,

    {
      provide: TagRepository,
      useClass: PrismaTagRepository,
    },

    CreateTagHandler,
    DeleteTagHandler,
    UpdateTagHandler,

    GetAllTagsHandler,
    GetTagByIdHandler,
  ],
})
export class TagModule {}
