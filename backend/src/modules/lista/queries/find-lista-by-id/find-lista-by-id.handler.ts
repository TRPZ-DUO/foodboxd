import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Lista } from '../../entities/lista.entity';
import { ListaRepository } from '../../repositories/lista.repository';
import { NotFoundException } from '@nestjs/common';
import { FindListaByIdQuery } from './find-lista-by-id.query';

@QueryHandler(FindListaByIdQuery)
export class FindListaByIdHandler implements IQueryHandler<FindListaByIdQuery> {
  constructor(private readonly repository: ListaRepository) {}

  async execute(query: FindListaByIdQuery): Promise<Lista> {
    const lista = await this.repository.findById(query.id);

    if (!lista) {
      throw new NotFoundException('Lista não encontrada');
    }

    return lista;
  }
}
