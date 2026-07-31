import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAvaliacaoByIdQuery } from './get-avaliacao-by-id.query';
import { AvaliacoesRepository } from '../../repositories/avaliacoes.repository';
import { Avaliacao } from '../../entities/avaliacao.entity';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetAvaliacaoByIdQuery)
export class GetAvaliacaoByIdHandler implements IQueryHandler<GetAvaliacaoByIdQuery> {
  constructor(private readonly repository: AvaliacoesRepository) {}

  async execute(query: GetAvaliacaoByIdQuery): Promise<Avaliacao> {
    const avaliacao = await this.repository.findById(query.id);

    if (!avaliacao) {
      throw new NotFoundException(`Avaliação não encontrada, id: ${query.id}`);
    }
    return avaliacao;
  }
}
