import {
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

import { CreateSeguidorCommand } from '../commands/create-seguidor/create-seguidor.command';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth/jwt-auth.guard';
import type { AutenticacaoRequest } from '../../auth/interfaces/autenticacao-request.interface';
import { RemoveSeguidorCommand } from '../commands/remove-seguidor/remove-seguidor.command';
import { GetSeguidorByIdQuery } from '../queries/get-seguidor-by-id/get-seguidor-by-id.query';

@Controller('seguidores')
export class SeguidorController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post(':seguidoId')
  @UseGuards(JwtAuthGuard)
  create(
    @Req() req: AutenticacaoRequest,
    @Param('seguidoId', ParseUUIDPipe) seguidoId: string,
  ) {
    return this.commandBus.execute(
      new CreateSeguidorCommand(req.user.id, seguidoId),
    );
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.queryBus.execute(new GetSeguidorByIdQuery(id));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(
    @Req() req: AutenticacaoRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.commandBus.execute(new RemoveSeguidorCommand(id, req.user.id));
  }
}
