import { CreatePratoDto } from '../../dto/create-prato.dto';

export class CreatePratoCommand {
  constructor(public readonly data: CreatePratoDto) {}
}
