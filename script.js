"use strict";
window.addEventListener("load", start);

// ************************************VIEW****************************************************
function makeBoardclickable() {
    document.querySelector("#board").addEventListener("click", boardClicked);
    } 
 function makeButtonClickable(){
    document.querySelector("#restart").addEventListener("click", restartGame) ;
 } 
 function restartGame(){    
    emptyBoard();
    document.querySelector("#restart").classList.add('hide')
    console.log("restartGame");
    document.querySelector("#board").addEventListener("click", boardClicked);
    
 }  
function boardClicked(event) {
    // console.log("boardClicked");
    if(event.target.classList.contains("cell")) {
     const cell=event.target;
    // console.log(cell);
   
    const col=cell.dataset.col;
    // console.log(`clicked on cell: ${row}, ${col}`);
    selectCol(col);
    }
}
function displayBoard(){
        for(let row=0; row<6; row++){
            for(let col=0; col<7; col++){
                const value=readFromCell(row,col);
                const cell= document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                switch(value){
                    case 0:
                        cell.textContent="0";
                        break;
                    case 1:
                        cell.textContent="1";
                        break;
                    case 2:
                        cell.textContent="2";
                        break;
                }
            }
        }
    }
    //this function needs to be refactored: if a winner is found, the game should stop and the winner should be displayed
    function displayWinner(status, player){
        const nextPlayer=player==1?"2":"1";
        const winnerDisplay=document.querySelector("#status");
        winnerDisplay.innerHTML="";
        if(status!==0){
            winnerDisplay.textContent=`Player ${player} wins! GAME OVER!`;
            document.querySelector("#board").removeEventListener("click", boardClicked);
            document.querySelector("#restart").classList.remove('hide');
            exit;
        }else{
            winnerDisplay.textContent=`Player ${nextPlayer}'s turn`;
        }
    }

// ********************************MODEL****************************************************'
const HEIGHT=6;
const WIDTH=7;

const model = [
    [0, 0, 0, 0, 0, 0, 0], // row: 6, col:7 øverste venste hjørne er row:0, col:0 nederste højre hjørne er row:5, col:6
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

function writeToColumn(col,currentPlayer){
    for(let row=HEIGHT-1; row>=0; row--){
        if(model[row][col]===0){
            model[row][col]=currentPlayer;
            // console.table(model);
            return true;
        }
    }
}
function emptyBoard(){
    const model = Array.of(HEIGHT).fill(0).map(() => Array.of(WIDTH).fill(0));
    displayBoard();
    return model;
}

// I still need this or I should totally refactor model....
    function readFromCell(row,col) {  
        return model[row][col];
        }

    function readColumnHeight(col){
        let heightCol=0;
        while(heightCol<HEIGHT && model?.[heightCol][col]!==0){
            heightCol++;
        }
        console.log('columnheight: '+heightCol);
        return heightCol;
    }
// *******************************CONTROLLER****************************************************
function start() {
    console.log("javascript kører") 
   //  emptyBoard(model);
    displayBoard();
    makeBoardclickable();
    makeButtonClickable();
    }
    let currentPlayer=1;
    function switchPlayer() {
        if(currentPlayer===1){
            currentPlayer=2;
            // displayWinner(0,currentPlayer);
            setTimeout(computerTurn, 2000);
            // computerTurn();
        }else{
            currentPlayer=1;
            // displayWinner(0,currentPlayer);
            playerTurn();
        }
    }
    function playerTurn(){
        // what
        
        
            }
            
            function computerTurn(){
                
                
                const availableCols=[];
                
                    for(let col=0; col<WIDTH
                    ; col++){
                        if(readColumnHeight(col)<HEIGHT){
                            availableCols.push([col]);
                        }
                    }
                
                if(availableCols.length>0){
                    const randomIndex=Math.floor(Math.random()*availableCols.length);
                    const dropcol=availableCols[randomIndex];
                    selectCol(dropcol); 
                }
                else{
                    console.log("no more moves available");
                }
        
            }
            
    function selectCol(col) {
    console.log(`selectCol:  ${col}`);
    if(readColumnHeight(col)<HEIGHT){
        writeToColumn(col, currentPlayer);
    // console.table(model);
    displayBoard();
    checkForWin(model,currentPlayer);
    switchPlayer();
    
    
    return true;
    }else{
    return false;
    }
} 
    function checkForWin(board, currentPlayer) {
        let status=0;
        // Check horizontally
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col <= board[row].length - 4; col++) {
                if (
                    board[row][col] === currentPlayer &&
                    board[row][col + 1] === currentPlayer &&
                    board[row][col + 2] === currentPlayer &&
                    board[row][col + 3] === currentPlayer
                ) {
                    for(let i=0; i<4; i++){
                        document.querySelector(`[data-row="${row}"][data-col="${col+i}"]`).classList.add("win");
                    }
                    status=1;
                   
                }
            }
        }
    
        // Check vertically
        for (let col = 0; col < board[0].length; col++) {
            for (let row = 0; row <= board.length - 4; row++) {
                if (
                    board[row][col] === currentPlayer &&
                    board[row + 1][col] === currentPlayer &&
                    board[row + 2][col] === currentPlayer &&
                    board[row + 3][col] === currentPlayer
                ) {
                    for(let i=0; i<4; i++){
                        document.querySelector(`[data-row="${row+i}"][data-col="${col}"]`).classList.add("win");
                    }
                    status=1;
                }
            }
        }
    
        // Check diagonally (top-left to bottom-right)
        for (let row = 0; row <= board.length - 4; row++) {
            for (let col = 0; col <= board[row].length - 4; col++) {
                if (
                    board[row][col] === currentPlayer &&
                    board[row + 1][col + 1] === currentPlayer &&
                    board[row + 2][col + 2] === currentPlayer &&
                    board[row + 3][col + 3] === currentPlayer
                ) {
                    for(let i=0; i<4; i++){
                        document.querySelector(`[data-row="${row+i}"][data-col="${col+i}"]`).classList.add("win");
                    }
                    status=1;
                }
            }
        }
    
        // Check diagonally (top-right to bottom-left)
        for (let row = 0; row <= board.length - 4; row++) {
            for (let col = 3; col < board[row].length; col++) {
                if (
                    board[row][col] === currentPlayer &&
                    board[row + 1][col - 1] === currentPlayer &&
                    board[row + 2][col - 2] === currentPlayer &&
                    board[row + 3][col - 3] === currentPlayer
                ) {
                    for(let i=0; i<4; i++){
                        document.querySelector(`[data-row="${row+i}"][data-col="${col-i}"]`).classList.add("win");
                    }
                    status=1;
                }
            }
        }
    
        displayWinner(status, currentPlayer);
    }
    

