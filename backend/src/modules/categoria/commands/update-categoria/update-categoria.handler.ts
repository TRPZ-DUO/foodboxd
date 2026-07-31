/* eslint-disable prettier/prettier */
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateCategoriaCommand } from "./update-categoria.command";
import { CategoriaRepository } from "../../repositories/categoria.repository";
import { Categoria } from "../../entities/categoria.entity";
import { ConflictException, NotFoundException } from "@nestjs/common";

@CommandHandler(UpdateCategoriaCommand)
export class UpdateCategoriaHandler implements ICommandHandler<UpdateCategoriaCommand> {
    constructor(private readonly repository: CategoriaRepository) {}

    async execute(command: UpdateCategoriaCommand): Promise<Categoria> {
        const categoria = await this.repository.findById(command.id);
        const categoriaMesmoNome = await this.repository.findByNome(command.nome);

        if (categoriaMesmoNome && categoriaMesmoNome.id !== command.id) {
            throw new ConflictException('Categoria já cadastrada.')
        }

        if (!categoria) {
            throw new NotFoundException('Categoria não encontrada');
        }

        categoria.nome = command.nome;

        return this.repository.update(categoria);
    }   
}