# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Expose the app's port
EXPOSE 3000

# Start the server
CMD ["nodemon", "in"]
