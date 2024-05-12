function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  
  div0 = createDiv("<div class= 'intro'>Hello, Welcome to my website. This is the archive of projects that I have finished this semester.</div>")
  instruction = createDiv("<div class= 'instruction'><img src='/img/instruction.png' alt='Press Right arrow to move, Up arrow to see project'></div>")
  remind = createDiv("<div class = 'project'>Click to see project!</div>")

  div1 = createDiv("<a href = 'project1.html' class='project'> Comics: Day in the Life of a Cat</a>")
  div2 = createDiv("<a href = 'project2.html' class='project'> Sound: What's Happening at NYUAD</a>")
  div3 = createDiv("<a href = 'project3.html' class='project'> Video: Meditation Guru</a>")
  div4 = createDiv("<a href = 'instagram.com' class='project'> Contact me</a>")
  
  remind.position(window.innerWidth*0.75,200)
  remind.style("display: none")
  div0.position(window.innerWidth*0.25,100)
  div0.style("width:" + str(window.innerWidth/2))
  instruction.position(0,200)
  instruction.style("width:" + str(window.innerWidth/2))

  div1.position(window.innerWidth/2 - 50,100)
  div2.position(window.innerWidth/2 - 50,100)
  div3.position(window.innerWidth/2 - 50,100)
  div4.position(window.innerWidth/2 - 50,100)
  div1.style("display:none")
  div2.style("display:none")
  div3.style("display:none")
  div4.style("display:none")
}

function preload() {
  bg1 = loadImage('img/bg.png');
  ground = loadImage('img/ground.png');
  block1 = loadImage('img/block1.png');
  block2 = loadImage('img/block2.png');
  block3 = loadImage('img/block3.png');
  block4 = loadImage('img/block.png');
}
class Player {
  constructor() {
      this.x = 100
      this.y = 100
      this.r = 50
      this.vy = 0
      this.vx = 0
      this.g = window.innerHeight*(3/4)
      this.move = {"RIGHT": false, "UP": false}
      this.s = 100
  }

  gravity() {
    if ((this.y + this.r/2) >= this.g){
      this.vy = 0
    } else{
      this.vy += 0.5
      if (this.y + this.r/2 + this.vy > this.g){
        this.y = this.g - this.r/2
        this.vy = 0
      }
    }
  }

  // distance(other){
  //   return ((this.x - other.x)**2 + (this.y - other.y)**2)**0.5
  // }

  update(){
      this.gravity()
      
      if (this.move["RIGHT"] == true){
        this.vx = 5
      } else{
        this.vx = 0
      }

      if (this.move["UP"] == true && this.y + this.r/2 == this.g){
        this.vy = -10
      }

      this.x += this.vx
      this.y += this.vy
        
      if (this.x >= Math.floor(window.innerWidth/2)){
        this.x = Math.floor(window.innerWidth/2)
      }

      if (this.s >= window.innerHeight*(8/3)){
        this.x = Math.floor(window.innerWidth/2)
      }

      this.s += this.vx
  }
  
  display(){
      this.update()
      fill(255,255,255)
      circle(this.x,this.y,this.r)
  }
}

class Block{
  constructor(x){
    this.x = x
    this.y = window.innerHeight*(3/4) - 255
  }

  display(){
    rect(this.x - game.x_shift,this.y,100,100)
    if (this.x == window.innerWidth/2 - 50){
      image(block1,this.x - game.x_shift,this.y,100,100) 
    }
    if (this.x == window.innerWidth*1.5){
      image(block2,this.x - game.x_shift,this.y,100,100) 
    }
    if (this.x == window.innerWidth*2.5){
      image(block3,this.x - game.x_shift,this.y,100,100) 
    }
    if (this.x == window.innerWidth*3.5){
      image(block4,this.x - game.x_shift,this.y,100,100) 
    }
    
  }
}


class Game{
  constructor(){
    this.player = new Player()
    this.block1 = new Block(window.innerWidth/2 - 50)
    this.block2 = new Block(window.innerWidth*1.5)
    this.block3 = new Block(window.innerWidth*2.5)
    this.block4 = new Block(window.innerWidth*3.5)
    this.g = window.innerHeight*(3/4)
    this.x_shift = 0
    this.block_shift = 0
    this.state = ""
  }

  update(){
    if (this.player.x >= (Math.floor(window.innerWidth/2)) && this.player.s <= window.innerWidth*3.5+50){
      this.x_shift += this.player.vx
    }
    // if (this.player.x - (this.player.r/2) <=0){
    //   this.x_shift += this.player.vx
    // }

    if (this.player.move["UP"] == true){

      if (this.player.s >= window.innerWidth*3.5 - 20){
        this.state = "contact"
      }
      else if(this.player.s >= window.innerWidth*2.5 - 20){
        this.state = "block3"
      }else if(this.player.s >= window.innerWidth*1.5 -30){
        this.state = "block2"
      }else if(this.player.s >= window.innerWidth*0.5 - 50){
        this.state = "block1"
      }
    }
  }

  display(){
    this.update()
    image(bg1,0-this.x_shift,0,window.innerHeight*(4/3),window.innerHeight*(3/4))
    image(bg1,window.innerHeight*(4/3)-this.x_shift,0,window.innerHeight*(4/3),window.innerHeight*(3/4))
    image(bg1,window.innerHeight*(8/3)-this.x_shift,0,window.innerHeight*(4/3),window.innerHeight*(3/4))
    image(bg1,window.innerHeight*4-this.x_shift,0,window.innerHeight*(4/3),window.innerHeight*(3/4))
    image(bg1,window.innerHeight*(16/3)-this.x_shift,0,window.innerHeight*(4/3),window.innerHeight*(3/4))
    image(bg1,window.innerHeight*(20/3)-this.x_shift,0,window.innerHeight*(4/3),window.innerHeight*(3/4))
    image(bg1,window.innerHeight*8-this.x_shift,0,window.innerHeight*(4/3),window.innerHeight*(3/4))
    this.player.display()
    this.block1.display()
    this.block2.display()
    this.block3.display()
    this.block4.display()

    if (this.player.s > window.innerWidth/4){
      div0.style("display:none")
      instruction.style("display:none")
    }
    if (this.state == "block1") {
      remind.style("display:block")
      div1.style("display:block")
    }else if (this.state == "block2") {
      div1.style("display:none")
      div2.style("display:block")
    }else if (this.state == "block3") {
      div2.style("display:none")
      div3.style("display:block")
    }else if (this.state == "contact") {
      div3.style("display:none")
      div4.style("display:block")
    }
    
    noStroke()
    fill(87,112,181)
    rect(0,this.g,window.innerWidth,50)
    fill(117,136,215)
    rect(0,this.g+50,window.innerWidth,50)
    fill(164,167,255)
    rect(0,this.g+100,window.innerWidth,window.innerHeight-100-this.g)
    // image(ground,0,this.g,window.innerWidth,window.innerHeight,0,0,356,200)
  }
}

const game = new Game()

function draw() {
  background(250);
  game.display()
  console.log(window.innerWidth)
}

function keyPressed(){
  if (keyCode == RIGHT_ARROW){
    game.player.move["RIGHT"] = true
  }

  if (keyCode == UP_ARROW){
    game.player.move["UP"] = true
  }
}

function keyReleased(){
  if (keyCode == RIGHT_ARROW){
    game.player.move["RIGHT"] = false
  }

  if (keyCode == UP_ARROW){
    game.player.move["UP"] = false
  }
}

