#!/bin/bash

# SBTS Application Setup Script
# This script sets up the Docker environment for the SBTS application

set -e

echo "🚀 SBTS Application Setup"
echo "=========================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if ports are available
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "❌ Port $1 is already in use. Please free up port $1."
        exit 1
    fi
}

echo "🔍 Checking port availability..."
check_port 3000
check_port 3001
check_port 5432
check_port 6379
echo "✅ All ports are available"

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p backend/uploads
mkdir -p nginx/ssl
echo "✅ Directories created"

# Set up environment files if they don't exist
if [ ! -f backend/.env ]; then
    echo "📝 Creating backend environment file..."
    cat > backend/.env << EOF
NODE_ENV=production
PORT=3001
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=sbts_db
DATABASE_USER=sbts_user
DATABASE_PASSWORD=sbts_password
REDIS_HOST=redis
REDIS_PORT=6379
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
EOF
    echo "✅ Backend environment file created"
fi

if [ ! -f frontend/.env.local ]; then
    echo "📝 Creating frontend environment file..."
    cat > frontend/.env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
    echo "✅ Frontend environment file created"
fi

# Build and start services
echo "🔨 Building Docker images..."
docker-compose build

echo "🚀 Starting services..."
docker-compose up -d

echo "⏳ Waiting for services to start..."
sleep 30

# Check service health
echo "🔍 Checking service health..."
if curl -f http://localhost:3001/health > /dev/null 2>&1; then
    echo "✅ Backend is healthy"
else
    echo "❌ Backend health check failed"
fi

if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Frontend is healthy"
else
    echo "❌ Frontend health check failed"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📱 Access your application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:3001"
echo "   Database: localhost:5432"
echo ""
echo "📋 Useful commands:"
echo "   View logs: make logs"
echo "   Stop services: make down"
echo "   Restart services: make restart"
echo "   Check status: make status"
echo ""
echo "🔧 For development:"
echo "   Start dev environment: make dev"
echo "   Stop dev environment: make dev-down"
echo ""
echo "Happy coding! 🚀" 