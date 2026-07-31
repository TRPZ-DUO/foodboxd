import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { RestauranteModule } from './modules/restaurante/restaurante.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CqrsModule,
    PrismaModule,
    CategoriaModule,
    RestauranteModule,
  ],
})
export class AppModule {}
