import { PrismaService } from '../../../prisma/prisma.service';
import { Favorito } from '../entities/favorito.entity';
import { FavoritoRepository } from './favorito.repository';

export class PrismaFavoritoRepository implements FavoritoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(favorito: Favorito): Promise<Favorito> {
    const data = await this.prisma.favorito.create({
      data: {
        id: favorito.id,
        usuarioId: favorito.usuarioId,
        pratoId: favorito.pratoId,
        criadoEm: favorito.criadoEm,
      },
    });

    return new Favorito(data.id, data.usuarioId, data.pratoId, data.criadoEm);
  }

  async findById(id: string): Promise<Favorito | null> {
    const data = await this.prisma.favorito.findUnique({ where: { id } });

    if (!data) {
      return null;
    }

    return new Favorito(data.id, data.usuarioId, data.pratoId, data.criadoEm);
  }

  async findAll(): Promise<Favorito[]> {
    const favorito = await this.prisma.favorito.findMany();

    return favorito.map(
      (favorito) =>
        new Favorito(
          favorito.id,
          favorito.usuarioId,
          favorito.pratoId,
          favorito.criadoEm,
        ),
    );
  }

  async exists(usuarioId: string, pratoId: string): Promise<boolean> {
    const favorito = await this.prisma.favorito.findUnique({
      where: {
        usuarioId_pratoId: {
          usuarioId,
          pratoId,
        },
      },
    });

    return favorito !== null;
  }

  async remove(id: string): Promise<void> {
    await this.prisma.favorito.delete({ where: { id } });
  }
}
