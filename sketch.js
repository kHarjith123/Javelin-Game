const Engine = Matter.Engine;
const World = Matter.World;
const Constraint = Matter.Constraint;
const Bodies = Matter.Bodies;

var background1 , start;
var gameState = "start";
var engine, world;

var score = 0;

var player_running;
var player_released;
var javelin;

function preload(){
  
  bg = loadImage("Images/gudBg.jpg");
  playbutton = loadImage("Images/Playbutton.png")
  player_running = loadAnimation("Images/player1.png","Images/player1.png","Images/player2.png",
  "Images/player2.png","Images/player3.png","Images/player3.png","Images/player4.png" , "Images/player4.png" )
  player_released = loadAnimation("Images/player5.png")
  playerHappy = loadAnimation("Images/playerHappy.png");
  playersad = loadAnimation("Images/playersadImage.png");

  cheering = loadSound("Audio/Crowdhappy.mpeg");
  sadSound = loadSound("Audio/Crowdsad.mpeg");
}
function setup() {
  createCanvas(windowWidth,windowHeight);

  engine = Engine.create();
  world = engine.world;
  
  background1 = createSprite(width/2,height/2);
  background1.addImage(bg)
  background1.scale = 1.2;
  background1.x = background1.width/2;

  start = createSprite(width/2+20,height/2);
  start.addImage(playbutton);

  player = createSprite(100,height-95,20,100);
  player.addAnimation("running",player_running);
  player.addAnimation("released",player_released);
  player.addAnimation("happy",playerHappy);
  player.addAnimation("sad",playersad);
  player.scale = 2 

  javelin = new Javelin(110, height-178, PI/7);

  ground = new Ground( width/2 , height-10 , width , 20);
}

function draw() {
  background(255);
  drawSprites();


  Engine.update(engine);



  player.changeAnimation("released",player_released)
  player.scale =2;

  if((mousePressedOver(start) || touches.length > 0) && gameState === "start"){

    gameState = "play"
    start.visible = false;

}

  if(gameState === "play"){

   player.changeAnimation( "running",player_running);

    background1.velocityX = -3 
    
    if (background1.x < 0){
      background1.x = background1.width/2;

    }

     Matter.Body.setPosition(javelin.body,{x:110 ,y :height-178})
     
       

     Matter.Body.setPosition(javelin.body,{x:75,y :height-165})

  
  }
 


if(keyDown("space") || touches.length > 0){

  if(gameState === "play"){

   
    Matter.Body.applyForce(javelin.body,javelin.body.position, {x: random (width/2, width) , y:-(random(height/2, height - 400)) });
    Matter.Body.setStatic(javelin.body, false);

    gameState = " released";
  }


  

  
}

if(gameState === " released"){
  player.changeAnimation("happy",playerHappy); 
  player.scale = 0.4;
  background1.velocityX = 0; 

  if(javelin.body.position.x > width && javelin.body.speed <0.5){
    text("Foul",width/2,height/2);
    sadSound.play();
    player.changeAnimation("sad",playersad)
    score = 0;
    console.log(score);
    
      
   
      
    
     
    
    }
    else{
    
    
    
    
                if (javelin.body.position.x < width/4 && javelin.body.speed <0.5) 
                  {
                      score=0;  
                      console.log(score);
                      sadSound.play();
                      player.changeAnimation("sad",playersad)
                      
                          
                      
                      
    
                }
    
    
                  else if (javelin.body.position.x > width/4 && javelin.body.position.x < width/2 && javelin.body.speed <0.5 ) 
                  {
                        score = 50;
                        console.log(score);
                      cheering.play();
                      player.changeAnimation("happy",playerHappy)

                          
                     
                      
                  }
    else if (javelin.body.position.x > width/2 && javelin.body.position.x < (3*width)/4 && javelin.body.speed <0.5 ) 
                  {
                        score = 100;
                        console.log(score);
                         cheering.play();
                         player.changeAnimation("happy",playerHappy)
                         
                         
                         
                }
    else if (javelin.body.position.x >(3* width)/4  && javelin.body.speed < 0.5) 
                  {
                        score = 200;
                        console.log(score);
                         cheering.play();
                         player.changeAnimation("happy",playerHappy)
                            
                        
                         
                  }
  
   
    
                
    }
 
}



 
  console.log(score);
  
  fill("black");
  textSize(33)
  textFont("Trebuchet MS");
  text("JAVELIN THROW GAME",width/2-168,100);

  text(mouseX + ","+ mouseY, mouseX, mouseY);
  

fill("white");
  text("SCORE = " + score, width-400,250)

  javelin.display();
  ground.display();
  



}
