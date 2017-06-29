# MERN-Stack

## Steps to create a dockerized node project
1. Create a `dockerfile`
```docker
FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 8080
CMD [ "npm", "start" ]
```

2. Create a `.dockerignore` file in the same directory as your `Dockerfile` with following content:
```
node_modules
npm-debug.log
```

3. Build docker image
```
$ docker build -t <your username>/node-web-app .
```
4. Run the image
```
$ docker run -p 49160:8080 -d <your username>/node-web-app
```
5. Print the output of your app:
```
# Get container ID
$ docker ps

# Print app output
$ docker logs <container id>

# Example
Running on http://localhost:8080
```
6. If you need to go inside the container you can use the exec command:
```
# Enter the container
$ docker exec -it <container id> /bin/bash
Test
```
