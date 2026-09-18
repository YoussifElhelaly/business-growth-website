# Stage 1: Build the frontend
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files and install ALL dependencies (including dev for Vite)
COPY package*.json ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the frontend into /dist
RUN npm run build

# Stage 2: Production runtime
FROM node:22-alpine

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the built frontend and backend code from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/shared ./shared

# Ensure volume mount points exist
RUN mkdir -p server/data server/uploads

# Expose the API port
EXPOSE 4001

# Set the environment variable to production
ENV NODE_ENV=production
ENV API_PORT=4001

# Command to run the backend which serves API and frontend
CMD ["node", "server/index.js"]
