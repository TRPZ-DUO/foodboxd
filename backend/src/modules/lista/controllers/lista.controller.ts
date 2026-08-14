import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateListaDto } from '../dto/create-lista.dto';
import { UpdateListaDto } from '../dto/update-lista.dto';
import { CreatePratoListaDto } from '../dto/create-prato-lista.dto';
import { UpdatePosicaoListaDto } from '../dto/update-posicao-lista.dto';

import { CreateListaCommand } from '../commands/create-lista/create-lista.command';
import { UpdateListaCommand } from '../commands/update-lista/update-lista.command';
import { DeleteListaCommand } from '../commands/delete-lista/delete-lista.command';
import { CreatePratoListaCommand } from '../commands/create-prato-lista/create-prato-lista.command';
import { DeletePratoListaCommand } from '../commands/delete-prato-lista/delete-prato-lista.command';
import { UpdatePosicaoListaCommand } from '../commands/update-posicao-lista/update-posicao-lista.command';

import { FindListaByIdQuery } from '../queries/find-lista-by-id/find-lista-by-id.query';
import { FindAllListasQuery } from '../queries/find-all-listas/find-all-listas.query';
import { FindItemByIdQuery } from '../queries/find-item-by-id/find-item-by-id.query';
import { FindItensByListaIdQuery } from '../queries/find-itens-by-lista-id/find-itens-by-lista-id.query';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth/jwt-auth.guard';
import type { AutenticacaoRequest } from '../../auth/interfaces/autenticacao-request.interface';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('listas')
export class ListaController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiBearerAuth('JWT-auth')
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateListaDto, @Req() req: AutenticacaoRequest) {
    return this.commandBus.execute(new CreateListaCommand(req.user.id, dto));
  }

  @ApiBearerAuth('JWT-auth')
  @Patch(':listaId')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('listaId', ParseUUIDPipe) listaId: string,
    @Body() dto: UpdateListaDto,
    @Req() req: AutenticacaoRequest,
  ) {
    return this.commandBus.execute(
      new UpdateListaCommand(listaId, req.user.id, dto),
    );
  }

  @ApiBearerAuth('JWT-auth')
  @Delete(':listaId')
  @UseGuards(JwtAuthGuard)
  delete(
    @Param('listaId', ParseUUIDPipe) listaId: string,
    @Req() req: AutenticacaoRequest,
  ) {
    return this.commandBus.execute(
      new DeleteListaCommand(listaId, req.user.id),
    );
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new FindAllListasQuery());
  }

  @Get(':listaId')
  findById(@Param('listaId', ParseUUIDPipe) listaId: string) {
    return this.queryBus.execute(new FindListaByIdQuery(listaId));
  }

  @ApiBearerAuth('JWT-auth')
  @Post(':listaId/itens')
  @UseGuards(JwtAuthGuard)
  addPrato(@Body() dto: CreatePratoListaDto, @Req() req: AutenticacaoRequest) {
    return this.commandBus.execute(
      new CreatePratoListaCommand(req.user.id, dto),
    );
  }

  @Get(':listaId/itens')
  findItens(@Param('listaId', ParseUUIDPipe) listaId: string) {
    return this.queryBus.execute(new FindItensByListaIdQuery(listaId));
  }

  @Get('itens/:itemId')
  findItem(@Param('itemId', ParseUUIDPipe) itemId: string) {
    return this.queryBus.execute(new FindItemByIdQuery(itemId));
  }

  @ApiBearerAuth('JWT-auth')
  @Patch('itens/:itemId')
  @UseGuards(JwtAuthGuard)
  updatePosicao(
    @Param('itemId', ParseUUIDPipe) itemId: string,
    @Body() dto: UpdatePosicaoListaDto,
    @Req() req: AutenticacaoRequest,
  ) {
    return this.commandBus.execute(
      new UpdatePosicaoListaCommand(itemId, req.user.id, dto),
    );
  }

  @ApiBearerAuth('JWT-auth')
  @Delete('itens/:itemId')
  @UseGuards(JwtAuthGuard)
  removePrato(
    @Param('itemId', ParseUUIDPipe) itemId: string,
    @Req() req: AutenticacaoRequest,
  ) {
    return this.commandBus.execute(
      new DeletePratoListaCommand(itemId, req.user.id),
    );
  }
}
