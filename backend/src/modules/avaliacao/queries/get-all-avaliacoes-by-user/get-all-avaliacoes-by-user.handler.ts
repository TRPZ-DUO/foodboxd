import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllAvaliacoesByUserQuery } from './get-all-avaliacoes-by-user.query';
import { AvaliacoesRepository } from '../../repositories/avaliacoes.repository';
import { Avaliacao } from '../../entities/avaliacao.entity';

@QueryHandler(GetAllAvaliacoesByUserQuery)
export class GetAllAvaliacoesByUserHandler implements IQueryHandler<GetAllAvaliacoesByUserQuery> {
  constructor(private readonly repository: AvaliacoesRepository) {}

  async execute(query: GetAllAvaliacoesByUserQuery): Promise<Avaliacao[]> {
    return this.repository.findAllAvaliacoesByUsuario(query.idUser);
  }
}
