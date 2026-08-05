import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindItemByIdQuery } from './find-item-by-id.query';
import { ListaRepository } from '../../repositories/lista.repository';
import { NotFoundException } from '@nestjs/common';
import { ItemLista } from '../../entities/item-lista.entity';

@QueryHandler(FindItemByIdQuery)
export class FindItemByIdHandler implements IQueryHandler<FindItemByIdQuery> {
  constructor(private readonly repository: ListaRepository) {}

  async execute(query: FindItemByIdQuery): Promise<ItemLista> {
    const item = await this.repository.findItemById(query.id);

    if (!item) {
      throw new NotFoundException('Lista não encontrada');
    }

    return item;
  }
}
