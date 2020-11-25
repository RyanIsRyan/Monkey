
var monkey , monkey_running, ground,ground2;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var bananassss=0;
var score, grounddd;
var gameState=0;
var blank;
var PLAY=0;
var END=1;
var restart=2;
var game, g;
var sun,moon,s1,m1;
var gs;
function preload(){
  game=loadImage("game.png")
  tribe= loadSound("tribal.mp3");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");   
  obstacleImage=loadImage("obstacle.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  grounddd = loadImage("d.jpg");
  s1= loadImage("Sun.png");
  m1= loadImage("Moon.png");
  gs=loadSound("sound.wav");
}



function setup() {
  createCanvas(600,600)
  
  sun = createSprite(300,300,247,247);
  moon = createSprite(-95,200,247,247);
  
  sun.addImage("sun",s1)
  moon.addImage("moon",m1)
  
  ground = createSprite(300,927,1200,90);
  ground2 = createSprite(ground.x+800,927,1200,90);
  ground.addImage("ground",grounddd)
  ground2.addImage("ground2",grounddd)
  tribe.play();
 
  //ground.scale=0.6;
  monkey=createSprite(300,400);
  monkey.addAnimation("monkey_running", monkey_running);
  monkey.scale=0.1;
  obstacleGroup= new Group();
  FoodGroup= new Group();
  blank=createSprite(-2000,300,600,600)
  blank.shapeColor="white";
  g=createSprite(300,300,20,20)
  g.addImage("game",game);
  g.visible=false;
  
}


function draw() {
  monkey.collide(ground2);
  monkey.collide(ground); 
 
  score=frameCount/10;
  
  if(gameState===PLAY){
  dayCycle();
  groundGravity();
  if (monkey.isTouching(obstacleGroup)){
    
    gameState=END;
  }
   if (monkey.isTouching(FoodGroup)){
    bananassss++;
    FoodGroup.destroyEach();
  }
//monkey.debug=true;

   
    spawnObstaclesR();
    ground.velocityX = -(6 + 5*frameCount/10000);
 ground2.velocityX = -(6 + 5*frameCount/10000);
  
  
  
  monkey.velocityX=0;
  console.log(frameCount);
     fill("white");
    textSize(25);
  text("Score: "+score,470,30);
    fill("yellow");
    textSize(25);
  text("Bananas: "+bananassss,457,60);
  
  }
  
  if(gameState===END){
    background("skyblue");
    moon.velocityX=0;
    sun.velocityY=0;
     ground.velocityX=0;
    ground2.velocityX=0;
    blank.x=300;
    tribe.stop();
    g.visible=1;
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    
   gs.play();
    gameState=restart;
  }
  
  drawSprites();
}
function spawnObstaclesR() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(610,500,1000,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 5*frameCount/1000);
    obstacle.addImage("obstacle.png",obstacleImage);
   
   // obstacle.debug=true
    obstacle.setCollider("rectangle",-20,0,350,350,0)
    obstacle.scale = 0.25;
    obstacle.lifetime = 310;
    obstacleGroup.add(obstacle);
       if(frameCount % 100 === 0) {
    var banana = createSprite(obstacle.x,obstacle.y-100,1000,40);
    //obstacle.debug = true;
    banana.velocityX = -(6 + 5*frameCount/1000);
    banana.addImage("b",bananaImage);
   
   // obstacle.debug=true
    //banana.setCollider("rectangle",0,0,obstacle.height-50,obstacle.width-50,0)
    banana.scale = 0.1;
    banana.lifetime = 310;
    FoodGroup.add(banana);
     
   
  }
   
  }
}

function dayCycle(){
  if (frameCount%2600<600){
    background("skyblue");
  }if (frameCount%2600>600 && frameCount%2600<1100){
    background(32, 116, 158);
    time=1;
  }if (frameCount%2600>1100 && frameCount%2600<1500){
    background(10, 34, 46);
  }if (frameCount%2600>1500 && frameCount%2600<2000){
    background(32, 116, 158);
    time=1;
  }if (frameCount%2600>2000 && frameCount%2600<2600){
    background("skyblue");
    time=1;
  }
  if (frameCount===2600){
    frameCount=0;
  }
  if (frameCount%2600>0 && frameCount%2600<600){
    sun.velocityY=-0.66;
    moon.x=-95;
  }
  if (frameCount%2600>2000 && frameCount%2600<2600){
    sun.velocityY=-0.66;
    moon.x=-95;
  }
  if (frameCount%3000<600){
    moon.velocityX=0.57;
    
  }
  if(sun.y<-300){
    sun.y=700;
    sun.velocityY=0;
  }
}
function groundGravity(){
  if (keyDown("space") &&  monkey.y >=493) {
    monkey.velocityY = -16; 
    }
 
  monkey.velocityY = monkey.velocityY + 0.8
  
  if (ground.x<-400 ){
      ground.x = ground2.x+800;
    }
  if (ground2.x<-400 ){
      ground2.x = ground.x+800;
    }
  if (ground.x>1000 ){
      ground.x = ground2.x-800;
    }
  if (ground2.x>1000 ){
      ground2.x = ground.x-800;
    }
  
  
  
}