var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,bananaImg;
var stone,stoneImg;
var stoneGroup,bananaGroup;
var END =0;
var PLAY =1;
var gameState = PLAY;
var Score = 0;
var Gameover,GameoverImg
function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png")
  stoneImg = loadImage("stone.png")
  GameoverImg = loadImage("gameOver.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  Gameover = createSprite(400,200,20,20) 
  Gameover.addImage("Gameover",GameoverImg)
  Gameover.visible=false;

  stoneGroup = new Group();
  bananaGroup = new Group();

}

function draw() { 
  background(0);
  spawnFood();
  spawnObstacle();
  if(gameState===PLAY){

  if(backgr.x<100){
    backgr.x=backgr.width/2;
 }
  
  if(keyDown("space") && player.y >= 313 ) {
      player.velocityY = -16;
  }
  player.velocityY = player.velocityY + 0.8;
  
  player.collide(ground);
  if(bananaGroup.isTouching(player)){
   bananaGroup.destroyEach();
   Score = Score + 2; 
  }
 if(stoneGroup.isTouching(player)){
   gameState = END
 }
  }else if(gameState === END){
    Gameover.visible = true;
    backgr.velocityX = 0;
    player.visible = false;
    bananaGroup.destroyEach();
    stoneGroup.destroyEach();

  }

  drawSprites();
  fill("white")
  textSize(20)
  text("SCORE :"+Score,600,50)
}

function spawnFood(){

 if(frameCount % 130 === 0){
    var banana = createSprite(800,250,40,10)
    banana.y = random(120,200);
    banana.addImage("BANANA",bananaImg) ;
    banana.scale = 0.05;
    banana.velocityX = -5;

    banana.lifetime = 160;
    player.depth = banana.depth + 1;
    bananaGroup.add(banana)
  }
}



function spawnObstacle(){
  if(frameCount % 200 === 0){
 var stone = createSprite(800,320,60,60)
 stone.addImage("Stone",stoneImg)
 stone.scale = 0.15
 stone.velocityX = -5;

 stone.lifetime = 160;
 stoneGroup.add(stone)
  }

}




