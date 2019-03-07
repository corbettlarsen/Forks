function Clock(){
  var time = 299;
  Clock.prototype.getTime = function(){
    return time;
  }
  Clock.prototype.incrementTime = function(){
    time++;
  }
}
