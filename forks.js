ROT.RNG.setSeed(1234);
var map = new ForkMap();
var map_width = 40;
var map_height = 40;
var screen_width = 50;
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
var arena = new ROT.Map.Digger(map_width,map_height);
arena.create(callback);
var cont = new EntityContainer();
var character = cont.createEntity(29,20,"@");
var cart = cont.createCart(29,21,"H");
var crate = cont.createCrate(30,20,"H");
cont.createCrate(15,20,"H");
cont.createCrate(16,20,"H");
cont.createCrate(17,20,"H");
cont.createCrate(18,20,"H");
cont.createCrate(19,20,"H");
cont.createCrate(14,20,"H");
cont.createCrate(13,20,"H");
character.setCart(cart);
var bayCont = new BayContainer();
var bay = bayCont.addReceiving(11,9,3,3);

var display = new ROT.Display({width:screen_width, height:screen_height, forceSquareRatio:true});
var debug = document.createElement("div");
display.getContainer().addEventListener("keypress", getClickPosition);
document.body.appendChild(display.getContainer());

/**
Lost of code initiated after a mouseclick
Function needs to be broken up into other functions
Contains:
1. finding the position in the game grid of a mouse click.
2. Calculating the path from the character to click and sending it to
the entity.
3. Checking if a click is in range of the character.
4. Handles placing and removing crates.
*/

var getClickPosition = function(e) {
	var square_width = display.getContainer().width/screen_width;
	var square_height = display.getContainer().height/screen_height;
	var click_x = (e.clientX + 6)/square_width;
	var click_y = (e.clientY + 6)/square_height;
	var tile_x = Math.floor(click_x)-1;
	var tile_y = Math.floor(click_y)-1;
  if(!e.ctrlKey){
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
  else if(!map.checkWall(tile_x,tile_y)){
    if(tile_x <= (character.x+1) && tile_x >= (character.x-1)){
    if(tile_y <= (character.y+1) && tile_y >= (character.y-1)){
    if(!(tile_x == character.x && tile_y == character.y)){
    if(!(tile_x == cart.x && tile_y == cart.y)){

        if(cart.full == true && map.checkFloor(tile_x,tile_y)){
        cont.createCrate(tile_x,tile_y,"H");
        cart.empty();
      }
        else if(cart.full == false && map.checkCrate(tile_x,tile_y)){
        cont.removeCrate(tile_x,tile_y);
        cart.fill();
        }

      }
      }
      }
    }
    }
    }
display.getContainer().addEventListener("click", getClickPosition);
/**
*Places the character on a space that is not occupied by a wall
*/
function place(entity){
  for(i = 0;i <map_width; i++){
	for (j = 0; j <map_height; j++){
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

/**
drawscreen as used in the setInterval functioning
*/

var drawScreen = function(){
  for(i = 0; i < map_width;i++){
    for(j = 0; j < map_height;j++){
      var color = (map.checkWall(i,j) ? "#aa0": "#660");
      display.draw(i, j, null,"#fff",color);
    }
  }
}
/**
draws the 10*10 space around the character.
*/

var drawLocal = function(){
  for(i = -5; i < 5 ;i++){
    for(j = -5; j < 5;j++){
      var color = (map.checkWall(character.x+i,character.y+j) ? "#aa0": "#660");
      display.draw(map_width+i+5, j+5, null,"#fff",color);
    }
  }
  display.draw(map_width+5, 5,character.icon);
}
setInterval(function(){
  bay.empty();
  cont.actEntities();
  display.clear();
	drawScreen();
  drawLocal();
  bayCont.drawBays();
  cont.drawEntities();
  if (bay.isEmpty()){
    display.draw(0, 0, "Y","#fff","#000");
  }
  else{
    display.draw(0, 0, "N","#fff","#000");
  }


}, 100

);
