Novus
===========
Novus is a game engine written in javascript and HTML 5 on top of canvas. The main goal of Novus is to provide an easy way to create HTML 5 games that work on any platform.

# Getting Started

## Quick Start

This project is built on top of Node.js technologies. Before you start you should have the latest `node` and `npm` installed on your system.

After that install dependencies using `npm install`

From here cd into to the example you want to check out and run: `./../../bin/novus server`

It should tell you the server is running. Now navigate to `http://localhost:8000` and you should see the example for the directory you are in.

## Prereqs for Contributing

Install git flow using `brew install git-flow` and run `git flow init`. Check out git flow and how to use it for contributing [here](https://github.com/nvie/gitflow)

Also install PhantomJs as it is used to run Jasmine tests. You can use `brew install phantomjs` or any other method of installation.

## Grunt

The engine is built on top of a great CLI tool called grunt. We have updated to version 0.4 so please follow the new [getting started guide](https://github.com/gruntjs/grunt/wiki/Getting-started)

## Project Layout

 * bin : Holds the version of our CLI
 * dist : Current build of the js library (can be created using `grunt build`)
 * lib : Holds the vendor libraries used
 * src : Coffeescript source of the engine
 * test: Jasmine test framework specs are here

## Contributing

Grunt is used to build and run tests. To build the project navigate to the root folder and use `$ grunt build`. This will compile coffeescript, run jasmine tests, concat files, and finally create a build.

Feel free to create pull requests and issues. Follow the coding standards and write tests for all new features.