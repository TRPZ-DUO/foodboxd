import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth/jwt-auth.guard';
import type { AutenticacaoRequest } from '../../auth/interfaces/autenticacao-request.interface';

import { GetFeedQuery } from '../queries/get-feed/get-feed.query';
import { GetFeedByUsuarioQuery } from '../queries/get-feed-by-usuario/get-feed-by-usuario.query';

@Controller('feed')
export class FeedController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getFeed(
    @Req() req: AutenticacaoRequest,
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 20,
    @Query('cursor') cursor?: string,
  ) {
    return this.queryBus.execute(
      new GetFeedQuery(
        req.user.id,
        limit,
        cursor ? new Date(cursor) : undefined,
      ),
    );
  }

  @Get('usuario/:usuarioId')
  getAtividadesUsuario(
    @Param('usuarioId', ParseUUIDPipe) usuarioId: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 20,
    @Query('cursor') cursor?: string,
  ) {
    return this.queryBus.execute(
      new GetFeedByUsuarioQuery(
        usuarioId,
        limit,
        cursor ? new Date(cursor) : undefined,
      ),
    );
  }
}
