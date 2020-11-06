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
    let carTwoCounter =0;
    let carThreeCounter = 0;
    const carRange = 380;// set visible range for cars 
    let lane = 38;
    let lane2 = 38;
    let lane3 = 38;
    const laneDefault = 38;
    const laneGap = 75;
    let carOne;
    let carTwo;
    let carThree;
    let gameStatus = 'gameOver';
    let crazyIndex;
    let crazyIndex2;
    let carOneColor = "#FF0000";
    const carOneColorDefault= "#FF0000";
    let crazyStatus = false;
    let crazyStatus2 = false;
    let pointAccumulator = 0;
    const pointAccumulatorDefault = 0;
    const setPointAmount = 1500;
    const oneWin = 300;
    let gameWon = false;
    let car2enter = false;
    let car3enter = false;
    let carImage = 'NicePng_car-top-view-png_9645777.png';
    const carImageDefault = 'NicePng_car-top-view-png_9645777.png'
    const otherCarImages = 'NicePng_car-top-view-png_9645777.png'
    const crash ="url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f39715b0-a41b-401f-8482-85b57264b6f5/d27o4c6-7630c630-04e1-4161-8a51-b21e0f669c3f.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZjM5NzE1YjAtYTQxYi00MDFmLTg0ODItODViNTcyNjRiNmY1XC9kMjdvNGM2LTc2MzBjNjMwLTA0ZTEtNDE2MS04YTUxLWIyMWUwZjY2OWMzZi5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.4r8Vo7zPBQ6pnAunFIgOjBmBa7MgghZygGZnprJqkrM')"
    const driverQuoute = "“If everything seems under control, you're not going fast enough.”"
    const greeting ='Speed has never killed anyone, suddenly becoming stationary… that’s what gets you. '
    const win ="“It's hard to drive at the limit, but it's harder to know where the limits are.”"
    let carHit = true;
    let sugoi = false;
    let paused = false;
    
    //////////////

    document.addEventListener('keydown', function(e){
        if(e.key==='p'){
           paused=true;
           gameStatus="gameOver";
           if (paused===true){
            document.getElementById('message').style.visibility="visible";
            document.getElementById('blob').style.visibility="visible";
            document.getElementById('blob').innerText="ガンバレ！！";
            document.getElementById('cheers').style.visibility="visible";
            document.getElementById('speil').innerText = "press 'R' to resume"
            document.getElementById('instructions').style.visibility="visible";
            document.getElementById('instructions2').style.visibility="visible";
            document.getElementById('instructions').style.marginTop="-35%";
            document.getElementById('instructions2').style.marginTop="45%";
           }
           
        　　e.preventDefault();
        }
        
    })

    document.addEventListener('keydown', function(e){
        if(e.key==='r'){
            paused=false;
            gameStatus="running";
            e.preventDefault();
        }
        
    })
    

    document.addEventListener('keydown', function(e){
        if(e.key==='s'){
            startGame();
            e.preventDefault();
        }
        
    })

    document.getElementById('terebi').addEventListener('click', function(e){
        startGame()
        e.preventDefault();
    })
  
           
        
    
    document.addEventListener('keydown', function(e){
        if(e.key==='q'){
            gameStatus ='gameOver'
            document.getElementById('speil').innerText = "Bye Bye Now"
            document.getElementById('blob').innerText="マタネ!"
        }
        
    })
    
    //Defining parameters for Cars
    class Car {
        constructor(centerX, centerY,color, status, image) {
            this.x = centerX-20;
            this.y = centerY -15;
            this.width = 40;
            this.height = 40;
            this.color = color;
            this.crazyDriver = status;
            this.image = image;
            this.live = carHit;
         }render(){
            // ctx.fillStyle=this.color;
            // ctx.fillRect(this.x, this.y, this.width, this.height)
            /////////////////////////////////////////////////////
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
    
    let isPressed ={};
    function onKeypress (e) {
        if(gameStatus==='running' ){
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
        
    }
    
    function onKeyUp(e) { 
        isPressed[e.key] = false;
    };
     
        document.addEventListener('keydown', onKeypress);
        document.addEventListener('keyup', onKeyUp);
    
    //Let's make a user car
    const userCar = new Car(150,274,"#BADA55", crazyStatus, 'pngkey.com-white-car-icon-png-7789675.png');
   
   
      
    
    
    
     
    
    
    /////////// Drawing and Definig Car Lanes /////////
    //Building a function that draws a single line
    
    ////Compiling line variation for game background animation//////

    function drawBgImg(img) {

        let bgImg = new Image();
        bgImg.src = img;
      
        ctx.drawImage(bgImg, 0, 0);
       
    }   
    
    function roadOption1(){
        drawBgImg('road-3.jpg') 
      
    }
     //roadOption1();
    
     function roadOption2(){
        drawBgImg('road-5.jpg')
    }
    // roadOption2()
    
    function roadOption3(){
        drawBgImg('road-2.jpg')
    }

    function roadOption4(){
        drawBgImg('road-4.jpg')
    }

    function roadOption5(){
        drawBgImg('road-1.jpg')
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
            }else if(counter === 2){
                roadOption3()
                counter = 3;
            }else if(counter === 3){
                roadOption4()
                counter = 4;
            }else{
                roadOption5()
             counter = 0;
            
        }
    }
    
    //randomizing oncoming car lanes
    function pickAlane () {
        let index = Math.floor(Math.random() * 4);
        lane = laneDefault + (laneGap * index);
        crazyDriver2()
        
    };

    function pickAlane2 () {
            let index = Math.floor(Math.random() * 4);
            lane2 = laneDefault + (laneGap * index);    
    };

    function pickAlane3 () {
        let index = Math.floor(Math.random() * 4);
        lane3 = laneDefault + (laneGap * index);    
};

    
    // creating a second crazy driver that you have to pass to earn points
    function crazyDriver2 () {
        crazyIndex = Math.floor(Math.random() * 5);
        if (crazyIndex === 4){
            carImage ='kisspng-car-clip-art-bed-top-view-5ace3e1db48997.1233454315234657577395.png'
            carStep = Math.floor(carStep /2 );
            carOneColor = '#00FFFF'; 
            crazyStatus = true;
            gameStatus = 'running';
        }
    
        
        }
    
     
    
    function detectCrash() {
        if(carOne.crazyDriver === false){
            if(userCar.x < carOne.x + carOne.width 
                && userCar.x + userCar.width > carOne.x
                && userCar.y < carOne.y +carOne.height
                && userCar.y + userCar.height > carOne.y){
                 gameStatus= 'gameOver';
                 document.getElementById('blob').innerText='ガシャンッ!';
                 document.getElementById('terebi').style.backgroundImage=crash
                 document.getElementById('message').style.visibility="visible";
                 document.getElementById('racequote').innerText = driverQuoute;
                 document.getElementById('speil').innerText = "Click on the TV to begin or hit 'S";
                 return gameStatus;
             }  
        }
     
    }

    function detectCrash2() {
        
    if(userCar.x < carTwo.x + carTwo.width 
       && userCar.x + userCar.width > carTwo.x
       && userCar.y < carTwo.y +carTwo.height
       && userCar.y + userCar.height > carTwo.y){
        gameStatus= 'gameOver';
        document.getElementById('blob').innerText='ガシャンッ!';
        document.getElementById('terebi').style.backgroundImage=crash
        document.getElementById('message').style.visibility="visible";
        document.getElementById('racequote').innerText = driverQuoute;
        document.getElementById('speil').innerText = "Click on the TV to begin or hit 'S";
        return gameStatus;
    }    
    }

    function detectCrash3() {
        if(userCar.x < carThree.x + carThree.width 
           && userCar.x + userCar.width > carThree.x
           && userCar.y < carThree.y +carThree.height
           && userCar.y + userCar.height > carThree.y){
            gameStatus= 'gameOver';
            document.getElementById('blob').innerText='ガシャンッ!';
            document.getElementById('terebi').style.backgroundImage=crash
            document.getElementById('message').style.visibility="visible";
            document.getElementById('racequote').innerText = driverQuoute;
            document.getElementById('speil').innerText = "Click on the TV to begin or hit 'S";
            
            return gameStatus;
        } }  
        
        function detectCrashCrazyDrvier() {
            if (carOne.crazyDriver === true){
                if(userCar.x < carOne.x + carOne.width 
                    && userCar.x + userCar.width > carOne.x
                    && userCar.y < carOne.y +carOne.height 
                    && userCar.y > carOne.y +carOne.height + 38
                    && userCar.y + userCar.height > carOne.y + carOne.height){
                        document.getElementById('blob').innerText='ガシャンッ!!!!'; 
                        document.getElementById('terebi').style.backgroundImage=crash
                        document.getElementById('message').style.visibility="visible";
                        document.getElementById('racequote').innerText = driverQuoute;
                        document.getElementById('speil').innerText = "Click on the TV to begin or hit 'S";
                        gameStatus= 'gameOver';
                    
                     return gameStatus;
                 } else {
                     if(userCar.x <= carOne.x + carOne.width
                     &&userCar.x + userCar.width > carOne.x + carOne.width  
                    &&  userCar.y < carOne.y + carOne.height
                    && userCar.y + userCar.height > carOne.y
                    && carHit ===true ){
                         lane = lane - 35;
                         
                         
                         
                            console.log('BOOOOOM!!!')
                            pointAccumulator = pointAccumulator + 300
                            carHit = false;
                            sugoi = true;
                            console.log(carOne.live)
                            document.getElementById('point-tracker').innerText = pointAccumulator;
                            // setInterval( function(){document.getElementById('blob').innerText='スゴイ！！';}, 500)
                            // setTimeout(  function (){document.getElementById('blob').innerText='スゴイ！！';}, 3000)
                            // document.getElementById('blob').style.visibility="visible";
                     }else if(userCar.x + userCar.width >= carOne.x
                        && userCar.x < carOne.x 
                        &&  userCar.y < carOne.y + carOne.height
                        && userCar.y + userCar.height > carOne.y
                        && carHit ===true){
                          
                                console.log('BOOM!!!')
                                pointAccumulator = pointAccumulator + 300
                                carHit = false;
                                sugoi = true
                                console.log(carOne.live)
                              
                                
                     
                            document.getElementById('point-tracker').innerText = pointAccumulator;
                            // setInterval( function(){document.getElementById('blob').innerText='スゴイ！！';}, 500)
                            // setTimeout(  function (){document.getElementById('blob').innerText='スゴイ！！';}, 3000)
                            // document.getElementById('blob').style.visibility="visible";
                            // document.getElementById('blob').style.visibility="visible";
                         
                         lane = lane + 35;
                     }
                    
                 }
                 if(sugoi===true&&gameWon === false){
                    document.getElementById('blob').innerText='スゴイ！！';
                    document.getElementById('blob').style.visibility="visible";
                    document.getElementById('cheers').style.visibility="visible";
                    document.getElementById('speil').innerText = "Double Points!"
                    setTimeout(function (){document.getElementById('blob').visibility="hidden";document.getElementById('cheers').visibility="hidden"
                     }, 5000)
                  

                 }
            }
           

            }

    pickAlane2()
                    
    
    function rePaint(){
        if(gameStatus === "running"){
            document.getElementById('cheers').style.visibility='hidden';
          document.getElementById('blob').style.visibility='hidden';
          document.getElementById('message').style.visibility="hidden";
          document.getElementById('points').style.visibility="visible";
        }else{
            document.getElementById('blob').style.visibility='visible';
            document.getElementById('cheers').style.visibility='visible';
            document.getElementById('message').style.visibility="visible";
            document.getElementById('points').style.visibility="hidden";
        }
     ctx.clearRect(0, 0, fieldWidth, fieldHeight)
     drawBgImg('road.jpeg')
    
     
    //////////CAR RANGE PROPERTIES HERE!!!///
    
     if(gameStatus==="running"&&gameWon === false&&　paused===false){
        background()
        userCar.render() 
        
        

        car2();
        car3();
        if(carOneCounter < carRange){//indicates that the car is still moving in the feild and hasn't comleted it's path
            carMove();
            
           }else{//resets conditions when the car reaches the end of
            carOneCounter = 0;

        
            if(crazyStatus = true){
                carOneColor = carOneColorDefault;
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
            return carOneCounter;
            
        }
     }else{
        userCar.render() 
         carOne.render()
         carTwo.render()
         carThree.render()
         if(paused === false){
                    document.getElementById('message').style.visibility="visible";
            　　　　 document.getElementById('racequote').innerText = win;
           　　　　　 document.getElementById('blob').innerText='デキタ‼︎';
                     document.getElementById('blob').style.visibility="visible";
                     document.getElementById('cheers').style.visibility="visible";
                     document.getElementById('points').style.visibility="hidden"
                     document.getElementById('speil').innerText = "You Win!!!"; 

         }
         
        
         
         document.addEventListener('keydown', function(e){
             if(e.key==='s'){
                 startGame();
                
             }
             
         })
     }
    //////////////////////////////////////////////////////////////////////

    function car2(){
        if (car2enter === true){
            carTwo = new Car(lane2,(carTwoCounter),'#006400', crazyStatus2, otherCarImages);   
        carTwo.render()/////Second car renders here
        carTwoCounter = carTwoCounter + (carStepDefault -1);
       
        if (carTwoCounter > carRange){
            carTwoCounter = 0;
               pickAlane2()
               while(lane2 === lane){
                   pickAlane2()
               
                   
                }
        
        }
                return carTwoCounter;
        }        
    }
    //////////////////////////////////////////////
function car3(){
    if (car3enter === true){
        carThree = new Car(lane3,(carThreeCounter),'#FFFF00', crazyStatus2, otherCarImages);   
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
}}


    function carMove(){
       carOne = new Car(lane,(carOneCounter),carOneColor, crazyStatus, carImage);
       
            carOne.render() 
            carOneCounter = carOneCounter + carStep
           

            if (carOne.crazyDriver === true && carOne.y ===(userCar.y+userCar.height)){
                pointAccumulator = pointAccumulator + oneWin;
                console.log(pointAccumulator);
                document.getElementById('point-tracker').innerHTML=pointAccumulator;
                if(pointAccumulator >= setPointAmount){
                        gameWon = true;
                        
                        console.log('YOU WIN!!!!!!!!')
                         
                document.addEventListener('keydown', function(e){
                    if(e.key==='s'){
                       
                        console.log(gameStatus);
                        gameWon = false;
                        // car2enter= false;
                        // car3enter= false;
                        startGame();
                    }})
                }
                console.log('CRAZY DRIVER POINTS!!!!!');
               
            } 
            return carOneCounter;
            
       };
       
    /////////////////////////////////////////////////
    
     
     detectCrash();
     detectCrash2(); 
     detectCrash3(); 
     detectCrashCrazyDrvier(); 
    }//closes rePaint function!!
    function startGame(){
        carOneColor = carOneColorDefault;
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
                document.getElementById('terebi').style.backgroundImage="url('old_tv_empty_screen.png')"
                document.getElementById('point-tracker').innerText="000";
                document.getElementById('instructions').style.visibility="hidden";
                document.getElementById('instructions2').style.visibility="hidden";
                
                
                
    }
    setInterval(rePaint, 1000/60);
    // setTimeout(function(){ car2enter = true; }, 600);
    // setTimeout(function(){ car3enter = true; }, 1200);
    //////////////////////////////////
    })//closes DOMcontentload event