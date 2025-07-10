# SBTS Application Docker Management
# Makefile for easy Docker operations

.PHONY: help build up down logs clean dev prod restart

# Default target
help:
	@echo "SBTS Application Docker Management"
	@echo ""
	@echo "Available commands:"
	@echo "  make build    - Build all Docker images"
	@echo "  make up       - Start production containers"
	@echo "  make down     - Stop and remove containers"
	@echo "  make logs     - Show container logs"
	@echo "  make clean    - Remove all containers, images, and volumes"
	@echo "  make dev      - Start development environment"
	@echo "  make dev-down - Stop development environment"
	@echo "  make restart  - Restart all containers"
	@echo "  make status   - Show container status"

# Production commands
build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

restart:
	docker-compose restart

status:
	docker-compose ps

# Development commands
dev:
	docker-compose -f docker-compose.dev.yml up -d

dev-down:
	docker-compose -f docker-compose.dev.yml down

dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f

dev-restart:
	docker-compose -f docker-compose.dev.yml restart

# Cleanup commands
clean:
	docker-compose down -v --rmi all
	docker system prune -f
	docker volume prune -f

# Database commands
db-backup:
	docker exec sbts_postgres pg_dump -U sbts_user sbts_db > backup_$(shell date +%Y%m%d_%H%M%S).sql

db-restore:
	@echo "Usage: make db-restore FILE=backup_file.sql"
	@if [ -z "$(FILE)" ]; then echo "Please specify FILE parameter"; exit 1; fi
	docker exec -i sbts_postgres psql -U sbts_user sbts_db < $(FILE)

# Individual service commands
backend-logs:
	docker-compose logs -f backend

frontend-logs:
	docker-compose logs -f frontend

postgres-logs:
	docker-compose logs -f postgres

# Health checks
health:
	@echo "Checking service health..."
	@curl -f http://localhost:3001/health || echo "Backend health check failed"
	@curl -f http://localhost:3000 || echo "Frontend health check failed"
	@echo "Health checks completed"

# Setup commands
setup:
	@echo "Setting up SBTS application..."
	make build
	make up
	@echo "Waiting for services to start..."
	@sleep 30
	make health
	@echo "Setup completed! Access the application at http://localhost:3000"

setup-dev:
	@echo "Setting up SBTS development environment..."
	docker-compose -f docker-compose.dev.yml build
	docker-compose -f docker-compose.dev.yml up -d
	@echo "Development environment started! Access the application at http://localhost:3000" 