import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllComentariosByAvaliacaoQuery } from './get-all-comentarios-by-avaliacao.query';
import { ComentarioRepository } from '../../repositories/comentario.repository';
import { Comentario } from '../../entities/comentario.entity';

@QueryHandler(GetAllComentariosByAvaliacaoQuery)
export class GetAllComentariosByAvaliacaoHandler implements IQueryHandler<GetAllComentariosByAvaliacaoQuery> {
  constructor(private readonly repository: ComentarioRepository) {}

  async execute(
    query: GetAllComentariosByAvaliacaoQuery,
  ): Promise<Comentario[]> {
    return this.repository.findAllByAvaliacao(query.avaliacaoId);
  }
}
