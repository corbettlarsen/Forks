const RECEIVING = 0;
const SHIPPING = 1;

/**
An space that takes up multiple squares and represents an area that crates
will either come in or out of.
*/
function Bay(x,y,width,length,type){
/**
checks to see if every space is full in a bay.
*/
Bay.prototype.isFull = function(){
  for(var i = x; i < x+width; i++){
    for(var j = y; j < y+length; j++){
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
  for(var i = x; i < x+width; i++){
    for(var j = y; j < y+length; j++){
      if(map.checkCrate(i,j)){
        return true
      }
    }
  }
  return false;
}
/**
Fills bay with crates
*/
Bay.prototype.fill = function(){

}
/**
removes all crates from bay
*/
Bay.prototype.empty = function(){

}
/**
Draws each square of the bay.
*/
Bay.prototype.draw = function(){
  for(var i = x; i < x+width; i++){
    for(var j = y; j < y+length; j++){
      display.draw(i, j, null,null,"#00f");
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
    var bay = new Bay(x,y,width,length,RECEIVING);
    bayMap[x+","+y] = bay;
    return bay;
  }
  /**
  Add bay that is for removing crates from the map.
  */
  BayContainer.prototype.addShipping = function(x,y,width,length){
    var bay = new Bay(x,y,width,length,SHIPPING);
    bayMap[x+","+y] = bay;
    return bay;
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
