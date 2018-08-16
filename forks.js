ROT.RNG.setSeed(1234);
var map = new ForkMap();
var screen_width = 40;
var screen_height = 40;

var lightPasses = function(x, y) {
    var key = x+","+y;
    if (map.checkKey(key)) { return (map.checkFloor()); }
    return false;
}
var fov = new ROT.FOV.RecursiveShadowcasting(lightPasses);
var callback = function(x,y,value){
	if(value){
    map.placeWall(x,y);
  }
  else{
    map.placeFloor(x,y);
  }
}
var arena = new ROT.Map.Digger(screen_width,screen_height);
arena.create(callback);
var cont = new EntityContainer();
var character = cont.createEntity(29,20,"@");
var cart = cont.createCart(29,21,"H");
var crate = cont.createCrate(30,20,"H");
character.setCart(cart);
var bayCont = new BayContainer();
var bay = bayCont.addReceiving(11,9,3,3);
var display = new ROT.Display({width:screen_width, height:screen_height, forceSquareRatio:true});
var debug = document.createElement("div");
display.getContainer().addEventListener("keypress", getClickPosition);
document.body.appendChild(display.getContainer());

var getClickPosition = function(e) {
	var square_width = display.getContainer().width/screen_width;
	var square_height = display.getContainer().height/screen_height;
	var click_x = (e.clientX + 6)/square_width;
	var click_y = (e.clientY + 6)/square_height;
	var tile_x = Math.floor(click_x)-1;
	var tile_y = Math.floor(click_y)-1;
  if(!e.shiftKey){
  	display.draw(tile_x,tile_y,"X");
  	var dijkstra = new ROT.Path.Dijkstra(character.x,character.y,
      function(x, y) {
          return (map.checkFloor(x,y));
      }
    );
  	dijkstra.compute(tile_x, tile_y, function(x, y) {
  	character.path_array.push([x,y]);
    if (character.cart != null) {
      character.cart.path_array.push([x,y]);
    }
     });
  	character.calcPath();
    }
  else if(!map.check(tile_x,tile_y)){
    if(tile_x <= (character.x+1) && tile_x >= (character.x-1)){
    if(tile_y <= (character.y+1) && tile_y >= (character.y-1)){
    if(!(tile_x == character.x && tile_y == character.y)){
    if(!(tile_x == cart.x && tile_y == cart.y)){
      if(cont.entity_map[tile_x+","+tile_y]){
        if(!cart.full)
        cont.removeCrate(tile_x,tile_y);
        cart.fill();
        }
        else{
          if(cart.full){
          cont.createCrate(tile_x,tile_y,"H");
          cart.empty();
        }
      }
      }
    }
    }
    }
  }
}
display.getContainer().addEventListener("click", getClickPosition);

function place(entity){
  for(i = 0;i <screen_width; i++){
	for (j = 0; j <screen_height; j++){
		if(map.checkFloor(i,j)){
      entity.x = i;
      entity.y = j;
      map[i + "," + j] = 2;
      entity.fovComp();
      return 1;
    }
	}
}
  return 0;
}

var drawScreen = function(){
  for(i = 0; i < screen_width;i++){
    for(j = 0; j < screen_height;j++){
      var color = (map.checkWall(i,j) ? "#aa0": "#660");
      display.draw(i, j, null,"#fff",color);
    }
  }
}
setInterval(function(){

  cont.actEntities();
  display.clear();
	drawScreen();
  bayCont.drawBays();
  cont.drawEntities();


}, 100

);
