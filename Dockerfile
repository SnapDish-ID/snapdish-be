# Production Dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install all dependencies (including dev dependencies)
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN yarn run build

# Stage 2: Production
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/dist ./dist
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --production

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["yarn", "start"]