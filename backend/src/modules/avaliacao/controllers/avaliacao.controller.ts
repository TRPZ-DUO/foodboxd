import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateAvaliacaoDto } from '../dto/create-avaliacao.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAvaliacaoCommand } from '../commands/create-avaliacao/create-avaliacao.command';
import { DeleteAvaliacaoCommand } from '../commands/delete-avaliacao/delete-avaliacao.command';
import { UpdateAvaliacaoDto } from '../dto/update-avaliacao.dto';
import { UpdateAvaliacaoCommand } from '../commands/update-avaliacao/update-avaliacao.command';

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

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAvaliacaoDto,
  ) {
    return this.commandBus.execute(new UpdateAvaliacaoCommand(id, dto));
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.commandBus.execute(new DeleteAvaliacaoCommand(id));
  }
}
