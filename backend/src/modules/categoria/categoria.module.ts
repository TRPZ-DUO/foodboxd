import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '../../prisma/prisma.module';
import { CategoriaController } from './controllers/categoria.controller';
import { PrismaCategoriaRepository } from './repositories/prisma-categoria.repository';
import { CategoriaRepository } from './repositories/categoria.repository';
import { CreateCategoriaHandler } from './commands/create-categoria.handler';
import { GetCategoriaHandler } from './queries/get-categoria/get-categoria.handler';
import { GetCategoriasHandler } from './queries/get-categorias/get-categorias.handler';

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [CategoriaController],
  providers: [
    PrismaCategoriaRepository,

    {
      provide: CategoriaRepository,
      useClass: PrismaCategoriaRepository,
    },

    CreateCategoriaHandler,
    GetCategoriaHandler,
    GetCategoriasHandler,
  ],
})
export class CategoriaModule {}
