FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json separately to leverage Docker cache
COPY package*.json ./
COPY vite.config.js ./
RUN npm install --production
# Install Vite globally
RUN npm install -g vite

# Copy all files
COPY . .


CMD ["npm","run","dev"]