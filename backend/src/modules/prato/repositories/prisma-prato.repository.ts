import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prato } from '../entities/prato.entity';
import { PratoRepository } from './prato.repository';

@Injectable()
export class PrismaPratoRepository implements PratoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(prato: Prato): Promise<Prato> {
    const data = await this.prisma.prato.create({
      data: {
        id: prato.id,
        nome: prato.nome,
        descricao: prato.descricao,
        imagemUrl: prato.imagemUrl,
        mediaAvaliacoes: prato.mediaAvaliacoes,
        restauranteId: prato.restauranteId,
      },
    });

    return new Prato(
      data.id,
      data.nome,
      data.descricao,
      data.imagemUrl,
      Number(data.mediaAvaliacoes),
      data.restauranteId,
    );
  }
}
