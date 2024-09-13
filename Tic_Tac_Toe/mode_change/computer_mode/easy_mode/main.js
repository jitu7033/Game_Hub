let boxex = document.querySelectorAll(".box");

let turn  = "X";
let isGameOver = false;

if (!isGameOver) {
    document.querySelector("#reset-game").style.display = "inline";
}

boxex.forEach(e => {
    e.innerHTML = ""; // Clear all the boxes initially
    e.addEventListener("click", () => {
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn;
            checkWin();
            checkDraw();
            if (!isGameOver) {
                changeTurn();
                setTimeout(() => {
                    computerMode();
                }, 100); // Delay computer move for 1 second
            }
        }
    });
});

function checkWin(){
    let winCondition = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    for (let i = 0; i < winCondition.length; i++) {
        let v0 = boxex[winCondition[i][0]].innerHTML;
        let v1 = boxex[winCondition[i][1]].innerHTML;
        let v2 = boxex[winCondition[i][2]].innerHTML;
        if (v0 != "" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            if(turn == "X")document.querySelector("#result").innerHTML = "Player Wins";
            else document.querySelector("#result").innerHTML = "Computer Wins";
            document.querySelector("#play-again").style.display = "inline";
            document.querySelector("#reset-game").style.display = "none";
            for (let j = 0; j < 3; j++) {
               boxex[winCondition[i][j]].style.backgroundColor = "#08D9D6";
               boxex[winCondition[i][j]].style.color= "#000";
            }
        }
    }
}

function checkDraw(){
    if (!isGameOver) {
        let isDraw = true;
        boxex.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        });
        if (isDraw) {
            isGameOver = true;
            document.querySelector("#result").innerHTML = "Game Draws";
            document.querySelector("#play-again").style.display = "inline";
            document.querySelector("#reset-game").style.display = "none";
        }
    }
}

function changeTurn(){
    if (turn === "X") {
        turn  = "0";
        document.querySelector(".bg").style.left = "85px";
    } else {
        turn  = "X";
        document.querySelector(".bg").style.left = "0";
    }
}

// Computer move logic
function computerMode(){
    let winCondition = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    // Try to block or win
    let madeMove = false;
    if (!isGameOver) {
        if(checkComputerWin())return; // Check if computer can win first
        for (let i = 0; i < winCondition.length && !madeMove; i++) {
            let v0 = boxex[winCondition[i][0]].innerHTML;
            let v1 = boxex[winCondition[i][1]].innerHTML;
            let v2 = boxex[winCondition[i][2]].innerHTML;
            // If two spots are filled with the same mark, fill the third
            if (v0 === v1 && v0 !== "" && v2 === "") {
                boxex[winCondition[i][2]].innerHTML = turn;
                madeMove = true;
            } else if (v0 === v2 && v0 !== "" && v1 === "") {
                boxex[winCondition[i][1]].innerHTML = turn;
                madeMove = true;
            } else if (v1 === v2 && v1 !== "" && v0 === "") {
                boxex[winCondition[i][0]].innerHTML = turn;
                madeMove = true;
            }
        }
        // If no winning or blocking move was made, pick a random available spot
        if (!madeMove) {
            let available = [];
            boxex.forEach((box, index) => {
                if (box.innerHTML === "") {
                    available.push(index);
                }
            });
            if (available.length > 0) {
                let randomMove = available[Math.floor(Math.random() * available.length)];
                boxex[randomMove].innerHTML = turn;
            }
        }
        checkWin();
        checkDraw();
        if (!isGameOver) {
            changeTurn();
        }
    }
}

document.querySelector("#play-again").addEventListener("click", ()=>{
    resetGame();
});

document.querySelector("#reset-game").addEventListener("click", ()=>{
    resetGame();
});

function resetGame(){
    isGameOver = false;
    turn  = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#result").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";
    document.querySelector("#reset-game").style.display = "inline";
    boxex.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
    });
}

function checkComputerWin(){
    let winCondition = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    for (let i = 0; i < winCondition.length; i++) {
        let v0 = boxex[winCondition[i][0]].innerHTML;
        let v1 = boxex[winCondition[i][1]].innerHTML;
        let v2 = boxex[winCondition[i][2]].innerHTML;

        if (v0 != "" && v0 === "0") {
            if (v1 === v0 && v2 === "") {
                boxex[winCondition[i][2]].innerHTML = turn;
                checkWin();
                return true; // Stop further execution if computer wins
            } else if (v2 === v0 && v1 === "") {
                boxex[winCondition[i][1]].innerHTML = turn;
                checkWin();
                return true; // Stop further execution if computer wins
            }
        } else if (v1 != "" && v1 === "0") {
            if (v1 === v2 && v0 === "") {
                boxex[winCondition[i][0]].innerHTML = turn;
                checkWin();
                return true; // Stop further execution if computer wins
            }
        }
    }
}
