# Build stage
FROM node:20.10.0-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g npm@latest
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:20.10.0-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/prisma ./prisma
EXPOSE 3000
CMD ["node", "dist/main.js"]
