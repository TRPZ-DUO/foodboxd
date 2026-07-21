import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateRestauranteDto } from '../dto/create-restaurante.dto';
import { CreateRestauranteCommand } from '../commands/create-restaurante/create-restaurante.command';
import { GetRestauranteByNomeQuery } from '../queries/get-restaurente-by-nome/get-restaurante-by-nome.query';
import { GetAllRestaurantesQuery } from '../queries/get-all-restaurantes/get-all-restaurantes.query';
import { GetRestauranteByIdQuery } from '../queries/get-restaurante-by-id/get-restaurante-by-id.query';
import { UpdateRestauranteDto } from '../dto/update-restaurante.dto';
import { UpdateRestauranteCommand } from '../commands/update-restaurante/update-restaurante.command';
import { DeleteRestauranteCommand } from '../commands/delete-restaurante/delete-restaurante.command';

@Controller('restaurantes')
export class RestauranteController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  create(@Body() dto: CreateRestauranteDto) {
    return this.commandBus.execute(new CreateRestauranteCommand(dto));
  }

  @Get('nome/:nome')
  findByNome(@Param('nome') nome: string) {
    return this.queryBus.execute(new GetRestauranteByNomeQuery(nome));
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.queryBus.execute(new GetRestauranteByIdQuery(id));
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetAllRestaurantesQuery());
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateRestauranteDto,
  ) {
    return this.commandBus.execute(new UpdateRestauranteCommand(id, dto));
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.commandBus.execute(new DeleteRestauranteCommand(id));
  }
}
