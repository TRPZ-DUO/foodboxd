import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateAvaliacaoDto } from '../dto/create-avaliacao.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAvaliacaoCommand } from '../commands/create-avaliacao/create-avaliacao.command';
import { DeleteAvaliacaoCommand } from '../commands/delete-avaliacao/delete-avaliacao.command';

@Controller('avaliacoes')
export class AvaliacaoController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  create(@Body() avaliacao: CreateAvaliacaoDto) {
    return this.commandBus.execute(new CreateAvaliacaoCommand(avaliacao));
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.commandBus.execute(new DeleteAvaliacaoCommand(id));
  }
}
