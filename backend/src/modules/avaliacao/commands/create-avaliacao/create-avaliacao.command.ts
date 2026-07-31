import { CreateAvaliacaoDto } from '../../dto/create-avaliacao.dto';

export class CreateAvaliacaoCommand {
  constructor(public readonly data: CreateAvaliacaoDto) {}
}
