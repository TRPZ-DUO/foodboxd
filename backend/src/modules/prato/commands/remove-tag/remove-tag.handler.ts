import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveTagCommand } from './remove-tag.command';
import { PratoRepository } from '../../repositories/prato.repository';
import { NotFoundException } from '@nestjs/common';
import { TagRepository } from 'src/modules/tag/repositories/tag.repository';

@CommandHandler(RemoveTagCommand)
export class RemoveTagHandler implements ICommandHandler<RemoveTagCommand> {
  constructor(
    private readonly pratoRepository: PratoRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  async execute(command: RemoveTagCommand): Promise<void> {
    const prato = await this.pratoRepository.findById(command.pratoId);
    const tag = await this.tagRepository.findById(command.tagId);

    if (!prato) {
      throw new NotFoundException(
        `Prato não encontrado, id: ${command.pratoId}`,
      );
    }
    if (!tag) {
      throw new NotFoundException(`Tag não encontrada, id: ${command.tagId}`);
    }

    if (
      !(await this.pratoRepository.existsTag(command.pratoId, command.tagId))
    ) {
      throw new NotFoundException('Tag não está vinculada ao prato');
    }

    return await this.pratoRepository.removeTag(command.pratoId, command.tagId);
  }
}
