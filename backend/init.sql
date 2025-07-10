-- Initialize SBTS Database
-- This script runs when the PostgreSQL container starts for the first time

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the database user
CREATE USER sbts_user WITH PASSWORD 'sbts_password';

-- Create the database
CREATE DATABASE sbts_db OWNER sbts_user;

-- Grant privileges to the user
GRANT ALL PRIVILEGES ON DATABASE sbts_db TO sbts_user;

-- Connect to the sbts_db database
\c sbts_db;

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO sbts_user;

-- Note: Tables will be created by TypeORM when the application starts
-- Sample data will be inserted by the application after schema creation 