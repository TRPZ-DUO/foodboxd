import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateFavoritoDto } from '../dto/create-favorito.dto';
import { CreateFavoritoCommand } from '../commands/create-favorito/create-favorito.command';
import { RemoveFavoritoCommand } from '../commands/remove-favorito/remove-favorito.command';

import { GetFavoritoByIdQuery } from '../queries/get-favorito-by-id/get-favorito-by-id.query';
import { GetAllFavoritosQuery } from '../queries/get-all-favoritos/get-all-favoritos.query';
import type { AutenticacaoRequest } from '../../auth/interfaces/autenticacao-request.interface';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('favoritos')
export class FavoritoController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiBearerAuth('JWT-auth')
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: AutenticacaoRequest, @Body() dto: CreateFavoritoDto) {
    return this.commandBus.execute(
      new CreateFavoritoCommand(req.user.id, dto.pratoId),
    );
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetAllFavoritosQuery());
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.queryBus.execute(new GetFavoritoByIdQuery(id));
  }

  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: AutenticacaoRequest,
  ) {
    return this.commandBus.execute(new RemoveFavoritoCommand(id, req.user.id));
  }
}
