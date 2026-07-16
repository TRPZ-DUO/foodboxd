import { Injectable } from '@nestjs/common';
import { CategoriaRepository } from './categoria.repository';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class PrismaCategoriaRepository implements CategoriaRepository {
  constructor(private readonly prisma: PrismaService) {}
}
