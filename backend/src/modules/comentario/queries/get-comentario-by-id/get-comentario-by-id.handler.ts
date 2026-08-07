import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetComentarioByIdQuery } from './get-comentario-by-id.query';
import { ComentarioRepository } from '../../repositories/comentario.repository';
import { NotFoundException } from '@nestjs/common';
import { Comentario } from '../../entities/comentario.entity';

@QueryHandler(GetComentarioByIdQuery)
export class GetComentarioByIdHandler implements IQueryHandler<GetComentarioByIdQuery> {
  constructor(private readonly repository: ComentarioRepository) {}

  async execute(query: GetComentarioByIdQuery): Promise<Comentario | null> {
    const comentario = await this.repository.findById(query.id);

    if (!comentario) {
      throw new NotFoundException('Nenhum comentário encotrado');
    }

    return comentario;
  }
}
