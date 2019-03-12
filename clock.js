function Clock(startTime){
  this.time = startTime-1;
  this.waves = -1;
  Clock.prototype.getTime = function(){
    return this.time;
  }
  Clock.prototype.getWaves = function(){
    return this.waves;
  }
  Clock.prototype.incrementTime = function(){
    this.time++;
  }
  Clock.prototype.incrementWaves = function(){
    this.waves++;
  }
}
