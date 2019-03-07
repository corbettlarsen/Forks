const RECEIVING = 0;
const SHIPPING = 1;

/**
An space that takes up multiple squares and represents an area that crates
will either come in or out of.
*/
function Bay(arg_x,arg_y,arg_width,arg_length,arg_type){
this.x = arg_x;
this.y = arg_y;
this.width = arg_width;
this.length = arg_length;
this.type = arg_type;
/**
checks to see if every space is full in a bay.
*/
Bay.prototype.isFull = function(){
  for(var i = this.x; i < this.x+this.width; i++){
    for(var j = this.y; j < this.y+this.length; j++){
      if(!map.checkCrate(i,j)){
        return false
      }
    }
  }
  return true;
}
/**
checks to see if the bay is completey empty
*/
Bay.prototype.isEmpty = function(){
  for(var i = this.x; i < this.x+this.width; i++){
    for(var j = this.y; j < this.y+this.length; j++){
      if(map.checkCrate(i,j)){
        return false
      }
    }
  }
  return true;
}
/**
Fills bay with crates
*/
Bay.prototype.fill = function(){
  if(this.isEmpty()){
    for(var i = this.x; i < this.x+this.width; i++){
      for(var j = this.y; j < this.y+this.length; j++){
        cont.createCrate(i,j,"H");
      }
  }
}
}
/**
removes all crates from bay
*/
Bay.prototype.empty = function(){
  if(this.isFull()){
    for(var i = this.x; i < this.x+this.width; i++){
      for(var j = this.y; j < this.y+this.length; j++){
        cont.removeCrate(i,j);
      }
  }
}
}
/**
Draws each square of the bay.
*/
Bay.prototype.draw = function(){
  for(var i = this.x; i < this.x+this.width; i++){
    for(var j = this.y; j < this.y+this.length; j++){
      if(this.type == SHIPPING){
        display.draw(i, j, null,null,"#00f");
    }
      else{
        display.draw(i, j, null,null,"#c00");
    }
    }
  }

}
}


/**
manage adding and removing and bulk actions of bays
*/

function BayContainer(){
  var bayMap = {};
  /**
  Add bay that is for adding crates to the map.
  */
  BayContainer.prototype.addReceiving = function(x,y,width,length){
    bayMap[x+","+y] = new Bay(x,y,width,length,RECEIVING);
    return bayMap[x+","+y];
  }
  /**
  Add bay that is for removing crates from the map.
  */
  BayContainer.prototype.addShipping = function(x,y,width,length){
    bayMap[x+","+y] = new Bay(x,y,width,length,SHIPPING);
    return bayMap[x+","+y];
  }
  /**
  Remove a bay from the map
  */
  BayContainer.prototype.removeBay = function(x,y){
    delete bayMap[x+","+y];
  }
  /**
  Fill all bays? or just receiving bays?
  */
  BayContainer.prototype.fillBays = function(){

  }
  /**
  Empty all bays? or just receiving bays
  */
  BayContainer.prototype.emptyBays = function(){
  /**
  Draw all bays in this container
  */
  }
  BayContainer.prototype.drawBays = function(){
    Object.keys(bayMap).forEach(function(item) {bayMap[item].draw()});
  }
}
