var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex_running,cloudsGroup,cloud,cloudImage,ground,trex_collided;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var obstacle1Image, obstacle2Image,obstacle3Image,obstacle4Image,obstacle5Image;
var background,backgroundImage,trexImage,groundImage;
var score = 0;
var jumpSound,dieSound,sun,sunImage,inviground,trex;
var gameOver,gameOverImage;


function preload(){
 
  //Load the images
  backgroundImage = loadImage("background.jpg");
  cloudImage = loadImage("cloud.png");
  dieSound = loadSound("die.mp3");
  gameOverImage = loadImage("gameOver.jpg");
  jumpSound = loadSound("jump.mp3");
  obstacle1Image = loadImage("obstacle1.png");
  obstacle2Image = loadImage("obstacle2.png");
  obstacle3Image = loadImage("obstacle3.png");
  obstacle4Image = loadImage("obstacle4.png");
  obstacle5Image = loadImage("obstacle5.png");
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground.png");
  sunImage = loadImage("sun.png");
  trex_collided = loadAnimation("trex_collided.png");
}

function setup() {
  
  createCanvas(windowWidth,windowHeight);
  
  sun = createSprite(width-50,100,10,10);
  sun.addImage(sunImage);
  sun.scale = 0.3
  
  trex = createSprite(90,height-180,20,50);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale= 0.6; 
  
  
  
  ground = createSprite(width/2,height/1.5,width,2);
  ground.addImage(groundImage);
  ground.x = width/2;
  ground.velocityX = -(6 + 3*score/100);
  
  inviground = createSprite(width/2,height/1.47,width,2);
  inviground.visible = false;
  
  gameOver = createSprite(width/2,height/2-50);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.3;
  gameOver.visible = false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
}

function draw() {
 
  background("lightblue");
  
  //Display score
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
  
  
  //Collide the trex with the ground
  trex.collide(inviground);
  
  if (gameState === PLAY){
    
    //Score count
    score = score + Math.round(getFrameRate()/60);
    
    
    //Make the trex jump when space is pressed
    if (keyDown("space") && trex.y >= height-200 || touches.length>0){
    trex.velocityY =  -17;
     }
    
    //Reset background after it crosses half its width
    if (ground.x < 0){
      ground.x = ground.width/2;
     }
    
    //To add gravity to the trex
    trex.velocityY = trex.velocityY+1;
  
    spawnClouds();
    obstacles();
    
    if (obstaclesGroup.isTouching(trex)){
      dieSound.play();
      gameState = END;
    } 
  }
  
  else if(gameState === END){
    gameOver.visible = true;
    
    ground.velocityX = 0;
    obstaclesGroup.setvelocityX = 0;
    
    cloud.velocityX = 0;
    
    
    
    trex.visible = false;
    obstacle.visible = false;
    cloud.visible = false;
     
    if (keyDown("r")){
      reset();
    }
  }
  //Display the sprites
  drawSprites();
  
}

function reset(){
  
  gameState = PLAY;
  
  gameOver.visible = false;
  trex.visible = true;
  sun.visible = true;
  cloud.visible = true;
  obstacle.visible = true;
  
  obstacle.destroy();
  cloud.destroy();
  
  score = 0;
  
}




function spawnClouds(){
  if (frameCount % 110 === 0){
    cloud = createSprite(width+20,height-300,40,10);
    cloud.y = Math.round(random(100,200));
    cloud.addImage(cloudImage);
    cloud.scale = 0.2;
    cloud.velocityX = -6;
    cloud.lifetime = 300;
    trex.depth = cloud.depth
    trex.depth = trex.depth+1;
    cloudsGroup.add(cloud);
  }
}

function obstacles(){
  if (frameCount % 80 === 0){
    obstacle = createSprite(600,height-185,20,20);
    
    obstacle.velocityX = -(5 + 3*score/150);
    
    //generate obstacles
    var rand = Math.round(random(1,5));
    switch(rand){
      case 1: obstacle.addImage(obstacle1Image);
              break;
      case 2: obstacle.addImage(obstacle2Image);
              break;
      case 3: obstacle.addImage(obstacle3Image);
              break;
      case 4: obstacle.addImage(obstacle4Image);
              break;
      case 5: obstacle.addImage(obstacle5Image);
              break;
      default: break;
      
    }
        
    //Adjust the size of the obstacle
    obstacle.scale = 0.6;
    
    //Add the obstacle to obstacle group
    obstaclesGroup.add(obstacle);
    
    trex.depth = obstacle.depth
    trex.depth = trex.depth+1;
        
    }
  }


