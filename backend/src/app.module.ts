import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriaModule } from './modules/categoria/categoria.module';

@Module({
  imports: [CqrsModule, PrismaModule, CategoriaModule],
})
export class AppModule {}
