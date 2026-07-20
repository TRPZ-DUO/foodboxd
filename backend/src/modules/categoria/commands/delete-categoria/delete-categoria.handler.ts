import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCategoriaCommand } from './delete-categoria.command';
import { CategoriaRepository } from '../../repositories/categoria.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteCategoriaCommand)
export class DeleteCategoriaHandler implements ICommandHandler<DeleteCategoriaCommand> {
  constructor(private readonly repository: CategoriaRepository) {}

  async execute(command: DeleteCategoriaCommand): Promise<any> {
    const categoria = await this.repository.findById(command.id);

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return this.repository.delete(categoria.id);
  }
}
