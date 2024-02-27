"use strict";
window.addEventListener("load", start);

// ************************************VIEW****************************************************
function makeBoardclickable() {
    document.querySelector("#board").addEventListener("click", boardClicked);
    } 
function boardClicked(event) {
    console.log("boardClicked");
    if(event.target.classList.contains("cell")) {
    const cell=event.target;
    console.log(cell);
    const row=cell.dataset.row;
    const col=cell.dataset.col;
    console.log(`clicked on cell: ${row}, ${col}`);
    selectCell(row,col);
    }
}
function displayBoard(){
        for(let row=0; row<6; row++){
            for(let col=0; col<7; col++){
                const value=readFromCell(row,col);
                const cell= document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                switch(value){
                    case 0:
                        cell.textContent="";
                        break;
                    case 1:
                        cell.textContent="X";
                        break;
                    case 2:
                        cell.textContent="O";
                        break;
                }
            }
        }
    }
    function displayWinner(winner){
        const winnerDisplay=document.querySelector("#status");
        winnerDisplay.innerHTML="";
        if(winner===0){
            winnerDisplay.textContent="Undecided!";
        }else{
            winnerDisplay.textContent=`Player ${winner} wins!`;
        }
    }

// ********************************MODEL****************************************************'
const rows=6;
const cols=7;

const model = [
    [0, 0, 0, 0, 0, 0, 0], // row: 6, col:7 øverste venste hjørne er row:0, col:0 nederste højre hjørne er row:5, col:6
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
// function writeToCell(row,col,player) {
//     model[row][col]=player;
//     console.log(model);
//     }
function writeToColumn(col,player){
    for(let row=5; row>=0; row--){
        if(model[row][col]===0){
            model[row][col]=player;
            console.table(model);
            return true;
        }
    }
}
function emptyBoard(){
    model.fill(0);
}
//TODO: change to readColumnHeight
    function readFromCell(row,col) {  
        return model[row][col];
        }
// *******************************CONTROLLER****************************************************
function start() {
    console.log("javascript kører") 
    displayBoard();
    makeBoardclickable();
    }
    let currentPlayer=1;
    function switchPlayer() {
        if(currentPlayer===1){
            currentPlayer=2;
            computerTurn();
        }else{
            currentPlayer=1;
            playerTurn();
        }
    }
    function playerTurn(){
        // what
        console.log("player turn");
            }
            // TODO: change to lookup columns
            function computerTurn(){
                console.log("computer turn");
                // selectCell(0,0);
                const availableCells=[];
                for(let row=0; row<3; row++){
                    for(let col=0; col<3; col++){
                        if(readFromCell(row,col)===0){
                            availableCells.push([row,col]);
                        }
                    }
                }
                if(availableCells.length>0){
                    const randomIndex=Math.floor(Math.random()*availableCells.length);
                    const [row,col]=availableCells[randomIndex];
                    selectCell(row,col); // refactor to selectColumn
                }
                else{
                    console.log("no more moves available");
                }
        
            }
            // TODO: change selectCell to selectColumn
    function selectCell(row, col) {
    console.log(`selectCell: ${row}, ${col}`);
    if(readFromCell(row, col)===0){
    writeToCell(row, col, currentPlayer);
    // console.table(model);
    displayBoard();
    checkForWin(currentPlayer);
    switchPlayer();
    return true;
    }else{
    return false;
    }
    function checkForWin(currentPlayer){
        let winner=0;
        for(let row=0; row<3; row++){
            if(model[row][0]===model[row][1] && model[row][1]===model[row][2] && model[row][0]!==0){
                console.log(`row win for player ${model[row][0]}`);
                winner=currentPlayer;
            }
        }
        for(let col=0; col<3; col++){
            if(model[0][col]===model[1][col] && model[1][col]===model[2][col] && model[0][col]!==0){
                console.log(`col win for player ${model[0][col]}`);
                winner=currentPlayer;
            }
        }
        if(model[0][0]===model[1][1] && model[1][1]===model[2][2] && model[0][0]!==0){
            console.log(`diagonal win for player ${model[0][0]}`);
            winner=currentPlayer;
        }
        if(model[0][2]===model[1][1] && model[1][1]===model[2][0] && model[0][2]!==0){
            console.log(`diagonal win for player ${model[0][2]}`);
            winner=currentPlayer;
        }
        displayWinner(winner);        
    }
    // function checkForWin(board, player) {
    //     // Check horizontally
    //     for (let row = 0; row < board.length; row++) {
    //         for (let col = 0; col <= board[row].length - 4; col++) {
    //             if (
    //                 board[row][col] === player &&
    //                 board[row][col + 1] === player &&
    //                 board[row][col + 2] === player &&
    //                 board[row][col + 3] === player
    //             ) {
    //                 return true;
    //             }
    //         }
    //     }
    
    //     // Check vertically
    //     for (let col = 0; col < board[0].length; col++) {
    //         for (let row = 0; row <= board.length - 4; row++) {
    //             if (
    //                 board[row][col] === player &&
    //                 board[row + 1][col] === player &&
    //                 board[row + 2][col] === player &&
    //                 board[row + 3][col] === player
    //             ) {
    //                 return true;
    //             }
    //         }
    //     }
    
    //     // Check diagonally (top-left to bottom-right)
    //     for (let row = 0; row <= board.length - 4; row++) {
    //         for (let col = 0; col <= board[row].length - 4; col++) {
    //             if (
    //                 board[row][col] === player &&
    //                 board[row + 1][col + 1] === player &&
    //                 board[row + 2][col + 2] === player &&
    //                 board[row + 3][col + 3] === player
    //             ) {
    //                 return true;
    //             }
    //         }
    //     }
    
    //     // Check diagonally (top-right to bottom-left)
    //     for (let row = 0; row <= board.length - 4; row++) {
    //         for (let col = 3; col < board[row].length; col++) {
    //             if (
    //                 board[row][col] === player &&
    //                 board[row + 1][col - 1] === player &&
    //                 board[row + 2][col - 2] === player &&
    //                 board[row + 3][col - 3] === player
    //             ) {
    //                 return true;
    //             }
    //         }
    //     }
    
    //     return false; // No winner found
    // }
    

}