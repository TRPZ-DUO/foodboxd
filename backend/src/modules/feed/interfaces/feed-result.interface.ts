import { Atividade } from '../entities/atividade.entity';

export interface FeedResult {
  items: Atividade[];
  nextCursor: {
    criadoEm: Date;
    id: string;
  } | null;
  hasNextPage: boolean;
}
