import { UpdatePratoDto } from '../../dto/update-prato.dto';

export class UpdatePratoCommand {
  constructor(
    public readonly id: string,
    public readonly data: Omit<UpdatePratoDto, 'id'>,
  ) {}
}
