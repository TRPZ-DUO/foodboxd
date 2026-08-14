import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { FeedRepository } from './feed.repository';
import { Atividade } from '../entities/atividade.entity';
import { FeedResult } from '../interfaces/feed-result.interface';

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
    cursor?: {
      criadoEm: Date;
      id: string;
    },
  ): Promise<FeedResult> {
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
          OR: [
            {
              criadoEm: {
                lt: cursor.criadoEm,
              },
            },
            {
              criadoEm: cursor.criadoEm,
              id: {
                lt: cursor.id,
              },
            },
          ],
        }),
      },

      orderBy: [
        {
          criadoEm: 'desc',
        },
        {
          id: 'desc',
        },
      ],

      take: limit + 1,
    });

    const hasNextPage = atividades.length > limit;

    const itens = hasNextPage ? atividades.slice(0, limit) : atividades;

    const ultimo = itens[itens.length - 1];

    return {
      items: itens.map(
        (atividade) =>
          new Atividade(
            atividade.id,
            atividade.tipo,
            atividade.usuarioId,
            atividade.referenciaId,
            atividade.criadoEm,
          ),
      ),

      nextCursor:
        hasNextPage && ultimo
          ? {
              criadoEm: ultimo.criadoEm,
              id: ultimo.id,
            }
          : null,

      hasNextPage,
    };
  }

  async findAtividadesByUsuario(
    usuarioId: string,
    limit: number,
    cursor?: {
      criadoEm: Date;
      id: string;
    },
  ): Promise<FeedResult> {
    const atividades = await this.prisma.atividade.findMany({
      where: {
        usuarioId,

        ...(cursor && {
          OR: [
            {
              criadoEm: {
                lt: cursor.criadoEm,
              },
            },
            {
              criadoEm: cursor.criadoEm,
              id: {
                lt: cursor.id,
              },
            },
          ],
        }),
      },

      orderBy: [
        {
          criadoEm: 'desc',
        },
        {
          id: 'desc',
        },
      ],

      take: limit + 1,
    });

    const hasNextPage = atividades.length > limit;

    const itens = hasNextPage ? atividades.slice(0, limit) : atividades;

    const ultimo = itens[itens.length - 1];

    return {
      items: itens.map(
        (atividade) =>
          new Atividade(
            atividade.id,
            atividade.tipo,
            atividade.usuarioId,
            atividade.referenciaId,
            atividade.criadoEm,
          ),
      ),

      nextCursor:
        hasNextPage && ultimo
          ? {
              criadoEm: ultimo.criadoEm,
              id: ultimo.id,
            }
          : null,

      hasNextPage,
    };
  }
}
