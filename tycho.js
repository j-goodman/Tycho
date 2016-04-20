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
