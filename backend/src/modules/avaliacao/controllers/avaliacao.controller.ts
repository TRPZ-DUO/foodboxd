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
  Req,
  UseGuards,
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
import { AddCurtidaCommand } from '../commands/add-curtida/add-curtida-command';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth/jwt-auth.guard';
import type { AutenticacaoRequest } from 'src/modules/auth/interfaces/autenticacao-request.interface';
import { RemoveCurtidaCommand } from '../commands/remove-curtida/remove-curtida.command';

@Controller('avaliacoes')
export class AvaliacaoController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateAvaliacaoDto, @Req() req: AutenticacaoRequest) {
    return this.commandBus.execute(
      new CreateAvaliacaoCommand(req.user.id, dto),
    );
  }

  @Post(':avaliacaoId/fotos')
  @UseGuards(JwtAuthGuard)
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

  @Post(':avaliacaoId/curtidas')
  @UseGuards(JwtAuthGuard)
  addCurtida(
    @Req() req: AutenticacaoRequest,
    @Param('avaliacaoId', ParseUUIDPipe) avaliacaoId: string,
  ) {
    return this.commandBus.execute(
      new AddCurtidaCommand(req.user.id, avaliacaoId),
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAvaliacaoDto,
    @Req() req: AutenticacaoRequest,
  ) {
    return this.commandBus.execute(
      new UpdateAvaliacaoCommand(id, req.user.id, dto),
    );
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
  @UseGuards(JwtAuthGuard)
  delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: AutenticacaoRequest,
  ) {
    return this.commandBus.execute(new DeleteAvaliacaoCommand(id, req.user.id));
  }

  @Delete('fotos/:fotoId')
  deleteFoto(@Param('fotoId', ParseUUIDPipe) fotoId: string) {
    return this.commandBus.execute(new RemoveFotoCommand(fotoId));
  }

  @Delete(':avaliacaoId/curtidas')
  @UseGuards(JwtAuthGuard)
  RemoveCurtida(
    @Req() req: AutenticacaoRequest,
    @Param('avaliacaoId', ParseUUIDPipe) avaliacaoId: string,
  ) {
    return this.commandBus.execute(
      new RemoveCurtidaCommand(req.user.id, avaliacaoId),
    );
  }
}
