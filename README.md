Novus
===========
Novus is a game engine written in javascript and HTML 5 on top of canvas. The main goal of Novus is to provide an easy way to create HTML 5 games that work on any platform.

# Getting Started

## Prereqs

Install git flow using `brew install git-flow` and run `git flow init`. Check out git flow and how to use it for contributing [here](https://github.com/nvie/gitflow)

## Quick Start

This project is built on top of Node.js technologies. Before you start you should have the latest `node` and `npm` installed on your system.

The engine is built on top of a great CLI tool called grunt. We have updated to version 0.4 so please follow the new [getting started guide](https://github.com/gruntjs/grunt/wiki/Getting-started)

After that install dependencies using `$ npm install`

Run the server using `$ grunt server` and navigate your browser to http://localhost:8000/public

## Project Layout

 * dist : Current build of the js library (can be created using `grunt build`)
 * lib : Holds the vendor libraries used.
 * public : Public HTML and CSS files
 * src : Coffeescript source of the engine and sample game.
 * test: Jasmine test framework specs are here.

## Grunt Tasks

Grunt is used to build and serve up the project files. To build the project navigate to the root folder and use `$ grunt build`. This will compile coffeescript, run jasmine tests, concat files, and finally create a build.

To serve up files run `$ grunt server`. Then open up `http://localhost:8000/public` to view the project.

## FAQ

If you get an error with coffeePath you probably have to update your version of connect-coffee-script. Go to node_modules/connect-coffee-script/lib/middleware.js and change line 91 from:

`js = options.compile(str, options);`

to

`js = options.compile(str, options, coffeePath);`