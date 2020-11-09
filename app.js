

document.addEventListener('DOMContentLoaded',  function(){ 

    document.addEventListener('keydown', function(e){
        if(e.key==='p'){
           paused=true;
           gameStatus="gameOver";
           if (paused===true){
            gamePauseMessage()
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
            crashEvent = 0;
            startGame();
            if(playMuisc === 0){
                playMusic = 1;
                cityPop.play();
            }
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



pickAlane2()

function rePaint(){
        
        

        if(gameStatus === "running"){
            gameRunnig()
        }else{
            gameNotRunning()
        }
         ctx.clearRect(0, 0, fieldWidth, fieldHeight)
         drawBgImg(roadImages[0])
     if(gameStatus==="running"&&gameWon === false&&　paused===false){
        background()
        userCar.render() 
        car2();
        car3();
        carRangeCheck();
        }else{
        staticRender();
         document.addEventListener('keydown', function(e){
             if(e.key==='s'){
                 startGame();
             }
         })
     }
     detectCrash();
     detectCrash2(); 
     detectCrash3(); 
     detectCrashCrazyDrvier(); 
    }//closes rePaint function!!
   
    setInterval(rePaint, 1000/60);
     ////////////////////////////////////////////////
    })//closes DOMcontentload event