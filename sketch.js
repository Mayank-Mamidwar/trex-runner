//TREX GAme by mayank using JS



//Declare variables for game objects and behaviour indicators(FLAGS)
var END, PLAY, gameState;
var dino, dinoRunner, dinoDead;
var ground, grndImg, invisibleGround;
var cloudGroup, clouds, cloudImg;
var cactus, cactiGroup;
var score, hiScore, displayHiScore;
var gameOver, gameOverImg, restartIcon, iconImg;
var cactusImg1, cactustusImg2, cactusImg3, cactusImg4, cactusImg5, cactusImg6;
var jump, die, checkpoint;

//Create Media library and load to use it during the course of the software
//executed only once at the start of the program
function preload() {

  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
  checkpoint = loadSound("checkPoint.mp3")

  dinoRunner = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  dinoDead = loadAnimation("trex_collided.png");

  grndImg = loadImage("ground2.png");

  cloudImg = loadImage("cloud.png");

  iconImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
  
  cactusImg1 = loadImage("obstacle1.png");
  cactusImg2 = loadImage("obstacle2.png");
  cactusImg3 = loadImage("obstacle3.png");
  cactusImg4 = loadImage("obstacle4.png");
  cactusImg5 = loadImage("obstacle5.png");
  cactusImg6 = loadImage("obstacle1.png");

}

//define the intial environment of the software(before it is used)
//by defining the declared variables with default values
//executed only once at the start of the program
function setup() {
  createCanvas(600, 300);
  dino = createSprite(70, height - 100, 40, 40);
  dino.addAnimation("dinoRunner", dinoRunner);
  dino.addAnimation("dinoDead", dinoDead);
  dino.scale = 0.65;
  dino.debug = false;
  dino.setCollider("rectangle", 0, 0, 70, 90);


  ground = createSprite(300, height - 70, 600, 10);
  ground.addAnimation("grndImg", grndImg);
  invisibleGround = createSprite(100, height - 40, 200, 10);
  invisibleGround.visible = false;

  score = 0;
  hiScore = 0;
  displayHiScore = false;

  PLAY = 1;
  END = 0;
  gameState = PLAY;

  cloudsGroup = createGroup();
  cactiGroup = createGroup();

  restartIcon = createSprite(width / 2, height / 2, 20, 20);
  restartIcon.addAnimation("iconImg", iconImg);

  gameOver = createSprite(width / 2, height / 2 - 50, 20, 20);
  gameOver.addAnimation("gameOverImg", gameOverImg);



}

//All modifications, changes, conditions, manipulations, actions during the course of the program are written inside function draw.
//All commands to be executed and checked continously or applied throughout the program are written inside function draw.
//function draw is executed for every frame created since the start of the program.
function draw() {
  background("red");
  text("score:" + score, 40, 80);


  if (gameState == PLAY) {

    score = score + Math.round(World.frameRate / 60);
    if (displayHiScore == true) {
      text("high Score: " + hiScore, 40, 40);
    }
    //   if (score % 100 == 0) {

    // }


    //dino beheviour
    if (keyDown("space") && dino.y >= height - 80) {
      dino.velocityY = -9;
      jump.play();
    }
    dino.velocityY = dino.velocityY + 0.5;

    //ground beheviour
    ground.velocityX = -6;
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    //funtion call to create clouds and cacti
    spawnClouds();
    spawnCacti();

    gameOver.visible = false;
    restartIcon.visible = false;

    if (cactiGroup.isTouching(dino)) {
      gameState = END;
      die.play();
    }
  } else if (gameState == END) {

    if (hiScore < score) {
      hiScore = score;
    }
    text("high score: " + hiScore, 40, 40);
    ground.velocityX = 0;
    dino.velocityY = 0;
    dino.changeAnimation("dinoDead", dinoDead);

    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);

    cactiGroup.setVelocityXEach(0);
    cactiGroup.setLifetimeEach(-1);

    restartIcon.visible = true;
    gameOver.visible = true;
    if (mousePressedOver(restartIcon)) {
      gameState = PLAY;
      cactiGroup.destroyEach();
      cloudsGroup.destroyEach();
      dino.changeAnimation("dinoRunner", dinoRunner);
      score = 0;
      displayHiScore = true;
    }

        if (score % 100 == 0){
          checkpoint.play();
    
  }
  
  
  }

  dino.collide(invisibleGround);
  drawSprites();
}

//funtion definition to create clouds
function spawnClouds() {
  if (World.frameCount % 30 == 0) {
    cloud = createSprite(width, height - 100, 20, 20);
    cloud.velocityX = -6;
    cloud.y = random(height / 2 - 70, height / 2);
    cloud.depth = dino.depth;
    dino.depth = dino.depth + 1;
    cloud.lifetime = 144;
    cloud.addAnimation("cloudImg", cloudImg);
    cloud.scale = 0.75;
    cloudsGroup.add(cloud);

  }
}

//function defition to creat cacti
function spawnCacti() {
  if (World.frameCount % 120 == 0) {
    cactus = createSprite(width, height - 70, 20, 40);
    cactus.velocityX = -6;
    var imageNo = Math.round(random(1, 6));
    switch (imageNo) {
      case 1:
        cactus.addImage("cactusImg1",cactusImg1);
        break;
      case 2:
        cactus.addImage("cactusImg2",cactusImg2);
        break;
        
      case 3:
        cactus.addImage("cactusImg3",cactusImg3);
        break;
        
      case 4:
        cactus.addImage("cactusImg4",cactusImg4);
        break;
        
      case 5:
        cactus.addImage("cactusImg5",cactusImg5);
        break;
        
      case 6:
        cactus.addImage("cactusImg6",cactusImg6);
        break;
 
        
        default:
          cactus.addImage("obstacle6",cactusImg6);
          break;
        
        
    }
    cactus.scale = 0.7;
    cactus.lifetime = 140;
    cactiGroup.add(cactus);


  }
}