/**
The parent class for things that exist in the map and will be moving.
*/function Entity(startX, startY,icon){
  this.icon = icon;
  this.x = startX;
  this.y = startY;
	this.path_array = [];
  var id = 0;
  var queue = new ROT.EventQueue();
  this.cart = null;
/**
A return the unique ID associated with an entity
*/
  this.getid = function(){
    return id;
  }
/**
setter for the path array of the entity
*/

  this.setArray = function(array){
    this.path_array = array;
    return array;
  }
/**
identify a cart that is linked to this entity
*/
  this.setCart = function(cart_entity){
    this.cart = cart_entity;
  }
  this.northWest = function(){
    if (!map.check((this.x-1),(this.y-1))){
		this.x -= 1;
    this.y -= 1;
  }
}
  this.northEast = function(){
    if (!map.check((this.x+1),(this.y-1))){
		this.x += 1;
    this.y -= 1;
  }
}
  this.southWest = function(){
    if (!map.check((this.x-1),(this.y+1))){
		this.x -= 1;
    this.y += 1;
  }
}
  this.southEast = function(){
    if (!map.check((this.x+1),(this.y+1))){
		this.x += 1;
    this.y += 1;
  }
}
  this.moveUp = function(){
    if (!map.check((this.x),(this.y-1))){
		this.y -= 1;
	}
  }
  this.moveDown = function(){
    if (!map.check((this.x),(this.y+1))){
		this.y += 1;
	}
  }
  this.moveLeft = function(){
    if (!map.check((this.x-1),(this.y))){
		this.x -= 1;
	}
  }
  this.moveRight = function(){
    if (!map.check((this.x+1),this.y)){
		this.x += 1;
	}
  }
  /**
  fovComp
  if passable brown; else yellow
  */

	this.fovComp = function(){
  		fov.compute(this.x, this.y, 10,function(x, y, r, visibility) {
  		var ch = null;
  		var color = (map.check(x,y) ? "#aa0": "#660");
  		display.draw(x, y, ch, "#fff", color);
  		 });
	}

  /**
  draw the character at it's current posistion and with it's given icon
  */
  this.drawCharacter = function(){
    display.draw(this.x, this.y, this.icon,"#fff","#660");
  }

  /**
  Get the next movement from the queue and make the next move based on that
  */
	this.act = function(){

    direction = queue.get();
    if(direction == null){
      return;
    }
    else if (direction[0] == -1 && direction[1] == -1){
      this.northWest();
    }
    else if (direction[0] == 1 && direction[1] == -1) {
      this.northEast();
    }
    else if (direction[0] == -1 && direction[1] == 1) {
      this.southWest();
    }
    else if (direction[0] == 1 && direction[1] == 1) {
      this.southEast();
    }
    else if (direction[0] == 0 && direction[1] == -1) {
      this.moveUp();
    }
    else if (direction[0] == 0 && direction[1] == 1) {
      this.moveDown();
    }
    else if (direction[0] == -1 && direction[1] == 0) {
      this.moveLeft();
    }
    else if (direction[0] == 1 && direction[1] == 0) {
      this.moveRight();
    }
	}

  /**
  takes path stored in path array and calculates the difference between between
  points to yield a usable path by the enity class.
  if the entity has a cart, pass it the modified path the cart will take.
*/

	this.calcPath = function(){
    queue.clear();
    if(this.cart != null){
      this.cart.path_array.shift();
      this.cart.path_array.push([this.cart.x,this.cart.y]);
      this.cart.calcPath();
    }
     for(var i = this.path_array.length-1; i > 0 ; i--){
			 queue.add([this.path_array[i-1][0] - this.path_array[i][0],
       this.path_array[i-1][1] - this.path_array[i][1]]);
		 }
     this.path_array = [];
	}
}
/**
manage adding and removing and bulk actions of Entities
*/
function EntityContainer(){
  var entityMap = {};

/**
create entity and add to map.
return reference
*/
  EntityContainer.prototype.createEntity = function(x,y,icon){
    if(entityMap[x+","+y] == null){
    var entity = new Entity(x,y,icon);
    entityMap[x+","+y] = entity;
    return entity;
    }
   }

  /**
  create cart and add to Map
  return reference.
  does not associate cart with entity.
  */
  EntityContainer.prototype.createCart = function(x,y,icon){
    var cart = new Cart(x,y,icon);
    entityMap[x+","+y] = cart;
    return cart;
  }
  /**
  creates a crate and adds it to map
  returns reference
*/
  EntityContainer.prototype.createCrate = function(x,y,icon){
    var crate = new Crate(x,y,icon);
    entityMap[x+","+y] = crate;
    return crate;
  }
  /**
  removes crate object and map indicator
  */
  EntityContainer.prototype.removeCrate = function(x,y){
    delete entityMap[x+","+y];
    map.remove(x,y);
  }
  /**
  draw all of the characters associated with each entity in this container
  */
  EntityContainer.prototype.drawEntities = function(){
    var entMap = entityMap;
    Object.keys(entMap).forEach(function(item) {entMap[item].drawCharacter()});
  }
  /**
  invoke the act function for each entity in this container
  */
  EntityContainer.prototype.actEntities = function(){
    var entMap = entityMap;
    Object.keys(entMap).forEach(function(item) {entMap[item].act()});
  }
}
/**
The cart is a child of entity and adds the states of empty and full.
*/
function Cart(startX, startY, icon){
  Entity.call(this,startX,startY,icon);
  this.full = Boolean(true);
  this.fill = function(){
    this.full = Boolean(true);
    this.icon = "H"
  }
  this.empty = function(){
    this.full = Boolean(false);
    this.icon = "X"
  }
}
/**
Is a child of enity and exists on the map. doesn't move itself, but does
when "inside" of a cart
*/
function Crate(startX, startY, icon){
  map.placeCrate(startX,startY);
  Entity.call(this,startX,startY,icon);
}
