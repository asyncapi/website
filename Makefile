# Makefile

APP_NAME=asyncapi-website
CONTAINER_NAME=asyncapi-website-container
PORT=3000

# Build, Run, and Show Logs
run:
	@echo "Building Docker image..."
	@docker build -t $(APP_NAME) .
	@echo "Stopping and removing any existing container..."
	@docker stop $(CONTAINER_NAME) || true
	@docker rm $(CONTAINER_NAME) || true
	@echo "Starting Docker container..."
	@docker run -d --name $(CONTAINER_NAME) -v "$$(pwd)":/async -p $(PORT):$(PORT) $(APP_NAME)
	@sleep 2 # Allow container to start
	@echo "Displaying Docker logs..."
	@docker logs -f $(CONTAINER_NAME)

# Clean Docker Images
clean:
	@echo "Cleaning up Docker images..."
	@docker rmi $(APP_NAME) || true
	@docker system prune -f || true
