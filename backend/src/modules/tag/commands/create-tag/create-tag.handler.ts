import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTagCommand } from './create-tag.command';
import { TagRepository } from '../../repositories/tag.repository';
import { Tag } from '../../entities/tag.entity';

@CommandHandler(CreateTagCommand)
export class CreateTagHandler implements ICommandHandler<CreateTagCommand> {
  constructor(private readonly repository: TagRepository) {}

  async execute(command: CreateTagCommand): Promise<Tag> {
    const tag = new Tag(crypto.randomUUID(), command.data.nome);

    return this.repository.create(tag);
  }
}
