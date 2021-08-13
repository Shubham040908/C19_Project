var tank , fireball , Background, z1, z2, z3, z4, fireballGroup;
var tankImage, fireballImage, z1Image, z2Image, z4Image, BackgroundImage;

var z1G, z1walking;
var z2G;
var z3G, z3walking; 
var z4G;
var z5G;
var cannonsound;

var score = 0;

//Game States
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  backgroundImage = loadImage("Background.jpg");
  fireballImage = loadImage("fireball.png");
  tankImage = loadImage("tank.png");
  z1Image = loadImage("z1.png");
  z1walking = loadAnimation("z11.png", "z12.png");
  z3walking = loadAnimation("z31.png", "z32.png");
  z2Image = loadAnimation("z21.png", "z22.png");
  z4Image = loadAnimation("z41.png", "z42.png");
  endImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  cannonSound = loadSound("cannon.mp3");

}

function setup() {
  createCanvas(800,400);
  
  //creating background
  scene = createSprite(0,200,0,0);
  scene.addImage(backgroundImage);
  scene.scale = 2
  
  // creating tank to shoot fireball
  tank = createSprite(50,220,20,50);
  tank.addImage(tankImage); 
  tank.scale = 0.1;

  gameOver = createSprite(400,100); 
  gameOver.addImage(endImage);

  restart = createSprite(400,150);
  restart.addImage(restartImage);

  gameOver.scale = 0.5;
  restart.scale = 0.5 ;

  gameOver.visible = false;
  restart.visible = false;

  z1G = new Group();  
  z2G = new Group();  
  z3G = new Group();  
  z4G = new Group();  
  z5G = new Group();
  fireballGroup = new Group(); 
  
   score = 0    
}


function draw() {
  background(0);  
 
  if(gameState===PLAY) {
    // moving ground
    scene.velocityX = -3
    if (scene.x < 0){
      scene.x = scene.width/2;
    }
    //moving tank
    tank.y = World.mouseY
  
    // release fireball when space key is pressed
    if (keyDown("space")) {
       createfireballs(); 

    }    
   
    if (z1G.isTouching(tank)){
      gameState = END;
    }
    if (z2G.isTouching(tank)){
      gameState = END;
    }
    if (z3G.isTouching(tank)){
      gameState = END;
    }
    if (z4G.isTouching(tank)){
      gameState = END;
    }
    if (z5G.isTouching(tank)){
        gameState = END;
    }   

  
     //creating continous zombies
     var select_zombies = Math.round(random(1,5));
 
     if (World.frameCount % 50 == 0) {
       if (select_zombies == 1) {
         z1();
       } else if (select_zombies == 2) {
         z2();
       } else if (select_zombies == 3) {
         z3();
       } else if (select_zombies == 4) {
        z4(); 
       } else {  
         z5();
       }
     }
   }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;

      z1G.destroyEach();
      z2G.destroyEach();
      z3G.destroyEach();
      z4G.destroyEach();
      z5G.destroyEach();
      tank.visible = false;

      if(mousePressedOver(restart)) {
        reset();
      }
   }
 

  if (fireballGroup.isTouching(z1G)){
    z1G.destroyEach();
    fireballGroup.destroyEach();
    score=score+1;
  }

  if (fireballGroup.isTouching(z2G)){
    z2G.destroyEach();
    fireballGroup.destroyEach();
    score=score+2;
  }

  if (fireballGroup.isTouching(z3G)){
    z3G.destroyEach();
    fireballGroup.destroyEach();
    score=score+3;
  }

  if (fireballGroup.isTouching(z4G)){
    z4G.destroyEach();
    fireballGroup.destroyEach();
    score=score+4;
  }
  if (fireballGroup.isTouching(z5G)){
    z5G.destroyEach();
    fireballGroup.destroyEach();
    score=score+5;
  }  
  drawSprites();
  text("Score: "+ score, 700,25);
}


function z1() {
  var z1 = createSprite(0, 370, 30, 30);
  z1.addImage(z1Image);
  z1.x = 800;
  z1.y = Math.round(random(20, 370));
  z1.velocityX = -10;
  z1.lifetime = 500;
  z1.scale = 0.06;
  z1G.add(z1);
}

function z2() {
    var z2 = createSprite(0, 370, 30, 30);
    z2.addAnimation("z2walking", z2Image);
    z2.x = 800;
    z2.y = Math.round(random(20, 370));
    z2.velocityX = -8;
    z2.lifetime = 500;
    z2.scale = 0.09;
    z2G.add(z2);
  }

function z3() {
  var z3 = createSprite(0, 370, 10, 10);
  z3.addAnimation("z3walking", z3walking);
  z3.x = 800;
  z3.y = Math.round(random(20, 370));
  z3.velocityX = -10;
  z3.lifetime = 500;
  z3.scale = 0.04;
  z3G.add(z3);
}

function z4() {
  var z4 = createSprite(0, 370, 10, 10);
  z4.addAnimation("z4walking", z4Image);
  z4.x = 800;
  z4.y = Math.round(random(20, 370));
  z4.velocityX = -9;
  z4.lifetime = 500;
  z4.scale = 0.1;
  z4G.add(z4);
}

function z5() {
    var z5 = createSprite(0, 370, 10, 10);
    z5.addAnimation("walking", z1walking);
    z5.x = 800;
    z5.y = Math.round(random(20, 370));
    z5.velocityX = -15;
    z5.lifetime = 500;
    z5.scale = 0.06;
    z5G.add(z5);
  }

// Creating fireballs for tank
function createfireballs() {
  var fireball= createSprite(100, 100, 60, 10);
  fireball.addImage(fireballImage);
  fireball.x = 100;
  fireball.y=tank.y;
  fireball.velocityX = 4;
  fireball.lifetime = 500;
  fireball.scale = 0.04;
  fireballGroup.add(fireball);
  cannonSound.play();
}

function reset() {

    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;   
    z1G.destroyEach();
    z2G.destroyEach();
    z3G.destroyEach();
    z4G.destroyEach();
    z5G.destroyEach();
    
    tank.visible = true;
    score = 0; 
}