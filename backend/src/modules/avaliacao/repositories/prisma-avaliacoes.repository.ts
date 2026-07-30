import { PrismaService } from 'src/prisma/prisma.service';
import { Avaliacao } from '../entities/avaliacao.entity';
import { CurtidaAvaliacao } from '../entities/curtida-avaliacao.entity';
import { FotoAvaliacao } from '../entities/foto-avaliacao.entity';
import { AvaliacoesRepository } from './avaliacoes.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaAvaliacoesRepository implements AvaliacoesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(avaliacao: Avaliacao): Promise<Avaliacao> {
    const data = await this.prisma.avaliacao.create({
      data: {
        id: avaliacao.id,
        nota: avaliacao.nota,
        descricao: avaliacao.descricao,
        pratoId: avaliacao.pratoId,
        usuarioId: avaliacao.usuarioId,
      },
    });

    await this.updateMediaAvaliacoes(data.pratoId);

    return new Avaliacao(
      data.id,
      Number(data.nota),
      data.descricao,
      data.pratoId,
      data.usuarioId,
      data.criadoEm,
      data.atualizadoEm,
    );
  }

  async update(avaliacao: Avaliacao): Promise<Avaliacao> {
    const data = await this.prisma.avaliacao.update({
      where: {
        id: avaliacao.id,
      },
      data: {
        nota: Number(avaliacao.nota),
        descricao: avaliacao.descricao,
      },
    });

    await this.updateMediaAvaliacoes(data.pratoId);

    return new Avaliacao(
      data.id,
      Number(data.nota),
      data.descricao,
      data.pratoId,
      data.usuarioId,
      data.criadoEm,
      data.atualizadoEm,
    );
  }

  async findById(id: string): Promise<Avaliacao | null> {
    const avaliacao = await this.prisma.avaliacao.findUnique({ where: { id } });

    if (!avaliacao) {
      return null;
    }

    return new Avaliacao(
      avaliacao.id,
      Number(avaliacao.nota),
      avaliacao.descricao,
      avaliacao.pratoId,
      avaliacao.usuarioId,
      avaliacao.criadoEm,
      avaliacao.atualizadoEm,
    );
  }

  async findAll(): Promise<Avaliacao[]> {
    const avalicao = await this.prisma.avaliacao.findMany();

    return avalicao.map(
      (avaliacao) =>
        new Avaliacao(
          avaliacao.id,
          Number(avaliacao.nota),
          avaliacao.descricao,
          avaliacao.pratoId,
          avaliacao.usuarioId,
          avaliacao.criadoEm,
          avaliacao.atualizadoEm,
        ),
    );
  }

  async findAllAvaliacoesByUsuario(usuarioId: string): Promise<Avaliacao[]> {
    const avaliacoes = await this.prisma.avaliacao.findMany({
      where: {
        usuarioId: usuarioId,
      },
    });

    return avaliacoes.map(
      (avaliacao) =>
        new Avaliacao(
          avaliacao.id,
          Number(avaliacao.nota),
          avaliacao.descricao,
          avaliacao.pratoId,
          avaliacao.usuarioId,
          avaliacao.criadoEm,
          avaliacao.atualizadoEm,
        ),
    );
  }

  async findFotosByAvaliacao(avaliacaoId: string): Promise<FotoAvaliacao[]> {
    const fotos = await this.prisma.fotoAvaliacao.findMany({
      where: {
        avaliacaoId,
      },
    });

    return fotos.map(
      (foto) => new FotoAvaliacao(foto.id, foto.urlImagem, foto.avaliacaoId),
    );
  }

  async findFotoById(id: string): Promise<FotoAvaliacao | null> {
    const foto = await this.prisma.fotoAvaliacao.findUnique({
      where: { id },
    });

    if (!foto) {
      return null;
    }

    return new FotoAvaliacao(foto.id, foto.urlImagem, foto.avaliacaoId);
  }

  async delete(id: string): Promise<void | null> {
    const data = await this.prisma.avaliacao.delete({
      where: {
        id,
      },
    });

    await this.updateMediaAvaliacoes(data.pratoId);
  }

  async addFoto(
    avaliacaoId: string,
    urlImagem: string,
  ): Promise<FotoAvaliacao> {
    const data = await this.prisma.fotoAvaliacao.create({
      data: {
        urlImagem,
        avaliacaoId,
      },
    });

    return new FotoAvaliacao(data.id, data.urlImagem, data.avaliacaoId);
  }

  async removeFoto(id: string): Promise<void> {
    await this.prisma.fotoAvaliacao.delete({
      where: { id },
    });
  }

  async addCurtida(
    usuarioId: string,
    avaliacaoId: string,
  ): Promise<CurtidaAvaliacao> {
    const data = await this.prisma.curtidaAvaliacao.create({
      data: {
        avaliacaoId,
        usuarioId,
      },
    });

    return new CurtidaAvaliacao(
      data.id,
      data.avaliacaoId,
      data.usuarioId,
      data.criadoEm,
    );
  }

  async removeCurtida(usuarioId: string, avaliacaoId: string): Promise<void> {
    await this.prisma.curtidaAvaliacao.delete({
      where: {
        avaliacaoId_usuarioId: {
          usuarioId,
          avaliacaoId,
        },
      },
    });
  }

  async existsCurtida(
    usuarioId: string,
    avaliacaoId: string,
  ): Promise<boolean> {
    const curtida = await this.prisma.curtidaAvaliacao.findUnique({
      where: {
        avaliacaoId_usuarioId: {
          avaliacaoId,
          usuarioId,
        },
      },
    });
    return curtida !== null;
  }

  async existsFoto(avaliacaoId: string, urlImagem: string): Promise<boolean> {
    const foto = await this.prisma.fotoAvaliacao.findFirst({
      where: {
        avaliacaoId,
        urlImagem,
      },
    });

    return foto !== null;
  }

  async existsAvaliacao(usuarioId: string, pratoId: string): Promise<boolean> {
    const avaliacao = await this.prisma.avaliacao.findUnique({
      where: {
        usuarioId_pratoId: {
          usuarioId,
          pratoId,
        },
      },
    });

    return avaliacao !== null;
  }

  private async updateMediaAvaliacoes(pratoId: string): Promise<void> {
    const media = await this.prisma.avaliacao.aggregate({
      where: {
        pratoId,
      },
      _avg: {
        nota: true,
      },
    });

    await this.prisma.prato.update({
      where: {
        id: pratoId,
      },
      data: {
        mediaAvaliacoes: media._avg.nota ?? 0,
      },
    });
  }
}
