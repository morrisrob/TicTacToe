let turnCount = 0;
let gameStarted = false;
let player1;
let player2;

const eventHandling = (() => {
    const createEventHandlers = () => {
        for (i = 0; i < gameBoard.positions.length; i++) {
            let position = 'pos' + i;
            let num = i;
            let pos = document.getElementById(position);
            pos.addEventListener('click', function _func() {
                gameFlow.turnAction(position, num);
            })
        }
    }
    const removeEventListeners = () => {
        for (i = 0; i < gameBoard.positions.length; i++) {
            let pos = document.getElementById('pos' + i);
            pos.outerHTML = pos.outerHTML;
        }
    }
    return { createEventHandlers, removeEventListeners };
})();

const startResetGame = () => {
    if(gameStarted === false) {  //Button shows Start Game; clicking starts game
        gameStarted = true;
        player1Name = document.getElementById('player1Name').value;
        player2Name = document.getElementById('player2Name').value;
        eventHandling.createEventHandlers();
        document.getElementById('startResetButton').innerHTML = 'Reset Game';
        document.getElementById('player1Name').disabled = true;
        document.getElementById('player2Name').disabled = true;
        player1 = newPlayer(player1Name, 'x', true);
        player2 = newPlayer(player2Name, 'o', false);
        document.getElementById('winnerBox').innerHTML = `It is ${player1Name}'s turn.`;

    } else if (gameStarted === true) {  //Button shows Reset Game; clicking resets game
        gameStarted = false;
        turnCount = 0;
        eventHandling.removeEventListeners();
        document.getElementById('player1Name').disabled = false;
        document.getElementById('player2Name').disabled = false;
        document.getElementById('startResetButton').innerHTML = 'Start Game';
        document.getElementById('winnerBox').innerHTML = '';
        gameBoard.positions = ['', '', '', '', '', '', '', '', ''];
        for (i = 0; i < gameBoard.positions.length; i++) {
            let position = 'pos' + i;
            let pos = document.getElementById(position);
            pos.innerHTML = '';
        }
    }
}

const gameBoard = (() => {
    const positions = ['', '', '', '', '', '', '', '', ''];
    return {
        positions
    };
})();

 const gameFlow = (() => {
     const gameOver = () => {
         eventHandling.removeEventListeners();
     }

    const nextTurn = () => {
        if (player1.active === true) {
            player1.active = false;
            player2.active = true;
            player2.turnReporter();
        } else if (player2.active === true) {
            player1.active = true;
            player2.active = false;
            player1.turnReporter();
        }
    }

    const turnAction = (position, index) => {
            if (document.getElementById(position).innerHTML === 'x' || document.getElementById(position).innerHTML === 'o') {
            } else {
                turnCount++;
                if (player1.active === true) {
                    document.getElementById(position).innerHTML = player1.symbol;
                    gameBoard.positions[index] = player1.symbol;
                } else if (player2.active === true) {
                    document.getElementById(position).innerHTML = player2.symbol;
                    gameBoard.positions[index] = player2.symbol;
                }
                if (turnCount === 9) {
                    eventHandling.removeEventListeners();
                    document.getElementById('winnerBox').innerHTML = 'It is a tie!'
                } else {
                    gameFlow.checkForWinner();
                    gameFlow.nextTurn();
                }
            }  
    }

    const checkForWinner = () => {
        let row1 = gameBoard.positions[0] + gameBoard.positions[1] + gameBoard.positions[2];
        let row2 = gameBoard.positions[3] + gameBoard.positions[4] + gameBoard.positions[5];
        let row3 = gameBoard.positions[6] + gameBoard.positions[7] + gameBoard.positions[8];
        let col1 = gameBoard.positions[0] + gameBoard.positions[3] + gameBoard.positions[6];
        let col2 = gameBoard.positions[1] + gameBoard.positions[4] + gameBoard.positions[7];
        let col3 = gameBoard.positions[2] + gameBoard.positions[5] + gameBoard.positions[8];
        let diag1 = gameBoard.positions[0] + gameBoard.positions[4] + gameBoard.positions[8];
        let diag2 = gameBoard.positions[6] + gameBoard.positions[4] + gameBoard.positions[2];

        let winnerArray = [row1, row2, row3, col1, col2, col3, diag1, diag2];

        for (let i = 0; i < winnerArray.length; i++) {
            if (winnerArray[i] === 'xxx' || winnerArray[i] === 'ooo') {
                gameFlow.gameOver();
                if (player1.active === true) {
                    player1.gameWinner();
                    player1.active = false;
                } else {
                    player2.gameWinner();
                    player2.active = false;
                }
            } 
        }
    }
    return {
        nextTurn, checkForWinner, turnAction, gameOver
    };
 })();

const newPlayer = (name, symbol, active) => {
    let gameWinner = () => {
        console.log('gamewinner activated');
        document.getElementById('winnerBox').innerHTML = `${name} is the winner of the game.`;
    }
    let turnReporter = () => {
        document.getElementById('winnerBox').innerHTML = `It is ${name}'s turn.`     
    }
    return { name, symbol, active, gameWinner, turnReporter};
};

document.getElementById('startResetButton').addEventListener('click', startResetGame);


