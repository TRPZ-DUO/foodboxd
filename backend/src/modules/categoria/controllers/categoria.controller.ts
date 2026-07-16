import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCategoriaDto } from '../dto/create-categoria.dto';
import { CreateCategoriaCommand } from '../commands/create-categoria/create-categoria.command';
import { GetCategoriaByNomeQuery } from '../queries/get-categoria/get-categoria-by-nome.query';
import { GetCategoriasQuery } from '../queries/get-categorias/get-categorias.query';

@Controller('categorias')
export class CategoriaController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() dto: CreateCategoriaDto) {
    return this.commandBus.execute(new CreateCategoriaCommand(dto.nome));
  }

  @Get('nome/:nome')
  findByNome(@Param('nome') nome: string) {
    return this.queryBus.execute(new GetCategoriaByNomeQuery(nome));
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetCategoriasQuery());
  }
}
