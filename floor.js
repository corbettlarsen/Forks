function Floor(){
  this.map = new ForkMap();
  this.entCont = new EntityContainer();
  this.bayCont = new BayContainer();
  Floor.prototype.loadFromFile = function(file){
    return null;
  }
  Floor.prototype.getMap = function(){
    return this.map;
  }
  Floor.prototype.getEntityContainer = function(){
    return this.entCont;
  }
  Floor.prototype.getBayContainer = function(){
    return this.bayCont;
  }
  Floor.prototype.print = function(){

  }
}
