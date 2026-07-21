import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoriaController } from './controllers/categoria.controller';
import { PrismaCategoriaRepository } from './repositories/prisma-categoria.repository';
import { CategoriaRepository } from './repositories/categoria.repository';
import { CreateCategoriaHandler } from './commands/create-categoria/create-categoria.handler';
import { GetCategoriaByNomeHandler } from './queries/get-categoria-by-nome/get-categoria-by-nome.handler';
import { GetAllCategoriasHandler } from './queries/get-all-categorias/get-categorias.handler';
import { GetCategoriaByIdHandler } from './queries/get-categoria-by-id/get-categoria-by-id.handler';
import { DeleteCategoriaHandler } from './commands/delete-categoria/delete-categoria.handler';
import { UpdateCategoriaHandler } from './commands/update-categoria/update-categoria.handler';

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
    DeleteCategoriaHandler,
    UpdateCategoriaHandler,

    GetCategoriaByNomeHandler,
    GetAllCategoriasHandler,
    GetCategoriaByIdHandler,
  ],
})
export class CategoriaModule {}
