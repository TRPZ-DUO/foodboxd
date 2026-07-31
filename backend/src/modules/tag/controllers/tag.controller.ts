import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTagDto } from '../dto/create-tag-dto';
import { CreateTagCommand } from '../commands/create-tag/create-tag.command';
import { GetTagByIdQuery } from '../queries/get-tag-by-id/get-tag-by-id.query';
import { GetAllTagsQuery } from '../queries/get-all-tags/get-all-tags.query';
import { UpdateTagDto } from '../dto/update-tag-dto';
import { UpdateTagCommand } from '../commands/update-tag/update-tag.command';
import { DeleteTagCommand } from '../commands/delete-tag/delete-tag.command';

@Controller('tags')
export class TagController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  create(@Body() dto: CreateTagDto) {
    return this.commandBus.execute(new CreateTagCommand(dto));
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.queryBus.execute(new GetTagByIdQuery(id));
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetAllTagsQuery());
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, dto: UpdateTagDto) {
    return this.commandBus.execute(new UpdateTagCommand(id, dto));
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.commandBus.execute(new DeleteTagCommand(id));
  }
}
