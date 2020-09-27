// variables
var  ground,stoneImg,scene,sceneImg,bananaImg,monkey,monkeyImg,monkeyStop,score,obstacleGroup,foodGroup,gameState;

function preload()
{
  // game State
  gameState = "Play";
  
  // monkey animation
  monkeyImg = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  // Object images in the game
  stoneImg = loadImage("stone.png");
  sceneImg = loadImage("jungle.jpg");
  bananaImg = loadImage("banana.png");
}

function setup() 
{
  createCanvas(400, 400);
  // ground
  ground = createSprite(200,400,400,10);
  ground.visible = false;
  
  // background
  scene = createSprite(200,200,5,5);
  scene.addImage("background",sceneImg);
  
  // monkey properties
  monkey = createSprite(50,340,10,10);
  monkey.addAnimation("monkey",monkeyImg);
  monkey.scale = 0.1;
  //monkey.debug = true;
  
  // score
  score = 0;
  
  // groups
  obstacleGroup = createGroup();
  foodGroup = createGroup();
}

function draw() 
{
  background("white");
  // collitions
  monkey.collide(ground);
  
  
  if(gameState === "Play")
{
  
  // background moving
  scene.velocityX = -7;
  if(scene.x <= 0)
  {
    scene.x = scene.width/2;
  }
  
  // monkey gravity and controls
  monkey.velocityY = monkey.velocityY + 0.5;
  
  if(monkey.y >= 349 && keyDown("space"))
  {
    monkey.velocityY = -12;
  }
  
  // spawning obstacles
  if(frameCount % 150 === 0)
  {
    Obstacles();
  }
  
  // spawning food
  if(frameCount % 100 === 0)
  {
    Food();
  }
  
    // monkey growing
  if(monkey.isTouching(foodGroup))
  {
    foodGroup.destroyEach(); 
    score = score + 2;
  }
  switch(score)
  {
    case 10: monkey.scale = 0.12;
      break;
    case 20: monkey.scale = 0.13;
      break;
    case 30: monkey.scale = 0.14; 
      break; 
    case 40: monkey.scale = 0.15;
      break;
    default: break;
  }
  
  
    
  // losing the game
  if(monkey.isTouching(obstacleGroup))
  {
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
    gameState = "End";
  }
  
}else
  if(gameState === "End")
{
  // when the game ends
    scene.velocityX = scene.x *0;
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    monkey.scale = 0.1;
   
}
  
  drawSprites();
  // didplaying current score
  stroke("white");
  fill("white");
  textSize(20);
  text("score: "+ score,270,20);
  // high score
    if(gameState === "End")
  {
    // Displaying High score
    stroke("black");
    fill("red");
    textSize(50);
    text("You Loose",90,200);
    fill("yellow");
    text("High Score: " + score,40,250);
  }
  
}

function Obstacles()
{
  // Creating the obstacles 
  var stone = createSprite(400,370,5,5);
  stone.addImage("obstable",stoneImg);
  stone.velocityX = -7;
  stone.scale = 0.3;
  stone.lifetime = 80;
  //stone.debug = true;
  stone.setCollider("circle",-35,0,200);
  obstacleGroup.add(stone);
  
}

function Food()
{
  // Creating the food
  var banana = createSprite(400,200,5,5);
  banana.addImage("food",bananaImg);
  banana.velocityX = -8;
  banana.scale = 0.06;
  banana.lifetime = 90;
  //banana.debug = true;
  foodGroup.add(banana);
  
}
