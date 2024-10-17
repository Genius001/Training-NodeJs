# Use Node.js version 18 compatible with Prisma
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock for dependency caching
COPY package*.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install --frozen-lockfile

# Copy .env file before generating Prisma client
COPY .env .env

# Copy Prisma files and generate Prisma client
COPY prisma ./prisma/
RUN npx prisma generate

# Run Prisma migrations to ensure database schema is up-to-date
RUN npx prisma migrate deploy

# Copy entire application code
COPY . .

# Expose port for the application
EXPOSE 3000

# Command to run the application
CMD ["yarn", "start"]
