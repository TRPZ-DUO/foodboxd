import { Avaliacao } from '../entities/avaliacao.entity';
import { CurtidaAvaliacao } from '../entities/curtida-avaliacao.entity';
import { FotoAvaliacao } from '../entities/foto-avaliacao.entity';

export abstract class AvaliacoesRepository {
  abstract create(avaliacao: Avaliacao): Promise<Avaliacao>;

  abstract update(avaliacao: Avaliacao): Promise<Avaliacao>;

  abstract findById(id: string): Promise<Avaliacao | null>;

  abstract findAllAvaliacoesByUsuario(usuarioId: string): Promise<Avaliacao[]>;

  abstract findFotosByAvaliacao(avaliacaoId: string): Promise<FotoAvaliacao[]>;

  abstract findAll(): Promise<Avaliacao[]>;

  abstract findFotoById(id: string): Promise<FotoAvaliacao | null>;

  abstract delete(id: string): Promise<void | null>;

  abstract addFoto(
    avaliacaoId: string,
    urlImagem: string,
  ): Promise<FotoAvaliacao>;

  abstract removeFoto(id: string): Promise<void>;

  abstract addCurtida(
    usuarioId: string,
    avaliacaoId: string,
  ): Promise<CurtidaAvaliacao>;

  abstract removeCurtida(usuarioId: string, avaliacaoId: string): Promise<void>;

  abstract existsAvaliacao(
    usuarioId: string,
    pratoId: string,
  ): Promise<boolean>;

  abstract existsCurtida(
    usuarioId: string,
    avaliacaoId: string,
  ): Promise<boolean>;

  abstract existsFoto(avaliacaoId: string, urlImagem: string): Promise<boolean>;
}
