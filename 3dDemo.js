var tycho = require('./tycho.js');

window.onload = function () {
  var canvas = document.getElementById("canvas");

  var earth = new tycho.Mass(60, 0.000055, 30, 30, 30, 10, 10, 0);
  var moon = new tycho.Mass(24, 0.000055, 230, 230, 230, -10, -10, 0);
  var bodies = [];
  bodies.push(earth);
  bodies.push(moon);

  setInterval(function() {

    earth.move(bodies);
    moon.move(bodies);
    earth.sphereDraw(canvas, "#0000ff");
    moon.sphereDraw(canvas, "#ffffff");

  }, 750);
};
