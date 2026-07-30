import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { AddFotoCommand } from '../commands/add-foto/add-foto-command';
import { diskStorage } from 'multer';
import 'multer';
import { GetAllFotosByAvaliacaoQuery } from '../queries/get-all-fotos-by-avaliacao/get-all-fotos-by-avaliacao.query';
import { RemoveFotoCommand } from '../commands/remove-foto/remove-foto.command';

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

  @Post(':avaliacaoId/fotos')
  @UseInterceptors(
    FileInterceptor('imagem', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const nome = `${Date.now()}-${file.originalname}`;
          cb(null, nome);
        },
      }),
    }),
  )
  addFoto(
    @Param('avaliacaoId', ParseUUIDPipe) avaliacaoId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imagemUrl = `/uploads/${file.filename}`;

    return this.commandBus.execute(new AddFotoCommand(avaliacaoId, imagemUrl));
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAvaliacaoDto,
  ) {
    return this.commandBus.execute(new UpdateAvaliacaoCommand(id, dto));
  }

  @Get(':avaliacaoId/fotos')
  findFotosByAvaliacao(
    @Param('avaliacaoId', ParseUUIDPipe) avaliacaoId: string,
  ) {
    return this.queryBus.execute(new GetAllFotosByAvaliacaoQuery(avaliacaoId));
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

  @Delete('fotos/:fotoId')
  deleteFoto(@Param('fotoId', ParseUUIDPipe) fotoId: string) {
    return this.commandBus.execute(new RemoveFotoCommand(fotoId));
  }
}
