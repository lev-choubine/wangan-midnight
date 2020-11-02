////////////Setting up a square canvas//////////

const game = document.querySelector('#game');
const computedStyle = getComputedStyle(game);
const height =computedStyle.height
const width = computedStyle.width

//Setting up global variables for the game
//FIELD PROPERTIES
const fieldHeight = 300;//height of the field that corresponds to html element parameter - hard coded for now
const fieldWidth = 300;//width of the field that corresponds to html element parameter - hard coded for now
const linex1 = 75;//x coordinates of the first car lane
const linex2 = 150;//x coordinates of the second car lane
const linex3 = 225;//x coordinates of the third car lane
let counter = 0;//sets a counter to run road lane animation
var line1 = document.getElementById("game");
var ctx = line1.getContext("2d");
const userRangeLeft = 19;//sets range for user movement
const userRangeRight = 281;//set range for user movement
const step = 20;// sets step for user movement
let carStep = 5;// sets step for oncoming cars
let carOneCounter = 0;// sets counter to move oncoming car 1
const carRange = 600;// set visible range for cars 
let lane = 38;
const laneDefault = 38;
const laneGap = 75;
let carOne;
let gameStatus = 'runnig';


//Defining parameters for Cars
class Car {
    constructor(centerX, centerY,color) {
        this.x = centerX-20;
        this.y = centerY -15;
        this.width = 40;
        this.height = 30;
        this.color = color;
        this.crazyDiver = false
     }render(){
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
     }
}    

//Let's make a user car
const userCar = new Car(150,274,"#BADA55");


//Enabling user car to move on screen
let isPressed ={}; 

function onKeypress (e) {
    isPressed[e.key] = true;
             if(e.key==='a'){
                 if( userCar.x > 18 ){
                     userCar.x -= step;
                 }
              }else if(e.key==='d'){
                if(userCar.x < 248){
                    userCar.x += step;
        }   
    } 
}

function onKeyUp(e) { 
    isPressed[e.key] = false;
}
document.addEventListener('keydown', onKeypress);
document.addEventListener('keyup', onKeyUp);



 


/////////// Drawing and Definig Car Lanes /////////
//Building a function that draws a single line
function drawLine(x,y1,y2){
    
    ctx.beginPath();
    ctx.moveTo(x,y1);    
    ctx.lineTo(x,y2);
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();  

}

////Compiling line variation for game background animation//////

function roadOption1(){
    
    drawLine(linex1,0,100);
    drawLine(linex2,0,100);
    drawLine(linex3,0,100);
    drawLine(linex1,200,300);
    drawLine(linex2,200,300);
    drawLine(linex3,200,300); 
}
 //roadOption1();

 function roadOption2(){
    drawLine(linex1,0,100);
    drawLine(linex2,0,100);
    drawLine(linex3,0,100);
    drawLine(linex1,100,200);
    drawLine(linex2,100,200);
    drawLine(linex3,100,200); 
}
// roadOption2()

function roadOption3(){
    drawLine(linex1,100,200);
    drawLine(linex2,100,200);
    drawLine(linex3,100,200);
    drawLine(linex1,200,300);
    drawLine(linex2,200,300);
    drawLine(linex3,200,300); 
}
// roadOption3()
////////////////////////////////////////////////////
/////Setting Background animation/////////////////
function background(){
    if(counter===0){
         roadOption1()
         counter = 1;

        
        }else if(counter === 1){
            roadOption2()
            counter = 2;
        }else{
            roadOption3()
         counter = 0;
        
    }
}

//randomizing oncoming car lanes
function pickAlane () {
    let index = Math.floor(Math.random() * 4);
    lane = laneDefault + (laneGap * index);
};
// creating a second crazy driver that you have to pass to earn points
function crazyDriver2 () {
    let crazyIndex = Math.floor(Math.random() * 5);
    return crazyIndex;
    }

 

function detectCrash() {
    if(userCar.x < carOne.x + carOne.width 
   && userCar.x + userCar.width > carOne.x
   && userCar.y < carOne.y +carOne.height
   && userCar.y + userCar.height > carOne.y){
    gameStatus= 'gameOver';
    console.log('Crash!!!');
;}    
}


function rePaint(){
 ctx.clearRect(0, 0, fieldWidth, fieldHeight)

 userCar.render()
 if(gameStatus==="runnig"){
    background()
    if(carOneCounter < carRange){
        carMove();    
       }else{
        carOneCounter = 0;
        pickAlane();
        return carOneCounter;
    }
 }else{
     carOne.render();
 }
function carMove(){
    carOne = new Car(lane,(carOneCounter),"#FF0000"); 
        carOne.render() 
        carOneCounter = carOneCounter + carStep
        return carOneCounter;
   };
   


 
 detectCrash();

}

setInterval(rePaint, 1000/80)
