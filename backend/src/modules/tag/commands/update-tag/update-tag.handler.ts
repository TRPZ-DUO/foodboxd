import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTagCommand } from './update-tag.command';
import { TagRepository } from '../../repositories/tag.repository';
import { Tag } from '../../entities/tag.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateTagCommand)
export class UpdateTagHandler implements ICommandHandler<UpdateTagCommand> {
  constructor(private readonly repository: TagRepository) {}

  async execute(command: UpdateTagCommand): Promise<Tag> {
    const tag = await this.repository.findById(command.id);

    if (!tag) {
      throw new NotFoundException('Tag não encontrada, id: ', command.id);
    }

    tag.atualizar(command.data);

    return this.repository.update(tag);
  }
}
