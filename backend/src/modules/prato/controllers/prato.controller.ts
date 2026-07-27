import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePratoDto } from '../dto/create-prato.dto';
import { CreatePratoCommand } from '../commands/create-prato/create-prato.command';
import { GetPratoByIdQuery } from '../queries/get-prato-by-id/get-prato-by-id.query';
import { DeletePratoCommand } from '../commands/delete-prato/delete-prato.command';
import { AddTagCommand } from '../commands/add-tag/add-tag.command';
import { RemoveTagCommand } from '../commands/remove-tag/remove-tag.command';

@Controller('pratos')
export class PratoController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  create(@Body() dto: CreatePratoDto) {
    return this.commandBus.execute(new CreatePratoCommand(dto));
  }

  @Post(':pratoId/tags/:tagId')
  addTag(
    @Param('pratoId', ParseUUIDPipe) pratoId: string,
    @Param('tagId', ParseUUIDPipe) tagId: string,
  ) {
    return this.commandBus.execute(new AddTagCommand(pratoId, tagId));
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.queryBus.execute(new GetPratoByIdQuery(id));
  }

  @Delete(':pratoId/tags/:tagId')
  removeTag(
    @Param('pratoId', ParseUUIDPipe) pratoId: string,
    @Param('tagId', ParseUUIDPipe) tagId: string,
  ) {
    return this.commandBus.execute(new RemoveTagCommand(pratoId, tagId));
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.commandBus.execute(new DeletePratoCommand(id));
  }
}
