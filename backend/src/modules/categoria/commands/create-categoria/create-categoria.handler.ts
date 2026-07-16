import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCategoriaCommand } from './create-categoria.command';
import { CategoriaRepository } from '../../repositories/categoria.repository';
import { ConflictException } from '@nestjs/common';
import { Categoria } from '../../entities/categoria.entity';

@CommandHandler(CreateCategoriaHandler)
export class CreateCategoriaHandler implements ICommandHandler<CreateCategoriaCommand> {
  constructor(private readonly repository: CategoriaRepository) {}

  async execute(command: CreateCategoriaCommand): Promise<any> {
    const existe = await this.repository.findByNome(command.nome);

    if (existe) {
      throw new ConflictException('Categoria já cadastrada');
    }

    const categoria = new Categoria(crypto.randomUUID(), command.nome);

    return this.repository.create(categoria);
  }
}
