import { Injectable } from '@nestjs/common';
import { ComentarioRepository } from './comentario.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { Comentario } from '../entities/comentario.entity';
import { CurtidaComentario } from '../entities/curtida-comentario.entity';

@Injectable()
export class PrismaComentarioRepository implements ComentarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(comentario: Comentario): Promise<Comentario> {
    const data = await this.prisma.comentario.create({
      data: {
        id: comentario.id,
        conteudo: comentario.conteudo,
        criadoEm: comentario.criadoEm,
        atualizadoEm: comentario.atualizadoEm,
        avaliacaoId: comentario.avaliacaoId,
        usuarioId: comentario.usuarioId,
      },
    });

    return new Comentario(
      data.id,
      data.conteudo,
      data.criadoEm,
      data.atualizadoEm,
      data.avaliacaoId,
      data.usuarioId,
    );
  }
  async update(
    comentarioId: string,
    comentario: Comentario,
  ): Promise<Comentario> {
    const data = await this.prisma.comentario.update({
      where: {
        id: comentarioId,
      },
      data: {
        conteudo: comentario.conteudo,
      },
    });
    return new Comentario(
      data.id,
      data.conteudo,
      data.criadoEm,
      data.atualizadoEm,
      data.avaliacaoId,
      data.usuarioId,
    );
  }
  async findById(id: string): Promise<Comentario | null> {
    const comentario = await this.prisma.comentario.findUnique({
      where: { id },
    });

    if (!comentario) {
      return null;
    }

    return new Comentario(
      comentario.id,
      comentario.conteudo,
      comentario.criadoEm,
      comentario.atualizadoEm,
      comentario.avaliacaoId,
      comentario.usuarioId,
    );
  }
  async findAllByAvaliacao(avaliacaoId: string): Promise<Comentario[]> {
    const comentariosAvaliacao = await this.prisma.comentario.findMany({
      where: { avaliacaoId },
    });

    return comentariosAvaliacao.map(
      (comentarios) =>
        new Comentario(
          comentarios.id,
          comentarios.conteudo,
          comentarios.criadoEm,
          comentarios.atualizadoEm,
          comentarios.avaliacaoId,
          comentarios.usuarioId,
        ),
    );
  }
  async findAllByUsuario(usuarioId: string): Promise<Comentario[]> {
    const comentariosUsuario = await this.prisma.comentario.findMany({
      where: { usuarioId },
    });

    return comentariosUsuario.map(
      (comentarios) =>
        new Comentario(
          comentarios.id,
          comentarios.conteudo,
          comentarios.criadoEm,
          comentarios.atualizadoEm,
          comentarios.avaliacaoId,
          comentarios.usuarioId,
        ),
    );
  }
  async delete(id: string): Promise<void> {
    await this.prisma.comentario.delete({ where: { id } });
  }
  async addCurtida(
    curtidaComentario: CurtidaComentario,
  ): Promise<CurtidaComentario> {
    const curtida = await this.prisma.curtidaComentario.create({
      data: {
        id: curtidaComentario.id,
        criadoEm: curtidaComentario.criadoEm,
        comentarioId: curtidaComentario.comentarioId,
        usuarioId: curtidaComentario.usuarioId,
      },
    });

    return new CurtidaComentario(
      curtida.id,
      curtida.criadoEm,
      curtida.comentarioId,
      curtida.usuarioId,
    );
  }
  async removeCurtida(usuarioId: string, comentarioId: string): Promise<void> {
    await this.prisma.curtidaComentario.delete({
      where: {
        comentarioId_usuarioId: {
          comentarioId,
          usuarioId,
        },
      },
    });
  }

  async existsCurtida(
    usuarioId: string,
    comentarioId: string,
  ): Promise<boolean> {
    const existe = await this.prisma.curtidaComentario.findUnique({
      where: {
        comentarioId_usuarioId: {
          comentarioId,
          usuarioId,
        },
      },
    });
    return existe !== null;
  }
}
