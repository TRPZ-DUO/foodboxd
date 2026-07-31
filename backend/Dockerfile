# syntax=docker/dockerfile:1

# Estagio base: dependencias comuns a dev e build.
# O schema e copiado antes do npm ci porque o postinstall roda `prisma generate`.
# Os tsconfig tambem: o gerador do Prisma le o moduleResolution para decidir a
# extensao dos imports do client. Sem eles, ele gera imports ".ts" e o build
# quebra em runtime com "Cannot find module './internal/class.ts'".
FROM node:22-alpine AS base
WORKDIR /app
COPY package.json package-lock.json tsconfig.json tsconfig.build.json ./
COPY prisma ./prisma

# ---------- desenvolvimento ----------
# Alvo usado pelo docker-compose: roda em watch mode.
# O codigo vem por bind mount, entao aqui so instalamos as dependencias.
FROM base AS development
ENV NODE_ENV=development
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

# ---------- build ----------
FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

# ---------- producao ----------
FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json tsconfig.json tsconfig.build.json ./
COPY prisma ./prisma
# --omit=dev nao remove o prisma: ele esta em dependencies e o postinstall precisa dele.
RUN npm ci --omit=dev
# O client gerado e compilado junto com src/, entao vem em dist/generated/prisma.
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/main"]
