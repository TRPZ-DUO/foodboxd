import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Seguidor } from '../entities/seguidor.entity';
import { SeguirRepository } from './seguir.repository';

@Injectable()
export class PrismaSeguirRepository implements SeguirRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(seguidor: Seguidor): Promise<Seguidor> {
    const data = await this.prisma.seguidor.create({
      data: {
        id: seguidor.id,
        criadoEm: seguidor.criadoEm,
        seguidorId: seguidor.seguidorId,
        seguidoId: seguidor.seguidoId,
      },
    });
    return new Seguidor(
      data.id,
      data.criadoEm,
      data.seguidorId,
      data.seguidoId,
    );
  }

  async remove(id: string): Promise<void> {
    await this.prisma.seguidor.delete({ where: { id } });
  }
  async findById(id: string): Promise<Seguidor | null> {
    const seguir = await this.prisma.seguidor.findUnique({
      where: { id },
    });

    if (!seguir) {
      return null;
    }

    return new Seguidor(
      seguir.id,
      seguir.criadoEm,
      seguir.seguidorId,
      seguir.seguidoId,
    );
  }
  async exists(seguidorId: string, seguidoId: string): Promise<boolean> {
    const relacao = await this.prisma.seguidor.findUnique({
      where: {
        seguidorId_seguidoId: {
          seguidorId,
          seguidoId,
        },
      },
    });

    return relacao !== null;
  }
}
