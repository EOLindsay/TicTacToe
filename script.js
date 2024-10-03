const squares = document.querySelectorAll('.square');
const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restartBtn');
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

let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = false;

initializeGame();

function initializeGame() {
    squares.forEach(square => square.addEventListener('click', squareClicked));
    restartBtn.addEventListener('click', restartGame) ;
    statusText.textContent = `${currentPlayer}'s turn`;
    gameActive = true;
}

function squareClicked() {
    const squareIndex = this.getAttribute('squareIndex');

    if(options[squareIndex]  != '' || !gameActive){
        return;
    }

    updateSquare(this, squareIndex);
    checkWinner();
}

function updateSquare(square, index) {
    options[index] = currentPlayer;
    square.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const squareA = options[condition[0]];
        const squareB = options[condition[1]];
        const squareC = options[condition[2]];
        
        if (squareA == '' || squareB == '' || squareC == '') {
            continue;
        }
        if (squareA == squareB && squareB == squareC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`
        gameActive = false;
    } else if (!options.includes('')) {
        statusText.textContent = 'Draw!';
        gameActive = false;
    } else{
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = 'X';
    options = ['', '', '', '', '', '', '', '', ''];
    statusText.textContent = `${currentPlayer}'s turn`;
    squares.forEach(square => square.textContent = '');
    gameActive = true;
}