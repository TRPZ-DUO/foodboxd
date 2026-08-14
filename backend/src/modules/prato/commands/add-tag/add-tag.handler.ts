import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddTagCommand } from './add-tag.command';
import { PratoRepository } from '../../repositories/prato.repository';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { TagRepository } from '../../../tag/repositories/tag.repository';

@CommandHandler(AddTagCommand)
export class AddTagHandler implements ICommandHandler<AddTagCommand> {
  constructor(
    private readonly pratoRepository: PratoRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  async execute(command: AddTagCommand): Promise<void> {
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

    if (await this.pratoRepository.existsTag(command.pratoId, command.tagId)) {
      throw new ConflictException('Tag já está vinculada ao prato');
    }

    return this.pratoRepository.addTag(command.pratoId, command.tagId);
  }
}
