Novus
===========
Novus is a multiplayer asteroids style game written in javascript and HTML 5. It is targeted to be seamless across phones, tablets, and desktops.

# Getting Started

## Dependencies

This project is built on top of Node.js technologies. Before you start you should have the latest `node` and `npm` installed on your system.

This is built on the grunt npm package so install by running `npm install -g grunt`

After that install dependencies using `npm install`

Run the server and look in the public/index.html for the game.

## Project Layout

 * dist : Current build of the js library
 * lib : Current .js files built from src
 * public : Public HTML and CSS files
 * src : Coffeescript source that builds to lib/

## Grunt Tasks

Grunt is used to build and serve up the project files. To build the project navigate to the root folder and use `$ grunt build`. This will compile coffeescript, run qunit tests, concat lib/ files, and finally min lib/ files into dist/.

To serve up files run `$ grunt server`. Then open up `http://localhost:8000/index.html` to view the project.

## FAQ

If you get an error with coffeePath you probably have to update your version of connect-coffee-script. Go to node_modules/connect-coffee-script/lib/middleware.js and change line 91 from:

`js = options.compile(str, options);`

to

`js = options.compile(str, options, coffeePath);`