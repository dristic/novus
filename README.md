Novus
===========
Novus is a multiplayer asteroids style game written in javascript and HTML 5. It is targeted to be seamless across phones, tablets, and desktops.

# Getting Started

## Dependencies

This project is built on top of Node.js technologies. Before you start, install the following packages using `$ sudo npm install <package_name>`

 * (-g) grunt : Command line build tool (use -g for global install)
 * connect : Web server middleware
 * connect-compiler : Web request compiler for .coffee, sass, jade, and more
 * coffee-script : Scripting language that compiles to Javascript
 * stylus : Css framework
 * nib : Stylus plugin for css3 functions (gradient, buttons, etc.)
 * (-g) coffee-toaster: Dependency management for coffee files

 ## Project Layout

 * dist : Current build of the js library
 * lib : Current .js files built from src
 * public : Public HTML and CSS files
 * src : Coffeescript source that builds to lib/

 ## Grunt Tasks

 Grunt is used to build and serve up the project files. To build the project navigate to the root folder and use `$ grunt build`. This will compile coffeescript, run qunit tests, concat lib/ files, and finally min lib/ files into dist/.

 To serve up files run `$ grunt server`. Then open up `http://localhost:8000/index.html` to view the project.