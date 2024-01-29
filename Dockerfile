# Use an official base image
FROM node:18-alpine as BUILD_IMAGE

# Set the working directory in the container
WORKDIR /app/react-app

# Copy package.json and package-lock.json
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Your app might build or transpile here
RUN npm run build

FROM node:18-alpine as PRODUCTION_IMAGE
WORKDIR /app/react-app

COPY --from=BUILD_IMAGE /app/react-app/dist app/react-app/dist
EXPOSE 8080

COPY package.json .
COPY vite.config.ts .

RUN npm install typescript

EXPOSE 8080
# Specify the command to run your app
CMD [ "npm", "run", "preview" ]

