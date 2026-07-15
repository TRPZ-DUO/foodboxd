import { Injectable } from '@nestjs/common';
import { RestauranteRepository } from './restaurante.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrismaRestauranteRepository implements RestauranteRepository {
  constructor(private readonly prisma: PrismaService) {}
}
