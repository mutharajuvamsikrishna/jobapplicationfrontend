# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json separately to leverage Docker cache
COPY package*.json ./

RUN npm install --production

# Copy only necessary files for building
COPY . .

# Stage 2: Final
FROM node:18-alpine

WORKDIR /app

# Copy only the built files and production dependencies from the build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

CMD ["npm", "run", "dev"]
