const FLOOR = 0;
const WALL = 1;
const CRATE = 2;
/**
Stores floor, wall and crate positions as a 2D grid.
*/
function ForkMap(){
  this.entities = {};

/**
store the position of a crate
*/

ForkMap.prototype.placeCrate = function(x,y){
    this.entities[x + ","+ y] = CRATE;
}

/**
stores the posion of a wall
*/

ForkMap.prototype.placeWall = function(x,y){
    this.entities[x + ","+ y] = WALL;
}

/**
stores the positon of a floor tile
*/

ForkMap.prototype.placeFloor = function(x,y){
    this.entities[x + "," +y] = FLOOR;
}
/**
remove a wall or crate and set it as a floor tile
*/
ForkMap.prototype.remove = function(x,y){
    this.entities[x + "," +y] = FLOOR;
}

/**
check if a wall is present
*/
ForkMap.prototype.checkWall = function(x,y){
    if((this.entities[x + "," +y] == WALL)){
      return true;
    }
    else{
      return false;
    }
}

/**
check if a crate is present
*/

ForkMap.prototype.checkCrate = function(x,y){
    if((this.entities[x + "," +y] == CRATE)){
      return true;
    }
    else{
      return false;
    }
}
/**
check if a space is empty
*/
ForkMap.prototype.checkFloor = function(x,y){
    if((this.entities[x + "," +y] == FLOOR)){
      return true;
    }
    else{
      return false;
    }
}

/**
Check if a spot is either a crate or a wall.
*/
ForkMap.prototype.check = function(x,y){
    if((this.entities[x + "," +y] == CRATE) || (this.entities[x + "," +y] == WALL)){
      return true;
    }
    else{
      return false;
    }
}
/**
Checks if a keys exists in the map of enitities.
*/
ForkMap.prototype.checkKey = function(key){
  if(key in this.entities){
    return true;
  }
  else return false;
}
}
