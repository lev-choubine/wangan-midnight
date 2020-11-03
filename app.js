document.addEventListener('DOMContentLoaded', function(){ 

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
let carStep = 4;// sets step for oncoming cars
const carStepDefault = 4;
let carOneCounter = 0;// sets counter to move oncoming car 1
const carRange = 380;// set visible range for cars 
let lane = 38;
const laneDefault = 38;
const laneGap = 75;
let carOne;
let gameStatus = 'running';
let crazyIndex;
let carOneColor = "#FF0000";
const carOneColorDefault= "#FF0000";
let crazyStatus = false;
let pointAccumulator = 0;
const pointAccumulatorDefault = 0;
const setPointAmount = 600;
const oneWin = 300;
let gameWon = false;

//////////////

document.addEventListener('keydown', function(e){
    if(e.key==='q'){
        gameStatus ='gameOver'
    }
    
})

//Defining parameters for Cars
class Car {
    constructor(centerX, centerY,color, status) {
        this.x = centerX-20;
        this.y = centerY -15;
        this.width = 40;
        this.height = 30;
        this.color = color;
        this.crazyDriver = status;
     }render(){
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
     }
};  

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
};

    document.addEventListener('keydown', onKeypress);
    document.addEventListener('keyup', onKeyUp);

//Let's make a user car
const userCar = new Car(150,274,"#BADA55", crazyStatus);



 


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
    crazyDriver2()
    
};
// creating a second crazy driver that you have to pass to earn points
function crazyDriver2 () {
    crazyIndex = Math.floor(Math.random() * 5);
    if (crazyIndex === 4){
        carStep = Math.floor(carStep /2 );
        carOneColor = '#00FFFF'; 
        crazyStatus = true;
        gameStatus = 'running';
    }

    
    }

 

function detectCrash() {
    if(userCar.x < carOne.x + carOne.width 
   && userCar.x + userCar.width > carOne.x
   && userCar.y < carOne.y +carOne.height
   && userCar.y + userCar.height > carOne.y){
    gameStatus= 'gameOver';
    return gameStatus;
}    
}


function rePaint(){
 ctx.clearRect(0, 0, fieldWidth, fieldHeight)

//////////CAR RANGE PROPERTIES HERE!!!///

 if(gameStatus==="running"&&gameWon === false){
    userCar.render() 
    background()
    if(carOneCounter < carRange){//indicates that the car is still moving in the feild and hasn't comleted it's path
        carMove();    
       }else{//resets conditions when the car reaches the end of
        carOneCounter = 0;
        if(crazyStatus = true){
            carOneColor = carOneColorDefault;
            carStep =carStepDefault;
            crazyStatus = false;
        pickAlane();
        }
        return carOneCounter;
    }
 }else{
    userCar.render() 
     carOne.render()
     document.addEventListener('keydown', function(e){
         if(e.key==='s'){
             console.log('Start GAME!!!!')
             console.log(gameStatus);
             startGame();
         }
         
     })
 }
//////////////////////////////////////////////////////////////////////
function carMove(){
   carOne = new Car(lane,(carOneCounter),carOneColor, crazyStatus); 
        carOne.render() 
        carOneCounter = carOneCounter + carStep
        console.log(carOne.crazyDriver);
        if (carOne.crazyDriver === true && carOne.y ===(userCar.y+userCar.height)){
            pointAccumulator = pointAccumulator + oneWin;
            console.log(pointAccumulator);
            if(pointAccumulator >= setPointAmount){
                    gameWon = true;
                    document.addEventListener('keydown', function(e){
                        if(e.key==='s'){
                            console.log('Start GAME!!!!')
                            console.log(gameStatus);
                            gameWon = false;
                            startGame();
                        }})
                    console.log('YOU WIN!!!!!!!!')
            }
            console.log('CRAZY DRIVER POINTS!!!!!');
           
        } 
        return carOneCounter;
   };
   
/////////////////////////////////////////////////

 
 detectCrash();

}//closes rePaint function!!
function startGame(){
    carOneColor = carOneColorDefault;
            carOneCounter =0;
            gameStatus="running";
            carStep =carStepDefault;
            crazyStatus = false;
            pointAccumulator = pointAccumulatorDefault;
}
setInterval(rePaint, 1000/80);
//////////////////////////////////
})//closes DOMcontentload event
