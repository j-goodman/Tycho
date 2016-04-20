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
	
	  var G = 0.000000001;
	  var vPt = {x: 450, y: 450, z: 540};
	
	  var earth = new tycho.Mass(1, 60, 0.000055, 450, 200, -100, 0.5, -1, 1, "#4d4dff", "#000080", G);
	  var moon = new tycho.Mass(2, 30, 0.000055, 450, 300, -100, -4, 8, -8, "#e6e6e6", "#404040", G);
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
	    });
	
	  }, 32);
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	DEGREES = (Math.PI / 180);
	RADIANS = (180 / Math.PI);
	// 90*DEGREES = (π/2) & (π/2)*RADIANS = 90 //
	
	var tycho = {
	
	  Mass: function (
	      id,
	      radius,
	      density,
	      xInitial,
	      yInitial,
	      zInitial,
	      xInitialSpeed,
	      yInitialSpeed,
	      zInitialSpeed,
	      hue,
	      shade,
	      G
	  )
	  {
	    if (!G) { this.G = 0.00006674; }
	    // megaMeters used throughout (1,000,000m) //
	    else { this.G = G; }
	    this.id = id;
	    this.radius = radius;
	    this.density = density;
	    this.mass = density*(4/3)*Math.PI*Math.pow(this.radius, 3);
	    this.pos = {x: xInitial, y: yInitial, z: zInitial};
	    this.speed = {x: xInitialSpeed, y: yInitialSpeed, z: zInitialSpeed};
	    this.accel = {x: 0, y: 0, z: 0};
	    this.hue = hue;
	    this.shade = shade;
	
	    this._gravityAccel = function (G, massOne, massTwo, distance) {
	      return ( massOne.mass * (G*massOne.mass*massTwo.mass) * Math.pow(distance, 2) );
	    };
	
	    this._linearGravitate = function (masses, coord) {
	      masses.forEach(function(foreignMass){
	
	        if (this.id !== foreignMass.id) {
	          var towards;
	          if (this.pos[coord] > foreignMass.pos[coord]) { towards = (-1); }
	          else { towards = 1; }
	          var distance = (this.pos[coord]-foreignMass.pos[coord]);
	          this.accel[coord] = towards * Math.abs(this._gravityAccel(this.G, foreignMass, this, distance));
	        }
	
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
	
	    this.sphereDraw = function (canvas, vanishingPoint) {
	      if (!vanishingPoint) {
	        vanishingPoint = {x: canvas.width/2, y: canvas.height/2, z: canvas.width};
	      }
	      var behind = (vanishingPoint.z-this.pos.z+1)/vanishingPoint.z;
	      var before = 1-behind;
	      var screenX = this.pos.x * behind + vanishingPoint.x * before;
	      var screenY = this.pos.y * behind + vanishingPoint.y * before;
	      var screenRadius = this.radius * behind;
	
	      var ctx = canvas.getContext('2d');
	      // ctx.drawImage(document.getElementById("whitesphere"), screenX-screenRadius, screenY-screenRadius, screenRadius*2, screenRadius*2);
	      ctx.beginPath();
	      ctx.arc(screenX, screenY, screenRadius, 0, 2*Math.PI);
	
	      gradient = ctx.createRadialGradient(
	        screenX-screenRadius/6,
	        screenY-screenRadius/6,
	        screenRadius/12,
	        screenX,
	        screenY,
	        screenRadius*1.6);
	      gradient.addColorStop(0,this.hue);
	      gradient.addColorStop(1,this.shade);
	
	      ctx.fillStyle = gradient;
	      ctx.fill();
	    };
	  },
	};
	
	module.exports = tycho;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map