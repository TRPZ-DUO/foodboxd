import { Body, Controller, Post } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePratoDto } from '../dto/create-prato.dto';
import { CreatePratoCommand } from '../commands/create-prato/create-prato.command';

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
}
