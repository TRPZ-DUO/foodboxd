import { UpdateTagDto } from '../../dto/update-tag-dto';

export class UpdateTagCommand {
  constructor(
    public readonly id: string,
    public readonly data: Omit<UpdateTagDto, 'id'>,
  ) {}
}
