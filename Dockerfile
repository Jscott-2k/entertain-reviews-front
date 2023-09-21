# Development Stage
FROM node:18.12.1 as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]

# Production Stage
FROM node:18.12.1 as production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm run build -- --prod

# Use the official Nginx base image for serving the app in production
FROM nginx:1.21 as final

# Copy the built app from the production stage to the Nginx public directory
COPY --from=production /usr/src/app/dist/EnterReview-Front /usr/share/nginx/html

# Expose the port on which Nginx will listen
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]