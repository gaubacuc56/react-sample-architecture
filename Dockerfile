# Base image
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Accept build argument for mode
ARG MODE
ENV MODE=${MODE}

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the application based on the mode
RUN npm run build -- --mode $MODE

# Use a lightweight web server to serve the build output
FROM nginx:alpine

# Remove the default nginx index.html
RUN rm /usr/share/nginx/html/*

# Copy build output to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Command to run the server
CMD ["nginx", "-g", "daemon off;"]
