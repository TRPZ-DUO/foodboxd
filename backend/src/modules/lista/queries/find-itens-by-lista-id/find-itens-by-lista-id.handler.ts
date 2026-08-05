import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindItensByListaIdQuery } from './find-itens-by-lista-id.query';
import { ListaRepository } from '../../repositories/lista.repository';
import { ItemLista } from '../../entities/item-lista.entity';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(FindItensByListaIdQuery)
export class FindItensByListaIdHandler implements IQueryHandler<FindItensByListaIdQuery> {
  constructor(private readonly repository: ListaRepository) {}

  async execute(query: FindItensByListaIdQuery): Promise<ItemLista[]> {
    const lista = await this.repository.findById(query.listaId);

    if (!lista) {
      throw new NotFoundException('Lista não existe');
    }

    return this.repository.findItensByLista(lista.id);
  }
}
