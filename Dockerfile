# Use an official base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Your app might build or transpile here
RUN npm run build

# Specify the command to run your app
CMD [ "npm", "start" ]

# Open a port for your app if it's a web server
EXPOSE 3000
