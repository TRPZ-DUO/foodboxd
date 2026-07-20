import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoriaController } from './controllers/categoria.controller';
import { PrismaCategoriaRepository } from './repositories/prisma-categoria.repository';
import { CategoriaRepository } from './repositories/categoria.repository';
import { CreateCategoriaHandler } from './commands/create-categoria/create-categoria.handler';
import { GetCategoriaByNomeHandler } from './queries/get-categoria-by-nome/get-categoria-by-nome.handler';
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
    GetCategoriaByNomeHandler,
    GetCategoriasHandler,
  ],
})
export class CategoriaModule {}
