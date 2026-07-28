FROM node:alpine AS base
WORKDIR /app

# Install build dependencies.
FROM base AS install
COPY package*.json ./
RUN npm ci

# Test for errors and warnings.
FROM base AS test
COPY --from=install /app/node_modules node_modules
COPY --from=install /app/package*.json ./
COPY . .

RUN npm sv check --format human-verbose --fail-on-warnings

# Create build image.
FROM base AS builder
COPY --from=test /app/node_modules node_modules
COPY --from=test /app/package*.json ./
COPY . .

# Set SvelteKit environment static variables.
ENV PUBLIC_POCKETBASE_URL=https://api.mattismoel.dev
ENV POCKETBASE_URL=http://portfolio_backend:8080

RUN npm run build
RUN npm prune --omit=dev # Remove dev dependencies, as they are not needed for the build.

FROM base AS deployment
COPY --from=builder /app/build build
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json .

ENV NODE_ENV="production"

EXPOSE 3000

ENTRYPOINT [ "node", "build" ]
