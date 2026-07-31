import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { RestauranteModule } from './modules/restaurante/restaurante.module';
import { AuthModule } from './modules/auth/auth.module';
import { PratoModule } from './modules/prato/prato.module';
import { BuscaModule } from './modules/busca/busca.module';
import { ComentarioModule } from './modules/comentario/comentario.module';
import { ConquistaModule } from './modules/conquista/conquista.module';
import { FavoritoModule } from './modules/favorito/favorito.module';
import { FeedModule } from './modules/feed/feed.module';
import { ListaModule } from './modules/lista/lista.module';
import { NotificacaoModule } from './modules/notificacao/notificacao.module';
import { SeguirModule } from './modules/seguir/seguir.module';
import { TagModule } from './modules/tag/tag.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CqrsModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),

    CategoriaModule,
    RestauranteModule,
    AuthModule,
    PratoModule,
    BuscaModule,
    ComentarioModule,
    ConquistaModule,
    FavoritoModule,
    FeedModule,
    ListaModule,
    NotificacaoModule,
    SeguirModule,
    TagModule,
    UsuarioModule,
  ],
})
export class AppModule {}
