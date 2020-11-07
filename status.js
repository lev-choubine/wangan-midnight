//canvas
const game = document.querySelector('#game');
const computedStyle = getComputedStyle(game);
const height =computedStyle.height
const width = computedStyle.width

///STATUS VARIABLES/
let gameStatus = 'gameOver'//defines if the games is runni
let gameWon = false;
let crazyStatus = false;
let crazyStatus2 = false;
let carHit = true;
let sugoi = false;
let car2enter = false;
let car3enter = false;
let paused = false;
let crashEvent = false;

//COUNTERS///
let counter = 0;//for animation
let carOneCounter = 0;// sets counter to move oncoming car 1
let carTwoCounter =0;
let carThreeCounter = 0;
let pointAccumulator = 0;


//sets a counter to run road lane animation

var line1 = document.getElementById("game");

let crazyIndex;

var ctx = line1.getContext("2d");
//DEFAULTS
const laneDefault = 38;
const laneGap = 75;
const pointAccumulatorDefault = 0;
const setPointAmount = 1500;
const oneWin = 300;
const step = 20;// sets step for user movement
const carRange = 380;// set visible range for cars 
const fieldHeight = 300;
const fieldWidth = 300
//CAR MOVEMENT
let carOne;
let carTwo;
let carThree;
let carStep = 4;// sets step for oncoming cars
const carStepDefault = 4;
let carImage = otherCarImages;

//STEPS
//lane properties
let lane = 38;// sets property for car lane coordinates
let lane2 = 38;
let lane3 = 38;





class Car {
    constructor(centerX, centerY, status, image) {
        this.x = centerX-20;
        this.y = centerY -15;
        this.width = 40;
        this.height = 40;
        this.crazyDriver = status;
        this.image = image;
        this.live = carHit;
     }render(){
        const x = this.x;
        const y = this.y;
        const w = this.width;
        const h = this.height;
        const img = new Image();
        img.onload = draw;
        img.src = this.image;
        function draw() {
        const ctx = document.querySelector('canvas').getContext('2d');
        ctx.drawImage(img, x, y, w, h);
        }
        draw();
     }
}; 

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

  carCrashSound = new sound(carCrashPath);

const userCar = new Car(150,274, crazyStatus, userCarImage);
