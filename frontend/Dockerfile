FROM node:alpine AS base
WORKDIR /app

# Install build dependencies.
FROM base AS install
COPY package*.json ./
RUN npm ci

# Create build image.
FROM base AS builder
COPY --from=install /app/node_modules node_modules
COPY --from=install /app/package*.json ./
COPY . .

# Set SvelteKit environment static variables.
ENV PUBLIC_POCKETBASE_URL=https://api.mattismoel.dev
ENV POCKETBASE_URL=http://portfolio_backend:8080

RUN npm run build

# Test for errors and warnings.
FROM base AS testing
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package*.json ./
COPY . .

RUN npx sv check --output human-verbose --fail-on-warnings

FROM base AS deployment
COPY --from=testing /app/build build
COPY --from=testing /app/node_modules node_modules
COPY --from=testing /app/package.json .

RUN npm prune --omit=dev # Remove dev dependencies, as they are not needed for the build.

ENV NODE_ENV="production"

EXPOSE 3000

ENTRYPOINT [ "node", "build" ]
