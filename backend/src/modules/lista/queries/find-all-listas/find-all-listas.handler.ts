import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllListasQuery } from './find-all-listas.query';
import { ListaRepository } from '../../repositories/lista.repository';
import { Lista } from '../../entities/lista.entity';

@QueryHandler(FindAllListasQuery)
export class FindAllListasHandler implements IQueryHandler<FindAllListasQuery> {
  constructor(private readonly repository: ListaRepository) {}

  async execute(): Promise<Lista[]> {
    return this.repository.findAll();
  }
}
