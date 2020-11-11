


//////--------------------------BACKGROUND ANIMATION/-------------------/////////////
     
// Declaring a function to render images onto hte HTML CANVAS
     function drawBgImg(img) {
        let bgImg = new Image();
         bgImg.src = img;
         ctx.drawImage(bgImg, 0, 0);  
     }   
     
    
 // Switching images in the background. Pulling them from a an array to enable animation. 
     function background(){
         if(counter===0){
            drawBgImg(roadImages[0]) 
              counter = 1;
             }else if(counter === 1){
                drawBgImg(roadImages[1])
                 counter = 2;
             }else if(counter === 2){
                drawBgImg(roadImages[2])
                 counter = 3;
             }else if(counter === 3){
                drawBgImg(roadImages[3])
                 counter = 4;
             }else{
                drawBgImg(roadImages[4])
              counter = 0;
         }
     }
//////--------------------------PICKING CAR LANES-------------------/////////////

// ----PICKS A LANE /-------


function pickAlane () {
    let index = Math.floor(Math.random() * 4);
    lane = laneChoices[index];
    crazyDriver2()
}



function pickAlane2 () {
    let index = Math.floor(Math.random() * 4);
    lane2 = laneDefault + (laneGap * index);    
}

function pickAlane3 () {
let index = Math.floor(Math.random() * 4);
lane3 = laneDefault + (laneGap * index);    
}
//----CRAZY DRIVER---???
function crazyDriver2 () {
    crazyIndex = Math.floor(Math.random() * 5);
    if (crazyIndex === 4){
        carImage =crazyDriverCarImage
        carStep = Math.floor(carStep /2 );
        crazyStatus = true;
        gameStatus = 'running';
    }
}



//////--------------------------RENDERING POP-UP ELEMENTS/-------------------/////////////
//--------START GAME ----------//
function startGameMessage(){
    terebi.style.backgroundImage="url('old_tv_empty_screen.png')"
    pointTracker.innerText="000";
    instructionsOneDisplay.style.visibility="hidden";
    instructionsTwoDisplay.style.visibility="hidden";   
}

//----GAME PAUSED----//
function gamePauseMessage(){
            mangaMessage.style.visibility="visible";
            racerQuote.innerText=greeting;
            blob.style.visibility="visible";
            blob.innerText="ガンバレ！！";
            cheers.style.visibility="visible";
            speil.innerText = "press 'R' to resume"
            instructionsOneDisplay.style.visibility="visible";
            instructionsTwoDisplay.style.visibility="visible";
            instructionsTwoDisplay.style.marginTop="25%";
}

//--------GAME RUNNING--------//
function gameRunnig(){
    cheers.style.visibility='hidden';
    blob.style.visibility='hidden';
    mangaMessage.style.visibility="hidden";
    pointsDisplay.style.visibility="visible";
}
//--------GAME NOT RUNNING--------//
function gameNotRunning(){
    blob.style.visibility='visible';
    cheers.style.visibility='visible';
    mangaMessage.style.visibility="visible";
    pointsDisplay.style.visibility="hidden";
}

// ----CAR CRASH /-------
function carCrashPopUps() {
    if(crashEvent === 0){
        crashEvent = 1;
        carCrashSound.play();
    }
    blob.innerText='ガシャンッ!';
    terebi.style.backgroundImage=crash
    mangaMessage.style.visibility="visible";
    racerQuote.innerText = driverQuoute;
    speil.innerText = "Click on the car to begin or hit 'S";
}

// ----SUGOII /-------
function sugoii(){
   
    blob.innerText='スゴイ！！';
    blob.style.visibility="visible";
    cheers.style.visibility="visible";
    speil.innerText = "Double Points!"
    setTimeout(function (){blob.visibility="hidden";cheers.visibility="hidden"
    
     }, 5000)
}
//--------undefined for now -----------//
function winMessage() {
    
    mangaMessage.style.visibility="visible";
    racerQuote.innerText = win;
    blob.innerText='デキタ‼︎';
    blob.style.visibility="visible";
    cheers.style.visibility="visible";
    pointsDisplay.style.visibility="hidden"
    speil.innerText = "You Win!!!"; 
}

function staticRender() {
    userCar.render() 
    carOne.render()
    carTwo.render()
    carThree.render()
    
    if(paused === false){
       winMessage()
    }
}



//////---------------------------CAR MOVEMENT FUNCTIONS-----------------//////////////
//---------MOVE CAR1--------//
function carMove(){
    carOne = new Car(lane,(carOneCounter), crazyStatus, carImage);//creates a carOne object
         carOne.render() //draws the car
         carOneCounter = carOneCounter + carStep //moves the car in canvas
         if (carOne.crazyDriver === true && carOne.y ===(userCar.y+userCar.height)){//checks for a grey car
             pointAccumulator = pointAccumulator + oneWin;//accumulates points if you hit the grey car
             pointTracker.innerHTML=pointAccumulator;//cnahges point value on your screen
             if(pointAccumulator >= setPointAmount){// wins the game once you accumulate  enough points
                     gameWon = true;
                     pointSounds.play()
             document.addEventListener('keydown', function(e){
                 if(e.key==='s'){//enables you to start the game again
                     console.log(gameStatus);
                     gameWon = false;
                     startGame();
                 }})
             }
         } 
         return carOneCounter;
    };

///----------MOVE CAR2----------//////    

function car2(){
    if (car2enter === true){
        carTwo = new Car(lane2,(carTwoCounter),crazyStatus2, otherCarImages);   
    carTwo.render()/////Second car renders here
    carTwoCounter = carTwoCounter + (carStepDefault -2);
    if (carTwoCounter > carRange){//car left canvas
        carTwoCounter = 0;
           pickAlane2()
           while(lane2 === lane){
               pickAlane2()  
            }
        }
    return carTwoCounter;
}else{
    
}        
}
//----------MOVE CAR3---------///
function car3(){
    if (car3enter === true){
        carThree = new Car(lane3,(carThreeCounter), crazyStatus2, otherCarImages);   
        carThree.render()/////Second car renders here
        carThreeCounter = carThreeCounter + (carStepDefault -1);
        if (carThreeCounter > carRange){
            carThreeCounter = 0;
            pickAlane3()
            while(lane3 ===lane2||lane3 === lane){
                pickAlane3()
            }  
        }
    return carThreeCounter; 
}else{
   
}
}
//------------------STATUS FUNCTIONS-----------///////
/////--START GAME FUNCTION--------/////
function startGame(){
    carOneCounter =0;
    carTwoCounter =0;
    carThreeCounter =0;
    carOne = 0;
    carTwo = 0;
    carThree = 0;
    gameStatus="running";
    carStep =carStepDefault;
    crazyStatus = false;
    carImage = carImageDefault;
    pointAccumulator = pointAccumulatorDefault;
    // clearInterval(rePaint, 1000/80);
    car2enter = false;
    car3enter = false;
    
    setTimeout(function(){ car2enter = true;carTwoCounter =0; }, 600);
    setTimeout(function(){ car3enter = true;carThreeCounter=0 }, 1200);
    pickAlane()
    pickAlane2()
    pickAlane3()
    startGameMessage()
            
}
//-----------------DETECT CRASH FOR CAR 1-----------///
function detectCrash() {
    if(carOne.crazyDriver === false){
            if(userCar.x < carOne.x + carOne.width 
            && userCar.x + userCar.width > carOne.x
            && userCar.y < carOne.y +carOne.height
            && userCar.y + userCar.height > carOne.y){
             gameStatus= 'gameOver';
             carCrashPopUps()
             return gameStatus;
        }  
    }
}

//----------------DETECT CRASH FOR CAR 2-----------//
function detectCrash2() { 
       if(userCar.x < carTwo.x + carTwo.width 
       && userCar.x + userCar.width > carTwo.x
       && userCar.y < carTwo.y +carTwo.height
       && userCar.y + userCar.height > carTwo.y){
        gameStatus= 'gameOver';
        carCrashPopUps()
      
        return gameStatus;
    }    
}

//-----DETECT CRASH FOR CAR 3--------//
function detectCrash3() {
       if(userCar.x < carThree.x + carThree.width 
       && userCar.x + userCar.width > carThree.x
       && userCar.y < carThree.y +carThree.height
       && userCar.y + userCar.height > carThree.y){
        gameStatus= 'gameOver';
        carCrashPopUps()
       
      
        
        return gameStatus;
    } 
}  
//-------DETECT CRASH FOR CRAZY DRIVER--------//
function detectCrashCrazyDrvier() {
    if (carOne.crazyDriver === true){
        if(userCar.x < carOne.x + carOne.width 
            && userCar.x + userCar.width > carOne.x
            && userCar.y < carOne.y +carOne.height 
            && userCar.y > carOne.y +carOne.height + 38
            && userCar.y + userCar.height > carOne.y + carOne.height){
                
               
                gameStatus= 'gameOver';
             return gameStatus;
         } else {
            doublePoints() 
           
         }
         if(sugoi===true&&gameWon === false){
            sugoii()
            
         }
    }
}

//-------BUMPING A CAR OFF THE ROAD GENERATING DOUBLE POINTS--------//
function doublePoints(){
    if(userCar.x <= carOne.x + carOne.width
        &&userCar.x + userCar.width > carOne.x + carOne.width  
        &&  userCar.y < carOne.y + carOne.height
        && userCar.y + userCar.height > carOne.y
        && carHit ===true ){
           rightBump()
             
        }else if(userCar.x + userCar.width >= carOne.x
           && userCar.x < carOne.x 
           &&  userCar.y < carOne.y + carOne.height
           && userCar.y + userCar.height > carOne.y
           && carHit ===true){
           leftBump()        
        }
       
}


//-------------BUMPING A CAR FROM THE RIGHT HAND SIDE---------//
function rightBump(){
    lane = lane - 35;
 
    pointSounds.play()
    pointAccumulator = pointAccumulator + oneWin
    carHit = false;
    sugoi = true;
    pointTracker.innerText = pointAccumulator;
}
//-------------BUMPING A CAR FROM THE LEFT HAND SIDE---------//
function leftBump(){
    lane = lane + 35;
 
    pointSounds.play()
    pointAccumulator = pointAccumulator + oneWin
    carHit = false;
    sugoi = true
    pointTracker.innerText = pointAccumulator;
}

//--------RESETTING CRAZY DRIVER CAR TO CAR-------------------
function crazyDriverReset() {
    carStep =carStepDefault;
     crazyStatus = false;
     carImage = carImageDefault;
     carHit = true;
     sugoi = false;
     pickAlane();
     while(lane3 ===lane){
     pickAlane()
}      
}
///------CAR RANGE-----//
function carRangeCheck() {
    if(carOneCounter < carRange){//indicates that the car is still moving in the feild and hasn't comleted it's path
    carMove();
   }else{//resets conditions when the car reaches the end of
    carOneCounter = 0;
    if(crazyStatus = true){
    crazyDriverReset()
    }
    return carOneCounter;  
}
}