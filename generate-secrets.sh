#!/bin/bash

# Generate Secure JWT Secrets for Production
# This script generates cryptographically secure JWT secrets

echo "🔐 Generating Secure JWT Secrets for Production"
echo "================================================"

# Generate JWT Secret
JWT_SECRET=$(openssl rand -base64 64 | tr -d "=+/" | cut -c1-64)
JWT_REFRESH_SECRET=$(openssl rand -base64 64 | tr -d "=+/" | cut -c1-64)

echo ""
echo "✅ Generated JWT Secrets:"
echo ""
echo "JWT_SECRET=$JWT_SECRET"
echo "JWT_REFRESH_SECRET=$JWT_REFRESH_SECRET"
echo ""

echo "📝 Copy these secrets to your production environment file:"
echo "   backend/env.production"
echo ""
echo "⚠️  IMPORTANT:"
echo "   - Keep these secrets secure and never commit them to version control"
echo "   - Use different secrets for each environment (dev, staging, prod)"
echo "   - Rotate these secrets regularly in production"
echo ""

# Create a secure secrets file (optional)
if [ "$1" = "--save" ]; then
    echo "💾 Saving secrets to .secrets file..."
    cat > .secrets << EOF
# Generated on $(date)
# DO NOT COMMIT THIS FILE TO VERSION CONTROL
JWT_SECRET=$JWT_SECRET
JWT_REFRESH_SECRET=$JWT_REFRESH_SECRET
EOF
    echo "✅ Secrets saved to .secrets file"
    echo "   Add .secrets to your .gitignore file"
fi

echo "🎉 Secret generation complete!" 