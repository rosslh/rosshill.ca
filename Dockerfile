# Stage 1: Build
FROM node:20-alpine AS builder

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --force

COPY . .

ENV VITE_ENV=production
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./

ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "build/index.js"]
