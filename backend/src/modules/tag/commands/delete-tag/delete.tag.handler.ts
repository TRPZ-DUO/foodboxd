import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTagCommand } from './delete-tag.command';
import { TagRepository } from '../../repositories/tag.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteTagCommand)
export class DeleteTagHandler implements ICommandHandler<DeleteTagCommand> {
  constructor(private readonly repository: TagRepository) {}

  async execute(command: DeleteTagCommand): Promise<void> {
    const tag = await this.repository.findById(command.id);

    if (!tag) {
      throw new NotFoundException('Tag não existe, id:', command.id);
    }

    return this.repository.delete(tag.id);
  }
}
