# Stage 1: Build the React app
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application code
COPY . .

# Build the app
RUN npm run build

# Expose port 
EXPOSE 4173

# Start Nginx
CMD ["npm", "run", "start"]
    