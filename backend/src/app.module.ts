import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { RestauranteModule } from './modules/restaurante/restaurante.module';

@Module({
  imports: [CqrsModule, PrismaModule, CategoriaModule, RestauranteModule],
})
export class AppModule {}
