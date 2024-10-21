# Development Docker file

# Stage 1: Dependency fetching step
FROM node:18-alpine AS deps

WORKDIR /async

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Stage 2: Development environment
FROM node:18-alpine AS dev

WORKDIR /async

# Copy only node_modules from dependency stage by avoiding temporary caches formed
COPY --from=deps /async/node_modules ./node_modules

COPY . .

EXPOSE 3000

# Set environment variables for development
ENV NODE_ENV=development

CMD ["npm", "run", "dev"]
