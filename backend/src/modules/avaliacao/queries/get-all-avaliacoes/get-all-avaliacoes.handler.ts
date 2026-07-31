import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllAvaliacoesQuery } from './get-all-avaliacoes.query';
import { AvaliacoesRepository } from '../../repositories/avaliacoes.repository';
import { Avaliacao } from '../../entities/avaliacao.entity';

@QueryHandler(GetAllAvaliacoesQuery)
export class GetAllAvaliacoesHandler implements IQueryHandler<GetAllAvaliacoesQuery> {
  constructor(private readonly repository: AvaliacoesRepository) {}

  async execute(): Promise<Avaliacao[]> {
    return await this.repository.findAll();
  }
}
