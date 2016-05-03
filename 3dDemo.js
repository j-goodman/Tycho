var tycho = require('./tycho.js');

window.onload = function () {
  var canvas = document.getElementById("canvas");

  var G = 0.000000001;
  var vPt = {x: 450, y: 450, z: 400};

  var earth = new tycho.Mass(1, 60, 0.000055, 450, 600, -100, 0.5, -1, 1, "#4d4dff", "#000080", G);
  var moon = new tycho.Mass(2, 30, 0.000055, 450, 700, -100, -4, 8, -8, "#e6e6e6", "#404040", G);
  var bodies = [];
  bodies.push(earth);
  bodies.push(moon);

  setInterval(function() {

    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bodies.sort(function(a, b) {
      return b.pos.z - a.pos.z;
    });

    bodies.forEach(function(body) {
      body.move(bodies);
      body.sphereDraw(canvas, vPt);
      bodies.forEach(function (body) {
        body.pos.y-=0.36;
      });
    });

  }, 24bp);
};
