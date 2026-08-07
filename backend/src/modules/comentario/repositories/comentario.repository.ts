import { Comentario } from '../entities/comentario.entity';
import { CurtidaComentario } from '../entities/curtida-comentario.entity';

export abstract class ComentarioRepository {
  abstract create(comentario: Comentario): Promise<Comentario>;

  abstract update(
    comentarioId: string,
    comentario: Comentario,
  ): Promise<Comentario>;

  abstract findById(id: string): Promise<Comentario | null>;

  abstract findAllByAvaliacao(avaliacaoId: string): Promise<Comentario[]>;

  abstract findAllByUsuario(usuarioId: string): Promise<Comentario[]>;

  abstract delete(id: string): Promise<void>;

  abstract addCurtida(
    curtidaComentario: CurtidaComentario,
  ): Promise<CurtidaComentario>;

  abstract removeCurtida(
    usuarioId: string,
    comentarioId: string,
  ): Promise<void>;

  abstract existsCurtida(
    usuarioId: string,
    comentarioId: string,
  ): Promise<boolean>;
}
