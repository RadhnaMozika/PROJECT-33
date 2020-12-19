const Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
//creating arrays
var particles = [];
var plinkos = [];
var divisions = [];
//setting gameState
var gameState = "play";

var divisionHeight=300;
var score = 0, turn = 0;
var particle;


function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;

  //creating ground
  ground = new Ground(width/2,height,width,20);

  //creating divisions
  for (var k = 0; k <=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

    //creating 4 rows of plinkos
  for (var j = 75; j <=width; j=j+50){ 
    plinkos.push(new Plinko(j,75));
  }

  for (var j = 50; j <=width-10; j=j+50){     
    plinkos.push(new Plinko(j,175));
  }

  for (var j = 75; j <=width; j=j+50){
    plinkos.push(new Plinko(j,275));
  }

  for (var j = 50; j <=width-10; j=j+50){
    plinkos.push(new Plinko(j,375));   
  }

}


function draw() {
  background("black");
  Engine.update(engine);

  textSize(20)
  fill(255);
  //displaying score
  text("Score : "+score,20,30);
  textSize(30)
  text("500", 15, height-divisionHeight+40);
  text("500", 95, height-divisionHeight+40);
  text("500", 175, height-divisionHeight+40);
  text("500", 255, height-divisionHeight+40);
  text("100", 335, height-divisionHeight+40);
  text("100", 415, height-divisionHeight+40);
  text("100", 495, height-divisionHeight+40);
  text("200", 575, height-divisionHeight+40);
  text("200", 655, height-divisionHeight+40);
  text("200", 735, height-divisionHeight+40);
 
  ground.display();

  //displaying plinkos
  for (var i = 0; i < plinkos.length; i++) 
    plinkos[i].display(); 
   
  //displaying divisions
  for (var k = 0; k < divisions.length; k++) 
    divisions[k].display();
   
  for (var i = 0; i < particles.length; i++){
    //displaying particles
    particles[i].display();

    //increasing score according to plinko's x position when it falls
    if (particles[i].body.position.y>760){

      if(particles[i].body.position.x < 300){
        score = score+500;
        particles.pop();
      }
      else if(particles[i].body.position.x > 301 && 
        particles[i].body.position.x < 600) {
        score = score+100;
        particles.pop();
      }
      else if(particles[i].body.position.x > 601 && 
        particles[i].body.position.x < 900) {
        score = score+200;
        particles.pop();
      }

    }
  }

  //setting gameState as end if five tries have been taken
  if (turn>=5)
    gameState = "end"
  

  if(gameState === "end"){
     textSize(50)
     fill("yellow");
    text("GAME OVER", width/2-150, height/2-50);
  }
}

//creating plinkos if mouse is pressed
function mousePressed(){
  if(gameState === "play"){
    turn++;
    particle = new Particle(mouseX, 0, 10, 10);
    particles.push(particle);
  }
}
