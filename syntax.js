const displayController = (() => {
    const renderMessage = (message) => {
        document.querySelector("#message").innerHTML = message;
    }
    return{
        renderMessage,
    }
})();

const Gameboard = (() =>{
    let gameboard =["","","","","","","","",""]

    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square,index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`
        })
        document.querySelector("#gameboard").innerHTML = boardHTML;
        const squares =document.querySelectorAll(".square");
        squares.forEach((square) =>{
            square.addEventListener("click", Game.handleClick);
        })
    }

    const update = (index, value) =>{
        gameboard[index] = value;
        render();
    };

    const getGameBoard = () => gameboard;
   
    return{
        render,
        update,
        getGameBoard,
    }
})()

const createPlayer = (name, mark) =>{
    return{
        name,
        mark,
    }
}
const Game = (() => {
    let players =[];
    let currentPlayerIndex = 0;
    let gameOver = false;

    const start = () => {
        players =[
            createPlayer(document.querySelector("#player1").value,"X"),
            createPlayer(document.querySelector("#player2").value, "O"),
            //createPlayer(document.querySelector("#player2").value,"O"),
        ]
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
    }

    const handleClick =(event) =>{
        let index = parseInt(event.target.id.split("-")[1]);
        
        //console.log(event.target.id);
         if (Gameboard.getGameBoard()[index] !== "")
            return;

        Gameboard.update(index, players[currentPlayerIndex].mark)

        //if(checkForWin(Gameboard.getGameBoard().players[currentPlayerIndex].mark)){
            if (checkForWin(Gameboard.getGameBoard())) {

            gameOver = true;
            //alert(`${players[currentPlayerIndex].name} won!!`)
            displayController.renderMessage(`${players[currentPlayerIndex].name}Wins!!`)
        }
        else if(checkForTie(Gameboard.getGameBoard())){
            gameOver = true;
            //alert(`Its a Tie!!`)
            displayController.renderMessage("Its a Tie!!");
        }
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 :0;
    }
    
    const restart = () =>{
        for (let i = 0; i < 9; i++){
            Gameboard.update(i, "");
        }
        Gameboard.render();
        document.querySelector("#message").innerHTML = "";
    }
    return{
        start,
        restart,
        handleClick
    }
})();

function checkForWin(board){
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < winningCombinations.length; i++){
        const[a, b, c] = winningCombinations [i];
        if(board[a] && board[a] === board[b] && board[a] ===board[c]){
            return true;
        }
    }
    return false;
}

function checkForTie(board){
    return board.every(cell => cell !== "")
}

const restartButton = document.querySelector("#restartBtn");
restartButton.addEventListener("click", () =>{
    Game.restart();
})

const startButton = document.querySelector("#startBtn");
startButton.addEventListener("click", () =>{
   Game.start();
})