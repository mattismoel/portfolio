FROM node:alpine AS base
WORKDIR /app

# Set SvelteKit environment static variables.
ENV PUBLIC_POCKETBASE_URL=https://api.mattismoel.dev
ENV POCKETBASE_URL=http://portfolio_backend:8080

# Install build dependencies.
FROM base AS install
COPY package*.json ./
RUN npm ci

# Test for errors and warnings.
FROM base AS testing
COPY --from=install /app/node_modules node_modules
COPY --from=install /app/package*.json ./
COPY . .

RUN npx svelte-kit sync
RUN npx sv check --output human-verbose --fail-on-warnings

# Create build files.
FROM testing AS builder
RUN npm run build
RUN npm prune --omit=dev # Remove dev dependencies, as they are not needed for the build.

# Create build image.
FROM base AS deployment
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

ENV NODE_ENV="production"

EXPOSE 3000

ENTRYPOINT [ "node", "build" ]
