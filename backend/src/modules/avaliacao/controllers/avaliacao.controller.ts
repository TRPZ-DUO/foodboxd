import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Get,
} from '@nestjs/common';
import { CreateAvaliacaoDto } from '../dto/create-avaliacao.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAvaliacaoCommand } from '../commands/create-avaliacao/create-avaliacao.command';
import { DeleteAvaliacaoCommand } from '../commands/delete-avaliacao/delete-avaliacao.command';
import { UpdateAvaliacaoDto } from '../dto/update-avaliacao.dto';
import { UpdateAvaliacaoCommand } from '../commands/update-avaliacao/update-avaliacao.command';
import { GetAllAvaliacoesQuery } from '../queries/get-all-avaliacoes/get-all-avaliacoes.query';
import { GetAvaliacaoByIdQuery } from '../queries/get-avaliacao-by-id/get-avaliacao-by-id.query';
import { GetAllAvaliacoesByUserQuery } from '../queries/get-all-avaliacoes-by-user/get-all-avaliacoes-by-user.query';

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

  @Get()
  findAll() {
    return this.queryBus.execute(new GetAllAvaliacoesQuery());
  }

  @Get('usuario/:usuarioId')
  findAllAvaliacoesByUsuario(
    @Param('usuarioId', ParseUUIDPipe) usuarioId: string,
  ) {
    return this.queryBus.execute(new GetAllAvaliacoesByUserQuery(usuarioId));
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.queryBus.execute(new GetAvaliacaoByIdQuery(id));
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.commandBus.execute(new DeleteAvaliacaoCommand(id));
  }
}
