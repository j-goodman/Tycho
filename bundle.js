/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var tycho = __webpack_require__(1);
	
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	DEGREES = (Math.PI / 180);
	RADIANS = (180 / Math.PI);
	// 90*DEGREES = (π/2) & (π/2)*RADIANS = 90 //
	
	var tycho = {
	
	  Mass: function (
	      radius,
	      density,
	      xInitial,
	      yInitial,
	      zInitial,
	      xInitialSpeed,
	      yInitialSpeed,
	      zInitialSpeed,
	      G
	  )
	  {
	    if (!G) { this.G = 0.00006674; }
	    // megaMeters used throughout (1,000,000m) //
	    else { this.G = G; }
	    this.radius = radius;
	    this.density = density;
	    this.mass = density*(4/3)*Math.PI*Math.pow(this.radius, 3);
	    this.pos = {x: xInitial, y: yInitial, z: zInitial};
	    this.speed = {x: xInitialSpeed, y: yInitialSpeed, z: zInitialSpeed};
	    this.accel = {x: 0, y: 0, z: 0};
	
	    this._gravityAccel = function (G, massOne, massTwo, distance) {
	      return massOne * ((G*massOne*massTwo)*Math.pow(distance, 2));
	    };
	
	    this._linearGravitate = function (masses, coord) {
	      masses.forEach(function(foreignMass){
	        var distance = (this.pos[coord]-foreignMass.pos[coord]);
	        console.log(this.accel);
	        this.accel[coord] = this._gravityAccel(G, this.mass, foreignMass, distance);
	        console.log(this.accel);
	      }.bind(this));
	    };
	
	    this._spatialGravitate = function (masses) {
	      this._linearGravitate(masses, "x");
	      this._linearGravitate(masses, "y");
	      this._linearGravitate(masses, "z");
	    };
	
	    this.move = function (masses) {
	      this._spatialGravitate(masses);
	      ["x", "y", "z"].forEach(function(coord){
	        this.speed[coord] += this.accel[coord];
	        this.pos[coord] += this.speed[coord];
	      }.bind(this));
	    };
	
	    this.sphereDraw = function (canvas, color, vanishingPoint) {
	      if (!vanishingPoint) {
	        vanishingPoint = {x: canvas.width/2, y: canvas.height/2, z: canvas.width};
	      }
	      var behind = (vanishingPoint.z-this.pos.z+1)/vanishingPoint;
	      var before = 1-behind;
	      var screenX = this.pos.x * behind + vanishingPoint.x * before;
	      var screenY = this.pos.y * behind + vanishingPoint.y * before;
	      var screenRadius = this.radius * behind;
	
	      var ctx = canvas.getContext('2d');
	      ctx.beginPath();
	      ctx.arc(screenX, screenY, screenRadius, 0, 2*Math.PI);
	      ctx.fillStyle = color;
	      ctx.fill();
	    };
	  },
	};
	
	module.exports = tycho;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map