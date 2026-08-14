/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Categoria` will be added. If there are existing duplicate values, this will fail.
  - Made the column `categoriaId` on table `Restaurante` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Visibilidade" AS ENUM ('PUBLICO', 'PRIVADO');

-- CreateEnum
CREATE TYPE "TipoAtividade" AS ENUM ('AVALIACAO_CRIADA', 'COMENTARIO_CRIADO', 'FAVORITO_ADICIONADO', 'LISTA_CRIADA', 'SEGUIDOR_ADICIONADO');

-- DropForeignKey
ALTER TABLE "Restaurante" DROP CONSTRAINT "Restaurante_categoriaId_fkey";

-- AlterTable
ALTER TABLE "Restaurante" ALTER COLUMN "categoriaId" SET NOT NULL;

-- CreateTable
CREATE TABLE "Prato" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "imagemUrl" TEXT,
    "mediaAvaliacoes" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "restauranteId" UUID NOT NULL,

    CONSTRAINT "Prato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PratoTag" (
    "pratoId" UUID NOT NULL,
    "tagId" UUID NOT NULL,

    CONSTRAINT "PratoTag_pkey" PRIMARY KEY ("pratoId","tagId")
);

-- CreateTable
CREATE TABLE "Avaliacao" (
    "id" UUID NOT NULL,
    "nota" DECIMAL(2,1) NOT NULL,
    "descricao" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "pratoId" UUID NOT NULL,
    "usuarioId" UUID NOT NULL,

    CONSTRAINT "Avaliacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FotoAvaliacao" (
    "id" UUID NOT NULL,
    "urlImagem" TEXT,
    "avaliacaoId" UUID NOT NULL,

    CONSTRAINT "FotoAvaliacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurtidaAvaliacao" (
    "id" UUID NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "avaliacaoId" UUID NOT NULL,
    "usuarioId" UUID NOT NULL,

    CONSTRAINT "CurtidaAvaliacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorito" (
    "id" UUID NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" UUID NOT NULL,
    "pratoId" UUID NOT NULL,

    CONSTRAINT "Favorito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lista" (
    "id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "visibilidade" "Visibilidade" NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" UUID NOT NULL,

    CONSTRAINT "Lista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemLista" (
    "id" UUID NOT NULL,
    "posicao" INTEGER NOT NULL,
    "pratoId" UUID NOT NULL,
    "listaId" UUID NOT NULL,

    CONSTRAINT "ItemLista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seguidor" (
    "id" UUID NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seguidorId" UUID NOT NULL,
    "seguidoId" UUID NOT NULL,

    CONSTRAINT "Seguidor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" UUID NOT NULL,
    "conteudo" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "avaliacaoId" UUID NOT NULL,
    "usuarioId" UUID NOT NULL,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurtidaComentario" (
    "id" UUID NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comentarioId" UUID NOT NULL,
    "usuarioId" UUID NOT NULL,

    CONSTRAINT "CurtidaComentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atividade" (
    "id" UUID NOT NULL,
    "tipo" "TipoAtividade" NOT NULL,
    "usuarioId" UUID NOT NULL,
    "referenciaId" UUID NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Atividade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Prato_restauranteId_nome_idx" ON "Prato"("restauranteId", "nome");

-- CreateIndex
CREATE INDEX "Prato_nome_idx" ON "Prato"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_nome_key" ON "Tag"("nome");

-- CreateIndex
CREATE INDEX "PratoTag_tagId_idx" ON "PratoTag"("tagId");

-- CreateIndex
CREATE INDEX "Avaliacao_pratoId_idx" ON "Avaliacao"("pratoId");

-- CreateIndex
CREATE UNIQUE INDEX "Avaliacao_usuarioId_pratoId_key" ON "Avaliacao"("usuarioId", "pratoId");

-- CreateIndex
CREATE INDEX "FotoAvaliacao_avaliacaoId_idx" ON "FotoAvaliacao"("avaliacaoId");

-- CreateIndex
CREATE INDEX "CurtidaAvaliacao_avaliacaoId_idx" ON "CurtidaAvaliacao"("avaliacaoId");

-- CreateIndex
CREATE UNIQUE INDEX "CurtidaAvaliacao_avaliacaoId_usuarioId_key" ON "CurtidaAvaliacao"("avaliacaoId", "usuarioId");

-- CreateIndex
CREATE INDEX "Favorito_usuarioId_idx" ON "Favorito"("usuarioId");

-- CreateIndex
CREATE INDEX "Favorito_pratoId_idx" ON "Favorito"("pratoId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorito_usuarioId_pratoId_key" ON "Favorito"("usuarioId", "pratoId");

-- CreateIndex
CREATE INDEX "ItemLista_listaId_idx" ON "ItemLista"("listaId");

-- CreateIndex
CREATE INDEX "ItemLista_pratoId_idx" ON "ItemLista"("pratoId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemLista_listaId_pratoId_key" ON "ItemLista"("listaId", "pratoId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemLista_listaId_posicao_key" ON "ItemLista"("listaId", "posicao");

-- CreateIndex
CREATE INDEX "Seguidor_seguidorId_idx" ON "Seguidor"("seguidorId");

-- CreateIndex
CREATE INDEX "Seguidor_seguidoId_idx" ON "Seguidor"("seguidoId");

-- CreateIndex
CREATE UNIQUE INDEX "Seguidor_seguidorId_seguidoId_key" ON "Seguidor"("seguidorId", "seguidoId");

-- CreateIndex
CREATE INDEX "CurtidaComentario_comentarioId_idx" ON "CurtidaComentario"("comentarioId");

-- CreateIndex
CREATE INDEX "CurtidaComentario_usuarioId_idx" ON "CurtidaComentario"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "CurtidaComentario_comentarioId_usuarioId_key" ON "CurtidaComentario"("comentarioId", "usuarioId");

-- CreateIndex
CREATE INDEX "Atividade_usuarioId_criadoEm_id_idx" ON "Atividade"("usuarioId", "criadoEm", "id");

-- CreateIndex
CREATE INDEX "Atividade_criadoEm_idx" ON "Atividade"("criadoEm");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_key" ON "Categoria"("nome");

-- CreateIndex
CREATE INDEX "Restaurante_categoriaId_idx" ON "Restaurante"("categoriaId");

-- CreateIndex
CREATE INDEX "Restaurante_nome_idx" ON "Restaurante"("nome");

-- AddForeignKey
ALTER TABLE "Restaurante" ADD CONSTRAINT "Restaurante_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prato" ADD CONSTRAINT "Prato_restauranteId_fkey" FOREIGN KEY ("restauranteId") REFERENCES "Restaurante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PratoTag" ADD CONSTRAINT "PratoTag_pratoId_fkey" FOREIGN KEY ("pratoId") REFERENCES "Prato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PratoTag" ADD CONSTRAINT "PratoTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_pratoId_fkey" FOREIGN KEY ("pratoId") REFERENCES "Prato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FotoAvaliacao" ADD CONSTRAINT "FotoAvaliacao_avaliacaoId_fkey" FOREIGN KEY ("avaliacaoId") REFERENCES "Avaliacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurtidaAvaliacao" ADD CONSTRAINT "CurtidaAvaliacao_avaliacaoId_fkey" FOREIGN KEY ("avaliacaoId") REFERENCES "Avaliacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurtidaAvaliacao" ADD CONSTRAINT "CurtidaAvaliacao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorito" ADD CONSTRAINT "Favorito_pratoId_fkey" FOREIGN KEY ("pratoId") REFERENCES "Prato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorito" ADD CONSTRAINT "Favorito_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lista" ADD CONSTRAINT "Lista_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemLista" ADD CONSTRAINT "ItemLista_pratoId_fkey" FOREIGN KEY ("pratoId") REFERENCES "Prato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemLista" ADD CONSTRAINT "ItemLista_listaId_fkey" FOREIGN KEY ("listaId") REFERENCES "Lista"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seguidor" ADD CONSTRAINT "Seguidor_seguidorId_fkey" FOREIGN KEY ("seguidorId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seguidor" ADD CONSTRAINT "Seguidor_seguidoId_fkey" FOREIGN KEY ("seguidoId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_avaliacaoId_fkey" FOREIGN KEY ("avaliacaoId") REFERENCES "Avaliacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurtidaComentario" ADD CONSTRAINT "CurtidaComentario_comentarioId_fkey" FOREIGN KEY ("comentarioId") REFERENCES "Comentario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurtidaComentario" ADD CONSTRAINT "CurtidaComentario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atividade" ADD CONSTRAINT "Atividade_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
