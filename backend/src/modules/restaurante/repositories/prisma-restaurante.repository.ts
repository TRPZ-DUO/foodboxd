import { Injectable } from '@nestjs/common';
import { RestauranteRepository } from './restaurante.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { Restaurante } from '../entities/restaurante.entity';
import { SearchRestauranteDto } from '../dto/search-restaurante.dto';

@Injectable()
export class PrismaRestauranteRepository implements RestauranteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(restaurante: Restaurante): Promise<Restaurante> {
    const data = await this.prisma.restaurante.create({
      data: {
        id: restaurante.id,
        nome: restaurante.nome,
        descricao: restaurante.descricao,
        endereco: restaurante.endereco,
        cidade: restaurante.cidade,
        estado: restaurante.estado,
        latitude: restaurante.latitude,
        longitude: restaurante.longitude,
        categoriaId: restaurante.categoriaId,
      },
    });

    return new Restaurante(
      data.id,
      data.nome,
      data.descricao,
      data.endereco,
      data.cidade,
      data.estado,
      data.latitude,
      data.longitude,
      data.categoriaId,
    );
  }

  async findById(id: string): Promise<Restaurante | null> {
    const restaurante = await this.prisma.restaurante.findUnique({
      where: { id },
    });

    if (!restaurante) {
      return null;
    }

    return new Restaurante(
      restaurante.id,
      restaurante.nome,
      restaurante.descricao,
      restaurante.endereco,
      restaurante.cidade,
      restaurante.estado,
      restaurante.latitude,
      restaurante.longitude,
      restaurante.categoriaId,
    );
  }

  async search(filters: SearchRestauranteDto): Promise<Restaurante[]> {
    const restaurantes = await this.prisma.restaurante.findMany({
      where: {
        ...(filters.nome && {
          nome: {
            contains: filters.nome,
            mode: 'insensitive',
          },
        }),
        ...(filters.categoriaId && {
          categoriaId: filters.categoriaId,
        }),
        ...(filters.cidade && {
          cidade: {
            contains: filters.cidade,
            mode: 'insensitive',
          },
        }),
        ...(filters.estado && {
          estado: {
            contains: filters.estado,
            mode: 'insensitive',
          },
        }),
      },
    });

    return restaurantes.map(
      (restaurante) =>
        new Restaurante(
          restaurante.id,
          restaurante.nome,
          restaurante.descricao,
          restaurante.endereco,
          restaurante.cidade,
          restaurante.estado,
          restaurante.latitude,
          restaurante.longitude,
          restaurante.categoriaId,
        ),
    );
  }

  async findAll(): Promise<Restaurante[]> {
    const restaurantes = await this.prisma.restaurante.findMany();

    return restaurantes.map(
      (restaurantes) =>
        new Restaurante(
          restaurantes.id,
          restaurantes.nome,
          restaurantes.descricao,
          restaurantes.endereco,
          restaurantes.cidade,
          restaurantes.estado,
          restaurantes.latitude,
          restaurantes.longitude,
          restaurantes.categoriaId,
        ),
    );
  }

  async update(restaurante: Restaurante): Promise<Restaurante> {
    const data = await this.prisma.restaurante.update({
      where: {
        id: restaurante.id,
      },
      data: {
        nome: restaurante.nome,
        descricao: restaurante.descricao,
        endereco: restaurante.endereco,
        cidade: restaurante.cidade,
        estado: restaurante.estado,
        latitude: restaurante.latitude,
        longitude: restaurante.longitude,
        categoriaId: restaurante.categoriaId,
      },
    });
    return new Restaurante(
      data.id,
      data.nome,
      data.descricao,
      data.endereco,
      data.cidade,
      data.estado,
      data.latitude,
      data.longitude,
      data.categoriaId,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.restaurante.delete({ where: { id } });
  }
}
