let boxex = document.querySelectorAll(".box");

let turn  = "X";
let isGameOver = false;
this.queueX = [];
this.queueO = [];

if(!isGameOver){
    document.querySelector("#reset-game").style.display = "inline";
}

boxex.forEach((e,index) => {
    e.innerHTML = ""; // remove all the number to the empty string 
    e.addEventListener("click", () =>{
        if(!isGameOver && e.innerHTML === ""){
            e.innerHTML = turn
            if(turn == "X")this.queueX.push(index);
            else this.queueO.push(index);
            console.log(this.queueO.length + " " + this.queueX.length);
            console.log(index + " "+ turn);
            // console.log(turn);
            checkWin();
            removeOX();
            checkDraw();
            changeTurn();
        }
    })
})

// remove X and O if X > 2 and No win and remove O > 2 O no win game 
function removeOX(){
    if(this.queueX.length == 3){
        checkWin();
        if(!isGameOver){
            let index = this.queueX[0];
            this.queueX.shift();
            boxex[index].innerHTML = "";
        }
    }
    if(this.queueO.length == 3){
        checkWin();
        if(!isGameOver){
            let index = this.queueO[0];
            this.queueO.shift();
            boxex[index].innerHTML = "";
        }
    }
    console.log(queueO.length);
    console.log(queueX.length);
}

function checkWin(){
    let winCondition = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ]
    for(let i = 0; i < winCondition.length; i++){
        let v0 = boxex[winCondition[i][0]].innerHTML;
        let v1 = boxex[winCondition[i][1]].innerHTML;
        let v2 = boxex[winCondition[i][2]].innerHTML;
        if(v0 != "" && v0 === v1 && v0 === v2){
            isGameOver = true;
            document.querySelector("#result").innerHTML = turn + " ' s Wins";
            document.querySelector("#play-again").style.display = "inline";
            document.querySelector("#reset-game").style.display = "none";
            for(let j = 0; j < 3; j++){
               boxex[winCondition[i][j]].style.backgroundColor = "#08D9D6";
               boxex[winCondition[i][j]].style.color= "#000";
            }
        }
    }
}
function checkDraw(){
    if(!isGameOver){
        let isDraw = true;
        boxex.forEach(e =>{
            if(e.innerHTML === "")isDraw = false;
        })
        if(isDraw){
            isGameOver = true;
            document.querySelector("#result").innerHTML =  "Game Draws"
            document.querySelector("#play-again").style.display = "inline";
            document.querySelector("#reset-game").style.display = "none";
        }
    }
}


function changeTurn(){
    if(turn == "X"){
        turn  = "0";
        document.querySelector(".bg").style.left = "85px";
    }
    else{
        turn  = "X";
        document.querySelector(".bg").style.left= "0";
    }
}

document.querySelector("#play-again").addEventListener("click",()=>{
    resetGame();
})

document.querySelector("#reset-game").addEventListener("click",()=>{
   resetGame();
})
function resetGame(){
    isGameOver = false;
    turn  = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#result").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";
    document.querySelector("#reset-game").style.display = "inline";
    boxex.forEach(e=>{
        e.innerHTML = "";
        e.style.removeProperty("background-color");
    })
    this.queueO.length = 0;
    this.queueX.length = 0;
}
