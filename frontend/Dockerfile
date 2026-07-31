# syntax=docker/dockerfile:1

# NOTA: o projeto React/Vite ainda nao existe (issue separada).
# Este Dockerfile assume o layout padrao Vite (package.json com os scripts
# `dev` e `build`, saida em dist/) conforme a stack definida no README.
# Revisar quando o frontend for criado.

FROM node:22-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./

# ---------- desenvolvimento ----------
# Alvo usado pelo docker-compose. --host expoe o dev server fora do container.
FROM base AS development
ENV NODE_ENV=development
RUN npm ci
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# ---------- build ----------
FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

# ---------- producao ----------
FROM nginx:1.27-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
