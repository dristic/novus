//= require ../../src/novus

// Require additional libraries

//= require ./config/application
//= require_tree entities
//= require_tree scenes
//= require_tree config

nv.ready(function () {
  this.app = new Application();
});

