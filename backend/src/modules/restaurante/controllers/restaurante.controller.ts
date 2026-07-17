import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateRestauranteDto } from '../dto/create-restaurante.dto';
import { CreateRestauranteCommand } from '../commands/create-restaurante/create-restaurante.command';
import { GetRestauranteQuery } from '../queries/get-restaurente/get-restaurante.query';
import { GetRestaurantesQuery } from '../queries/get-restaurantes/get-restaurantes.query';

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
    return this.queryBus.execute(new GetRestauranteQuery(nome));
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetRestaurantesQuery());
  }
}
