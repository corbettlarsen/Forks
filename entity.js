function Entity(startX, startY,icon){
  this.icon = icon;
  this.x = startX;
  this.y = startY;
	this.path_array = [];
  var id = 0;
  var queue = new ROT.EventQueue();
  this.cart = null;

  this.getid = function(){
    return id;
  }

  this.setArray = function(array){
    this.path_array = array;
    return array;
  }
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
	this.fovComp = function(){
  		fov.compute(this.x, this.y, 10,function(x, y, r, visibility) {
  		var ch = null;
  		var color = (map.check(x,y) ? "#aa0": "#660");
  		display.draw(x, y, ch, "#fff", color);
  		 });
	}
  this.drawCharacter = function(){
    display.draw(this.x, this.y, this.icon,"#fff","#660");
  }
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

function EntityContainer(){
  this.entityMap = {};
  EntityContainer.prototype.createEntity = function(x,y,icon){
    var entity = new Entity(x,y,icon);
    this.entityMap[x+","+y] = entity;
    return entity;
   }
  EntityContainer.prototype.createCart = function(x,y,icon){
    var cart = new Cart(x,y,icon);
    this.entityMap[x+","+y] = cart;
    return cart;
  }
  EntityContainer.prototype.createCrate = function(x,y,icon){
    var crate = new Crate(x,y,icon);
    this.entityMap[x+","+y] = crate;
    return crate;
  }
  EntityContainer.prototype.removeCrate = function(x,y){
    delete this.entityMap[x+","+y];
    map.remove(x,y);
  }
  EntityContainer.prototype.drawEntities = function(){
    var entMap = this.entityMap;
    Object.keys(entMap).forEach(function(item) {entMap[item].drawCharacter()});
  }
  EntityContainer.prototype.actEntities = function(){
    var entMap = this.entityMap;
    Object.keys(entMap).forEach(function(item) {entMap[item].act()});
  }
}

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

function Crate(startX, startY, icon){
  map.placeCrate(startX,startY);
  Entity.call(this,startX,startY,icon);
}
