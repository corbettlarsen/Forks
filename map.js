function ForkMap(){
  var entities = {};

ForkMap.prototype.placeCrate = function(x,y){
    entities[x + ","+ y] = CRATE;
}

ForkMap.prototype.placeWall = function(x,y){
    entities[x + ","+ y] = WALL;
}
ForkMap.prototype.placeFloor = function(x,y){
    entities[x + "," +y] = FLOOR;
}
ForkMap.prototype.remove = function(x,y){
    entities[x + "," +y] = FLOOR;
}
ForkMap.prototype.checkWall = function(x,y){
    if((entities[x + "," +y] == WALL)){
      return true;
    }
    else{
      return false;
    }
}
ForkMap.prototype.checkCrate = function(x,y){
    if((entities[x + "," +y] == CRATE)){
      return true;
    }
    else{
      return false;
    }
}

ForkMap.prototype.checkFloor = function(x,y){
    if((entities[x + "," +y] == FLOOR)){
      return true;
    }
    else{
      return false;
    }
}

ForkMap.prototype.check = function(x,y){
    if((entities[x + "," +y] == CRATE) || (entities[x + "," +y] == WALL)){
      return true;
    }
    else{
      return false;
    }
}
ForkMap.prototype.checkKey = function(key){
  if(key in entities){
    return true;
  }
  else return false;
}
}
