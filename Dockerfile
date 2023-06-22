# Start with the official Node.js 14 image.
FROM node:18-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy local code to the container image.
COPY . ./

# Build the application
RUN npm run build

# Run the web service on container startup.
CMD ["npm", "start"]
