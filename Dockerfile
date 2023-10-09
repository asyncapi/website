# Development Docker file
FROM node:18-alpine as development

WORKDIR /async

# Install development dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port for development (if needed)
EXPOSE 3000

# Set environment variables for development (optional)
ENV NODE_ENV=development

CMD ["npm", "run", "dev"]
