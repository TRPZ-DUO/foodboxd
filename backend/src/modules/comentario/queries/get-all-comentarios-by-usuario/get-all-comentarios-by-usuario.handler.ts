import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllComentariosByUsuarioQuery } from './get-all-comentarios-by-usuario.query';
import { ComentarioRepository } from '../../repositories/comentario.repository';
import { Comentario } from '../../entities/comentario.entity';

@QueryHandler(GetAllComentariosByUsuarioQuery)
export class GetAllComentariosByUsuarioHandler implements IQueryHandler<GetAllComentariosByUsuarioQuery> {
  constructor(private readonly repository: ComentarioRepository) {}

  async execute(query: GetAllComentariosByUsuarioQuery): Promise<Comentario[]> {
    return this.repository.findAllByUsuario(query.usuarioId);
  }
}
