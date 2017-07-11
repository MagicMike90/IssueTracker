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


# Run project
- Open two terminals, one is for `npm run watch` to auto transform ES2015, another is for `npm start` to start node server.


# Export a module 
```javascript
//module
function foo() {}
module.exports = foo

//include module
const foo = require('./foo.js');).

//then use function directly
foo();

```
```javascript
//module
function foo() {}
module.exports = module.exports = {
    foo: foo
};

//include module
const myfoo = require('./foo.js');).

//use function of part of the object
myfoo.foo();
```


You are actualy listening on localhost only. To be reachable from outside replace the following line in your package.json file:

"start": "webpack-dev-server --inline --content-base ."
by :

"start": "webpack-dev-server --host 0.0.0.0 --inline --content-base ."


keep a link to the Bootstrap distribution under the `static` directory, and include the CSS just as you would use other static files such as `index.html`
itself.
```
ln -s ../node_modules/bootstrap/dist static/bootstrap
```


# Deployment
## Security
If you decide to not use a proxy and make the Express server directly face the
Internet traffic, the first roadblock you will hit when deploying the application is that you
will need root access on the server for Node.js to run. One option is to install Node.js
and the application under /root and run it under root privileges. But this is dangerous
because it exposes any vulnerabilities in the application or the underlying platform to
hackers. It’s always safer to use a reverse proxy such as apache or nginx to terminate the
requests coming in via the Internet, and run the actual Node.js process as a non-root user.
This way, even if a hacker gains access to the server via unknown security vulnerabilities in your code or Node.js, the maximum they can get is a regular user access. This is not so damaging as access as a root user, who gains complete control over the server.
