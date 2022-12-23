var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;
var heart1, heart2, heart3, heart1Img, heart2Img, heart3Img;
var zombieGroup;
var bullet = 50 , bulletGroup
var gameState = 0 ; 
var life = 3 ;
var endLine;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  lineImg = loadImage("assets/Line.png")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3

 
  player.debug = true
   // player.debug = false
    // player.Debug =false
    // Player.debug = true

   //player.Collider("rectagle",0,0,300,300)
   //player.setcollider("rectangle",0,0)
   player.setCollider("rectangle",0,0,300,300)
  // player.Setcollider("rectangle",0,0,300,300)
  

  heart1 = createSprite(displayWidth-200,40,30,30);
  heart1.addImage(heart1Img);
  heart1.scale=0.25;

  heart2 = createSprite(displayWidth-173,40,30,30);
  heart2.addImage(heart2Img);
  heart2.scale=0.25;

  heart3 = createSprite(displayWidth-147,40,30,30);
  heart3.addImage(heart3Img);
  heart3.scale=0.25;
 
  zombieGroup = new Group();
  bulletGroup = new Group();

}

function draw() {
  background(0); 
if(gameState==0){

if (zombieGroup.isTouching(player)){
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy();
      life=life-1;
    }
  }
}
if (zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy();
      bulletGroup.destroyEach();
    }
}
  
}
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}

if (life == 2) {
heart3.destroy();
}
if (life ==1) {
heart2.destroy();
}
if (life ==0) {
heart1.destroy();
gameState = 1;
}

//release bullets and change the image of shooter to shooting position when space is pressed
for(var i=0;i<zombieGroup.length;i++){
  if(zombieGroup[i].x<player.x){
    zombieGroup[i].destroy();
    life=life-1
  }
}

if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1150,player.y,20,10);
  bulletGroup.add(bullet);
  bullet.lifetime=100
  bullet.velocityX = 20;
  bullet=bullet-1;
  player.addImage(shooter_shooting)
}
else if(keyWentUp("space")){
  player.addImage(shooterImg)
 }
if(bullet===0){
  gameState=2 
}
enemy(); 
}
drawSprites();
if(gameState==1||gameState==2){
  textSize(100);
  fill("GREEN");
  text("You Lost",300,300);
  bulletGroup.destroyEach();
  zombieGroup.destroyEach();
  player.destroy();
}
}

function enemy(){
 
  if(frameCount % 20 === 0) {
  zombie = createSprite(displayWidth,random(displayHeight-900,displayHeight-140),50,50);
  zombie.velocityX= -10.0;
  zombie.addImage(zombieImg);
  zombie.scale=0.15;
  zombieGroup.add(zombie)
  zombie.lifetime=370;
  zombie.setCollider("rectangle",0,0,500,1000)
  zombie.debug=true;
  
  }
  
}
