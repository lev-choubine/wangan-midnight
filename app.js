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
let counter = 0;
var line1 = document.getElementById("game");
var ctx = line1.getContext("2d");
const userRangeLeft = 19;
const userRangeRight = 281;
const step = 5;

//Defining parameters for Cars
class Car {
    constructor(centerX, centerY,color) {
        this.x = centerX-18;
        this.y = centerY -18;
        this.width = 38;
        this.height = 50;
        this.color = color;
     }render(){
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
     }
}    

//Let's make a user car
const userCar = new Car(150,264,"#BADA55");


//Enabling user car to move on screen
let isPressed ={}; 
      
// element.onkeydown = function (e) { 
//     if (!isPressed) { 
//         isPressed = true; 
//         console.log('Key Fired!'); 
//     } 
// }; 
  
// element.onkeyup = function (e) { 
//     isPressed = false; 

// } 
function onKeypress (e) {
    isPressed[e.key] = true;

             if(e.key==='a'){
              
                 if( userCar.x > 18 ){
                     userCar.x -= step;
                 }
                
            }else if(e.key==='d'){
               
                if(userCar.x < 248){
                    console.log(userCar.x)
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







function rePaint(){
 ctx.clearRect(0, 0, fieldWidth, fieldHeight)
 background()
 userCar.render()
}

setInterval(rePaint, 1000/40)
