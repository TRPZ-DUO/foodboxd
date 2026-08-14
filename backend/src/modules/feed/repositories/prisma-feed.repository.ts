import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { FeedRepository } from './feed.repository';
import { Atividade } from '../entities/atividade.entity';

@Injectable()
export class PrismaFeedRepository implements FeedRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(atividade: Atividade): Promise<Atividade> {
    const data = await this.prisma.atividade.create({
      data: {
        id: atividade.id,
        tipo: atividade.tipo,
        usuarioId: atividade.usuarioId,
        referenciaId: atividade.referenciaId,
        criadoEm: atividade.criadoEm,
      },
    });

    return new Atividade(
      data.id,
      data.tipo,
      data.usuarioId,
      data.referenciaId,
      data.criadoEm,
    );
  }
  async findFeed(
    usuarioId: string,
    limit: number,
    cursor?: Date,
  ): Promise<Atividade[]> {
    const atividades = await this.prisma.atividade.findMany({
      where: {
        usuario: {
          seguindo: {
            some: {
              seguidorId: usuarioId,
            },
          },
        },

        ...(cursor && {
          criadoEm: {
            lt: cursor,
          },
        }),
      },

      orderBy: {
        criadoEm: 'desc',
      },

      take: limit,
    });

    return atividades.map(
      (atividade) =>
        new Atividade(
          atividade.id,
          atividade.tipo,
          atividade.usuarioId,
          atividade.referenciaId,
          atividade.criadoEm,
        ),
    );
  }
  async findAtividadesByUsuario(
    usuarioId: string,
    limit: number,
    cursor?: Date,
  ): Promise<Atividade[]> {
    const atividades = await this.prisma.atividade.findMany({
      where: {
        usuarioId,

        ...(cursor && {
          criadoEm: {
            lt: cursor,
          },
        }),
      },

      orderBy: {
        criadoEm: 'desc',
      },

      take: limit,
    });

    return atividades.map(
      (atividade) =>
        new Atividade(
          atividade.id,
          atividade.tipo,
          atividade.usuarioId,
          atividade.referenciaId,
          atividade.criadoEm,
        ),
    );
  }
}
