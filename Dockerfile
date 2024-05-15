FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json separately to leverage Docker cache
COPY package*.json ./

RUN npm install --production


# Copy all files
COPY . .


CMD ["npm","run","dev"]