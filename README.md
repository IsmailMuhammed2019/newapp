# SBTS Student Registration System

A comprehensive student registration system for SBTS Group and Digital Bridge Institute, built with Next.js frontend and NestJS backend.

## 🚀 Quick Start with Docker

The easiest way to run the application is using Docker containers.

### Prerequisites

- Docker and Docker Compose installed
- At least 4GB RAM available
- Ports 3000, 3001, 5432, 6379 available

### Production Setup

```bash
# Clone the repository
git clone <repository-url>
cd newapp

# Build and start all services
make setup

# Or manually:
make build
make up
```

### Development Setup

```bash
# Start development environment with hot reloading
make setup-dev

# Or manually:
docker-compose -f docker-compose.dev.yml up -d
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Database**: localhost:5432
- **Redis**: localhost:6379

## 🏗️ Architecture

The application is containerized with the following services:

### Production Services
- **Frontend**: Next.js application (port 3000)
- **Backend**: NestJS API server (port 3001)
- **Database**: PostgreSQL 15 (port 5432)
- **Cache**: Redis 7 (port 6379)
- **Proxy**: Nginx reverse proxy (port 80/443)

### Development Services
- **Frontend**: Next.js with hot reloading
- **Backend**: NestJS with debugging enabled
- **Database**: PostgreSQL with development data
- **Cache**: Redis for development

## 📁 Project Structure

```
newapp/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # React components
│   │   └── store/           # Zustand state management
│   ├── Dockerfile           # Production Dockerfile
│   └── Dockerfile.dev       # Development Dockerfile
├── backend/                  # NestJS backend application
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── services/        # Business logic
│   │   ├── entities/        # Database entities
│   │   └── dto/             # Data transfer objects
│   ├── Dockerfile           # Production Dockerfile
│   └── Dockerfile.dev       # Development Dockerfile
├── nginx/                    # Nginx configuration
│   └── nginx.conf           # Reverse proxy config
├── docker-compose.yml        # Production services
├── docker-compose.dev.yml    # Development services
└── Makefile                  # Docker management commands
```

## 🛠️ Docker Commands

### Production Commands
```bash
make build      # Build all images
make up         # Start production services
make down       # Stop services
make logs       # View logs
make restart    # Restart services
make status     # Check service status
```

### Development Commands
```bash
make dev        # Start development environment
make dev-down   # Stop development environment
make dev-logs   # View development logs
```

### Utility Commands
```bash
make clean      # Remove all containers, images, volumes
make health     # Check service health
make db-backup  # Backup database
make db-restore # Restore database (FILE=backup.sql)
```

## 🔧 Configuration

### Environment Variables

The application uses environment variables for configuration. Key variables:

**Backend (.env)**
```env
NODE_ENV=production
PORT=3001
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=sbts_db
DATABASE_USER=sbts_user
DATABASE_PASSWORD=sbts_password
JWT_SECRET=your-secret-key
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Database

The PostgreSQL database is automatically initialized with:
- Sample programs from the course catalog
- Assessment templates
- Required database extensions

## 📊 Features

### Student Registration
- Multi-step registration form
- Document upload support
- Payment integration (Paystack, Flutterwave, LeadRemit)
- Email notifications
- Assessment scheduling

### Admin Features
- Student management
- Program management
- Assessment creation and management
- Payment tracking
- Email management

### Technical Features
- TypeScript throughout
- PostgreSQL database
- Redis caching
- File upload handling
- JWT authentication
- Rate limiting
- Health checks

## 🔒 Security

- JWT-based authentication
- Rate limiting on API endpoints
- Input validation and sanitization
- Secure file upload handling
- Environment-based configuration
- Non-root container users

## 📈 Monitoring

- Health check endpoints
- Container health checks
- Application logging
- Database monitoring
- Performance metrics

## 🚀 Deployment

### Production Deployment

1. **Environment Setup**
   ```bash
   # Set production environment variables
   export NODE_ENV=production
   export JWT_SECRET=your-production-secret
   ```

2. **SSL Configuration**
   - Update nginx/nginx.conf with your domain
   - Add SSL certificates to nginx/ssl/
   - Uncomment HTTPS server block

3. **Deploy**
   ```bash
   make build
   make up
   ```

### Cloud Deployment

The application is ready for deployment on:
- AWS ECS/Fargate
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform
- Railway
- Render

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**
   ```bash
   # Check what's using the ports
   lsof -i :3000
   lsof -i :3001
   lsof -i :5432
   ```

2. **Database connection issues**
   ```bash
   # Check database logs
   make logs
   # Or specifically:
   docker-compose logs postgres
   ```

3. **Build failures**
   ```bash
   # Clean and rebuild
   make clean
   make build
   ```

4. **Memory issues**
   ```bash
   # Check container resource usage
   docker stats
   ```

### Logs and Debugging

```bash
# View all logs
make logs

# View specific service logs
make backend-logs
make frontend-logs
make postgres-logs

# Debug development environment
docker-compose -f docker-compose.dev.yml logs -f
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: training@sbtsgroup.com
- Phone: +1-571-276-2203
- Website: www.sbtsgroup.com

---

**SBTS Group & Digital Bridge Institute** - Building Africa's Digital Future Through Excellence in Training 