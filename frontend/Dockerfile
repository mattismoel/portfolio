FROM node:alpine AS base
WORKDIR /app

FROM base AS install
COPY package*.json ./
RUN npm ci

FROM base AS builder
COPY --from=install /app/node_modules node_modules
COPY --from=install /app/package*.json ./
COPY . .

ENV PUBLIC_POCKETBASE_URL=https://api.mattismoel.dev
ENV POCKETBASE_URL=http://portfolio_backend:8080

RUN npm run build
RUN npm ci --omit dev

FROM base AS deployment
COPY --from=builder /app/build build
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json .

ENV NODE_ENV="production"

EXPOSE 3000

ENTRYPOINT [ "node", "build" ]
