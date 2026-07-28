import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePratoDto } from '../dto/create-prato.dto';
import { CreatePratoCommand } from '../commands/create-prato/create-prato.command';
import { GetPratoByIdQuery } from '../queries/get-prato-by-id/get-prato-by-id.query';
import { DeletePratoCommand } from '../commands/delete-prato/delete-prato.command';
import { AddTagCommand } from '../commands/add-tag/add-tag.command';
import { RemoveTagCommand } from '../commands/remove-tag/remove-tag.command';
import { UpdatePratoDto } from '../dto/update-prato.dto';
import { UpdatePratoCommand } from '../commands/update-prato/update-prato.command';
import { GetAllPratosQuery } from '../queries/get-all-pratos/get-all-pratos.query';
import { SearchPratoDto } from '../dto/search-prato-dto';
import { SearchPratoQuery } from '../queries/search-prato/search-prato.query';

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

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePratoDto) {
    return this.commandBus.execute(new UpdatePratoCommand(id, dto));
  }

  @Post(':pratoId/tags/:tagId')
  addTag(
    @Param('pratoId', ParseUUIDPipe) pratoId: string,
    @Param('tagId', ParseUUIDPipe) tagId: string,
  ) {
    return this.commandBus.execute(new AddTagCommand(pratoId, tagId));
  }

  @Get()
  search(@Query() filters: SearchPratoDto) {
    return this.queryBus.execute(new SearchPratoQuery(filters));
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetAllPratosQuery());
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
