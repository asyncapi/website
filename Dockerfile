# Production Docker file 
FROM node:18-alpine as builder

WORKDIR /async

COPY package.json package-lock.json scripts ./

RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine AS PRODUCTION_STAGE
WORKDIR /async

COPY --from=builder /async/package*.json ./
COPY --from=builder /async/scripts ./
COPY --from=builder /async/.next ./.next
COPY --from=builder /async/public ./public
COPY --from=builder /async/node_modules ./node_modules

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]