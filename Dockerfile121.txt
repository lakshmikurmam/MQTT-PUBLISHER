# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Expose port 3000 for the Node.js app
EXPOSE 3000

# Run the Node.js app when the container starts
CMD ["node", "./subscriber.js"]
