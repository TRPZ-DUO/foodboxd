import { Injectable } from '@nestjs/common';
import { CategoriaRepository } from './categoria.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class PrismaCategoriaRepository implements CategoriaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(categoria: Categoria): Promise<Categoria> {
    const data = await this.prisma.categoria.create({
      data: {
        id: categoria.id,
        nome: categoria.nome,
      },
    });

    return new Categoria(data.id, data.nome);
  }

  async findByNome(nome: string): Promise<Categoria | null> {
    const categoria = await this.prisma.categoria.findUnique({
      where: { nome },
    });

    if (!categoria) {
      return null;
    }

    return new Categoria(categoria.id, categoria.nome);
  }

  async findAll(): Promise<Categoria[]> {
    const categoria = await this.prisma.categoria.findMany();

    return categoria.map(
      (categoria) => new Categoria(categoria.id, categoria.nome),
    );
  }
}
