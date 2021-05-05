var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;


function preload(){
  zombie1=loadImage("Images/Zombie1.png")
  zombie2=loadImage("Images/Zombie2.png")
  zombie3=loadImage("Images/Zombie3.png")
  zombie4=loadImage("Images/Zombie4.png")
  zombie5=loadImage("Images/Zombie5.png")

  boyImage=loadImage("Images/Boy.png")

  backgroundImg=loadImage("Images/BackgroundImage.jpg")

  gameoverImg=loadImage("Images/gameover.png")
  restartImg=loadImage("Images/restartButton.png")

  crashSound=loadSound("crash.mp3")
  jumpSound=loadSound("jump.mp3")
  restartsound=loadSound("smash.mp3")
  
}

function setup() {
  createCanvas(1200, 680);
  
  /*trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;*/
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",backgroundImg);
  

  boy= createSprite(200,500,20,20)
  boy.addImage("boy",boyImage)
  boy.scale=0.7
  //boy.debug=true//
  boy.setCollider("rectangle",0,70,40,50)


  /*ground.x = ground.width /2;
  ground.velocityX = -4;*/
  
  invisibleGround = createSprite(200,600,900,100);
  invisibleGround.visible = false;

  obstacleGroup=createGroup();

  gameOver=createSprite(500,300,10,10)
  gameOver.addImage(gameoverImg)
  gameOver.scale=0.7

  restart=createSprite(500,400,10,10)
  restart.addImage(restartImg)
  restart.scale=0.4
  
  /*// create Obstacles and Cloud groups
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  console.log("Hello" + 5);
  
  score = 0;*/
}

function draw() {
  background(180);
 

  if (ground.x < 250){
    ground.x = ground.width/2;   
  }

  if(keyDown("space")&& boy.y>150){
    boy.velocityY=-10
    jumpSound.play();

  }
  boy.velocityY=boy.velocityY+0.5
  boy.collide(invisibleGround)

  

  if(gameState===PLAY){
    
    ground.velocityX=-4
    zombies();
    score=score+ Math.round(frameCount/600)
    restart.visible=false
    gameOver.visible=false
    if(obstacleGroup.isTouching(boy)){
      crashSound.play();
      gameState=END

    }
  }
  else{
    ground.velocityX=0
    obstacleGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1)
    restart.visible=true
    gameOver.visible=true
    if(mousePressedOver(restart)){
      restartsound.play();
  console.log("restart the game")
  Restart();
    }
  }

  
 /* text("Score: "+ score, 500,50);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -4;
    score = score + Math.round(frameCount/60);
    if (ground.x < 0){
    ground.x = ground.width/2;   
  }
    if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -13;
  }
    trex.velocityY = trex.velocityY + 0.8
    spawnClouds();
    spawnObstacles();
    if(obstaclesGroup.isTouching(trex) ){
      gameState = END;
    }
  }
  else if(gameState === END){
    //stop the ground
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
  
  }
  
  
  
  
  
  
  
  trex.collide(invisibleGround);
  
  //spawn the clouds
  
  
  //spawn obstacles on the ground
 */
  
  drawSprites();
  textSize(30)
  fill("black")
  text("score: "+ score, width-200, 100)
  

}

/*function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;

   
    // //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //adding obstacles to the group
   obstaclesGroup.add(obstacle);
 }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
  }
  
}*/

function zombies(){
  if(frameCount%180===0){
zombie=createSprite(1000,500,20,20)
zombie.velocityX=-4
num=Math.round(random(1,5))
  switch(num){
    case 1:zombie.addImage(zombie1)
    break
    case 2:zombie.addImage(zombie2)
    break
    case 3:zombie.addImage(zombie3)
    break
    case 4:zombie.addImage(zombie4)
    break
    case 5:zombie.addImage(zombie5)
    break
  }
zombie.scale=0.5
zombie.lifetime=230
obstacleGroup.add(zombie)
  }

}

function Restart(){
  score=0
  gameState=PLAY
  obstacleGroup.destroyEach();
}