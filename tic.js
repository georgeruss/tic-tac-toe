const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "","", "", "", "", "", ""];

let currentPlayer = "X";

let running = true;

intializeGame();

function intializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click",restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
} // initializeGame

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex] != "" || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
} // cellClicked

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
} // updateCell

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
} // changePlayer

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i<winConditions.length; i++) {
        const condtion = winConditions[i];
        const cellA = options[condtion[0]];
        const cellB = options[condtion[1]];
        const cellC = options[condtion[2]];
    
        if (cellA == "" || cellB == "" || cellC == "") continue;
        else if (cellA == cellB && cellB == cellC && cellA == cellC) {
            roundWon = true;
            break;
        } // if
    } // for
    if (roundWon) {statusText.textContent = `${currentPlayer} wins!`; running = false;} 
    else if (!options.includes("")) {statusText.textContent = `It's a Draw!`; running = false;}
    else { changePlayer()};
} // checkWinner

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "","", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
} // restartGame