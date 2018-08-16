const RECEIVING = 0;
const SHIPPING = 1;

function Bay(x,y,width,length,type){

Bay.prototype.isFull = function(){
  return Boolean(false);
}
Bay.prototype.isEmpty = function(){
  return Boolean(false);
}
Bay.prototype.fill = function(){

}
Bay.prototype.empty = function(){

}
Bay.prototype.draw = function(){
  for(var i = x; i < x+width; i++){
    for(var j = y; j < y+length; j++){
      display.draw(i, j, null,null,"#00f");
    }
  }

}
}

function BayContainer(){
  var bayMap = {};
  BayContainer.prototype.addReceiving = function(x,y,width,length){
    var bay = new Bay(x,y,width,length,RECEIVING);
    bayMap[x+","+y] = bay;
    return bay;
  }
  BayContainer.prototype.addShipping = function(x,y,width,length){
    var bay = new Bay(x,y,width,length,SHIPPING);
    bayMap[x+","+y] = bay;
    return bay;
  }
  BayContainer.prototype.removeBay = function(x,y){
    delete bayMap[x+","+y];
  }
  BayContainer.prototype.fillBays = function(){

  }
  BayContainer.prototype.emptyBays = function(){

  }
  BayContainer.prototype.drawBays = function(){
    Object.keys(bayMap).forEach(function(item) {bayMap[item].draw()});
  }
}
