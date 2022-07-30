let dpi = window.devicePixelRatio;
let playerState ='idle'

const dropdown = document.getElementById('animations')
dropdown.addEventListener('change',(e)=>{
    playerState = e.target.value
    console.log(playerState)
})


const canvas = document.getElementById("canvas1")


//FIX blurriness
let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
canvas.setAttribute('height', style_height * dpi);
canvas.setAttribute('width', style_width * dpi);
// END FIX BLURRINESS
const ctx = canvas.getContext('2d')
ctx.imageSmoothingEnabled = true
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const playerIm = new Image();
playerIm.src = "./shadow_dog.png"

const spriteWidth = 575.3 // pixel of sprite sheet devided by columns
const spriteHeight = 525


//lower animation speed
let gameFrame = 0
const staggerFrames = 5.2

//------------------------------------- generate SPRITE SHEET DATA
const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7
    }
    ,
    {
        name: 'fall',
        frames: 7
    }
    ,
    {
        name: 'run',
        frames: 9
    }
    ,
    {
        name: 'dizzy',
        frames: 11
    }
    ,
    {
        name: 'sit',
        frames: 5
    }
    ,
    {
        name: 'roll',
        frames: 7
    }
    ,
    {
        name: 'bite',
        frames: 7
    }
    ,
    {
        name: 'ko',
        frames: 12
    }
    ,
    {
        name: 'getHit',
        frames: 4
    }

]

animationStates.forEach((state, index) => {
let frames = {loc:[]}
    for (let j = 0; j < state.frames;j++){
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x:positionX,y:positionY})
    }
    spriteAnimations[state.name] =frames
})
console.log(spriteAnimations)
//------------------------------------- END GENERATION OF SPRITESHEET LOCATION DATA



let drawFrame = () => {

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)// clean canvas every frame
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length // animating
    let frameX = spriteWidth * position
    let frameY = spriteAnimations[playerState].loc[position].y

    ctx.drawImage(playerIm, frameX, frameY, spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT) //last 4, destination x and y position coordinates, destination width height

    gameFrame++
    requestAnimationFrame(drawFrame)
}
drawFrame()


console.log(ctx)