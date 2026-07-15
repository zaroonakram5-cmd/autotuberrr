FROM node:20-alpine AS base

# Install dependencies
RUN apk add --no-cache \
    ffmpeg \
    python3 \
    make \
    g++ \
    vips-dev

WORKDIR /home/user

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Generate Prisma client
COPY prisma ./prisma/
RUN pnpm prisma generate

# Copy source code
COPY . .

# Build application
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]