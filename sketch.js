var background1, background_2;
var monkey, monkey_running;
var ground, ground_img;
var foodGroup, banana_image;
var  obstacles, obstaclesGroup, obstacles_2;

var gameOver;
 

score = 0;
function preload(){
  background_2 = loadImage("jungle.jpg");
  monkey_running = loadImage("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
banana_image = loadImage("Banana.png");
obstacles_2 = loadImage("stone.png");
}


function setup() {
  createCanvas(600,300);
  
  background1 = createSprite(0,0,600,300);
  background1.addImage(background_2);
  background1.scale = 2;
  background1.velocityX = -3;
  
  monkey = createSprite(300,250,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1
  
  ground = createSprite(300,250,600,5);
  ground.velocityX=-3;
  ground.x=ground.width/2;
  ground.visible=false;
  
  
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  
}


function draw(){
 background(255); 

 if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(background1.x<100){
    background1.x=background1.width/2;
  }
  if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
    score = score + 2;
    }
   switch(score){
        case 1: monkey.scale=0.12;
                break;
        case 2: monkey.scale=0.14;
                break;
        case 3: monkey.scale=0.16;
                break;
        case 4: monkey.scale=0.18;
                break;
        default: break;
    }
   if(keyDown("space") ) {
     monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);
    spawnFood();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(monkey)){ 
        monkey.scale=0.1;
      score=score-2;
    }
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
   text("Score: "+ score, 500,50);
  
  }

function spawnFood() {
  if (frameCount % 60 === 0) {
    var banana = createSprite(400,150,40,10);
    banana.y = random(120,200);    
    banana.addImage(banana_image);
    banana.scale = 0.04;
    banana.velocityX = -5;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacles = createSprite(600,250,10,40);
    obstacles.velocityX = -6;
    obstacles.addImage(obstacles_2);
    
       
    obstacles.scale = 0.25;
    obstacles.lifetime = 300;
    

    obstaclesGroup.add(obstacles);
  }
}