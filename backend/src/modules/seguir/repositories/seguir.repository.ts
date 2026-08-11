import { Seguidor } from '../entities/seguidor.entity';

export abstract class SeguirRepository {
  abstract create(seguidor: Seguidor): Promise<Seguidor>;

  abstract remove(id: string): Promise<void>;

  abstract findById(id: string): Promise<Seguidor | null>;

  abstract exists(seguidorId: string, seguindoId: string): Promise<boolean>;

  abstract findSeguidores(usuarioId: string): Promise<Seguidor[]>;

  abstract findSeguindo(usuarioId: string): Promise<Seguidor[]>;
}
