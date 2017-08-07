# MERN-Stack

A project built with MongoDB, ExpressJS, ReactJS , NodeJS, React Roter V4 and Webpack.


# Run project
## Docker method
```
docker-compose up --build
```
## npm method
```
npm run dev-all-hook
```



## Notes:

- Open two terminals, one is for `npm run watch` to auto transform ES2015, another is for `npm start` to start node server.


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


# Execute a JavaScript file
mongo localhost:27018/issueTracker generate_data.mongo.js
