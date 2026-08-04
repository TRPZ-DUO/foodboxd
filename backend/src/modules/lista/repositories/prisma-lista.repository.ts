import { Injectable } from '@nestjs/common';
import { ListaRepository } from './lista.repository';
import { ItemLista } from '../entities/item-lista.entity';
import { Lista } from '../entities/lista.entity';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class PrismaListaRepository implements ListaRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(lista: Lista): Promise<Lista> {
    const data = await this.prisma.lista.create({
      data: {
        id: lista.id,
        titulo: lista.titulo,
        descricao: lista.descricao,
        visibilidade: lista.visibilidade,
        criadoEm: lista.criadoEm,
        usuarioId: lista.usuarioId,
      },
    });

    return new Lista(
      data.id,
      data.titulo,
      data.descricao,
      data.visibilidade,
      data.criadoEm,
      data.usuarioId,
    );
  }

  async update(lista: Lista): Promise<Lista> {
    const data = await this.prisma.lista.update({
      where: {
        id: lista.id,
      },
      data: {
        id: lista.id,
        titulo: lista.titulo,
        descricao: lista.descricao,
        visibilidade: lista.visibilidade,
        criadoEm: lista.criadoEm,
        usuarioId: lista.usuarioId,
      },
    });

    return new Lista(
      data.id,
      data.titulo,
      data.descricao,
      data.visibilidade,
      data.criadoEm,
      data.usuarioId,
    );
  }
  async findById(id: string): Promise<Lista | null> {
    const lista = await this.prisma.lista.findUnique({ where: { id } });

    if (!lista) {
      return null;
    }
    return new Lista(
      lista.id,
      lista.titulo,
      lista.descricao,
      lista.visibilidade,
      lista.criadoEm,
      lista.usuarioId,
    );
  }

  async findAll(): Promise<Lista[]> {
    const listas = await this.prisma.lista.findMany();

    return listas.map(
      (lista) =>
        new Lista(
          lista.id,
          lista.titulo,
          lista.descricao,
          lista.visibilidade,
          lista.criadoEm,
          lista.usuarioId,
        ),
    );
  }
  async delete(id: string): Promise<void> {
    await this.prisma.lista.delete({
      where: { id },
    });
  }

  async addPrato(item: ItemLista): Promise<ItemLista> {
    const data = await this.prisma.itemLista.create({
      data: {
        id: item.id,
        posicao: item.posicao,
        pratoId: item.pratoId,
        listaId: item.listaId,
      },
    });

    return new ItemLista(data.id, data.posicao, data.pratoId, data.listaId);
  }

  async removePrato(id: string): Promise<void> {
    await this.prisma.itemLista.delete({ where: { id } });
  }

  async updatePosicao(itemId: string, posicao: number): Promise<ItemLista> {
    const data = await this.prisma.itemLista.update({
      where: {
        id: itemId,
      },
      data: {
        posicao,
      },
    });

    return new ItemLista(data.id, data.posicao, data.pratoId, data.listaId);
  }

  async findItemById(id: string): Promise<ItemLista | null> {
    const item = await this.prisma.itemLista.findUnique({ where: { id } });

    if (!item) {
      return null;
    }

    return new ItemLista(item.id, item.posicao, item.pratoId, item.listaId);
  }

  async findItensByLista(listaId: string): Promise<ItemLista[]> {
    const itens = await this.prisma.itemLista.findMany({
      where: {
        listaId,
      },
      orderBy: {
        posicao: 'asc',
      },
    });

    return itens.map(
      (item) =>
        new ItemLista(item.id, item.posicao, item.pratoId, item.listaId),
    );
  }
  async existsPratoNaLista(listaId: string, pratoId: string): Promise<boolean> {
    const item = await this.prisma.itemLista.findUnique({
      where: {
        listaId_pratoId: {
          listaId,
          pratoId,
        },
      },
    });

    return !!item;
  }
}
