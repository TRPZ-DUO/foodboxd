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

import { CreateComentarioCommand } from '../commands/create-comentario/create-comentario.command';
import { DeleteComentarioCommand } from '../commands/delete-comentario/delete-comentario.command';
import { UpdateComentarioCommand } from '../commands/update-comentario/update-comentario.command';
import { AddCurtidaComentarioCommand } from '../commands/add-curtida-comentario/add-curtida-comentario.command';
import { RemoveCurtidaComentarioCommand } from '../commands/remove-curtida-comentario/remove-curtida-comentario.command';

import { GetComentarioByIdQuery } from '../queries/get-comentario-by-id/get-comentario-by-id.query';
import { GetAllComentariosByAvaliacaoQuery } from '../queries/get-all-comentarios-by-avaliacao/get-all-comentarios-by-avaliacao.query';
import { GetAllComentariosByUsuarioQuery } from '../queries/get-all-comentarios-by-usuario/get-all-comentarios-by-usuario.query';

import { UpdateComentarioDto } from '../dto/update-comentario.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth/jwt-auth.guard';
import type { AutenticacaoRequest } from '../../auth/interfaces/autenticacao-request.interface';
import { CreateComentarioDto } from '../dto/create-comentario.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('comentarios')
export class ComentarioController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiBearerAuth('JWT-auth')
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateComentarioDto, @Req() req: AutenticacaoRequest) {
    return this.commandBus.execute(
      new CreateComentarioCommand(req.user.id, dto.avaliacaoId, dto.conteudo),
    );
  }

  @ApiBearerAuth('JWT-auth')
  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateComentarioDto,
    @Req() req: AutenticacaoRequest,
  ) {
    return this.commandBus.execute(
      new UpdateComentarioCommand(id, req.user.id, dto.conteudo),
    );
  }

  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: AutenticacaoRequest,
  ) {
    return this.commandBus.execute(
      new DeleteComentarioCommand(id, req.user.id),
    );
  }

  @ApiBearerAuth('JWT-auth')
  @Post(':comentarioId/curtidas')
  @UseGuards(JwtAuthGuard)
  addCurtida(
    @Param('comentarioId', ParseUUIDPipe) comentarioId: string,
    @Req() req: AutenticacaoRequest,
  ) {
    return this.commandBus.execute(
      new AddCurtidaComentarioCommand(req.user.id, comentarioId),
    );
  }

  @ApiBearerAuth('JWT-auth')
  @Delete(':comentarioId/curtidas')
  @UseGuards(JwtAuthGuard)
  removeCurtida(
    @Param('comentarioId', ParseUUIDPipe) comentarioId: string,
    @Req() req: AutenticacaoRequest,
  ) {
    return this.commandBus.execute(
      new RemoveCurtidaComentarioCommand(req.user.id, comentarioId),
    );
  }

  @Get('avaliacao/:avaliacaoId')
  findAllByAvaliacao(@Param('avaliacaoId', ParseUUIDPipe) avaliacaoId: string) {
    return this.queryBus.execute(
      new GetAllComentariosByAvaliacaoQuery(avaliacaoId),
    );
  }

  @Get('usuario/:usuarioId')
  findAllByUsuario(@Param('usuarioId', ParseUUIDPipe) usuarioId: string) {
    return this.queryBus.execute(
      new GetAllComentariosByUsuarioQuery(usuarioId),
    );
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.queryBus.execute(new GetComentarioByIdQuery(id));
  }
}
