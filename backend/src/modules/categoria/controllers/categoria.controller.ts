import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCategoriaDto } from '../dto/create-categoria.dto';
import { CreateCategoriaCommand } from '../commands/create-categoria/create-categoria.command';
import { GetCategoriaByNomeQuery } from '../queries/get-categoria-by-nome/get-categoria-by-nome.query';
import { GetAllCategoriasQuery } from '../queries/get-all-categorias/get-categorias.query';
import { GetCategoriaByIdQuery } from '../queries/get-categoria-by-id/get-categoria-by-id.query';
import { UpdateCategoriaDto } from '../dto/update-categoria.dto';
import { UpdateCategoriaCommand } from '../commands/update-categoria/update-categoria.command';
import { DeleteCategoriaCommand } from '../commands/delete-categoria/delete-categoria.command';

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
    return this.queryBus.execute(new GetAllCategoriasQuery());
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.queryBus.execute(new GetCategoriaByIdQuery(id));
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCategoriaDto,
  ) {
    return this.commandBus.execute(new UpdateCategoriaCommand(id, dto.nome));
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.commandBus.execute(new DeleteCategoriaCommand(id));
  }
}
