import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllFotosByAvaliacaoQuery } from './get-all-fotos-by-avaliacao.query';
import { AvaliacoesRepository } from '../../repositories/avaliacoes.repository';
import { FotoAvaliacao } from '../../entities/foto-avaliacao.entity';

@QueryHandler(GetAllFotosByAvaliacaoQuery)
export class GetAllFotosByAvaliacaoHandler implements IQueryHandler<GetAllFotosByAvaliacaoQuery> {
  constructor(private readonly repository: AvaliacoesRepository) {}
  async execute(query: GetAllFotosByAvaliacaoQuery): Promise<FotoAvaliacao[]> {
    return this.repository.findFotosByAvaliacao(query.avaliacaoId);
  }
}
