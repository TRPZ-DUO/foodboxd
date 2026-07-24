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

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.queryBus.execute(new GetPratoByIdQuery(id));
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.commandBus.execute(new DeletePratoCommand(id));
  }
}
