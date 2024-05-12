const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
class Player {
    constructor() {
        this.x = 100
        this.y = 100
        this.r = 50
        this.vy = 0
        this.g = 0
    }

    gravity() {
        this.vy += 1
    }

    update(){
        this.gravity()
        this.y += this.vy
    }
    
    draw(){
        this.update()
        // c.fillRect(this.position.x,this.position.y,100,100)
        c.arc(this.x,this.y,this.r,0,2*Math.PI)
        c.fill()
    }
}

const player = new Player()
player.draw()

function animate(){
    requestAnimationFrame(animate)
    redraw()
    player.draw()
}

animate()