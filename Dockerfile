# Development Docker file
FROM node:18-alpine

WORKDIR /async

# Install development dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .


# Run linting during build to catch errors early
RUN npm run lint || exit 1

# Use a separate production stage to keep the image lightweight
FROM node:18-alpine AS development

# Set working directory
WORKDIR /async

# Copy node_modules and built files from builder stage
COPY --from=builder /async /async

# Expose the port for development (if needed)
EXPOSE 3000

# Set environment variables for development (optional)
ENV NODE_ENV=development

CMD ["npm", "run", "dev"]
