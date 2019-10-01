let eventHandler = () => {
    gameFlow.turnAction();
}

let removeEventListeners = () => {
    for (i = 0; i < gameBoard.positions.length; i++) {
        let pos = document.getElementById('pos' + i);
        pos.outerHTML = pos.outerHTML;    
}}

let createEventHandlers = () => {
    console.log('create event handler ran');
    for (i = 0; i < gameBoard.positions.length; i++) {
        let position = 'pos' + i;
        let num = i;
        let pos = document.getElementById(position);

        pos.addEventListener('click', function _func() {
            gameFlow.turnAction(position, num);
        })
    }
}

const gameBoard = (() => {
    const positions = ['m', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm'];
    return {
        positions
    };
})();

 const gameFlow = (() => {

     const gameOver = () => {
         removeEventListeners();
         console.log('the game is over!');
     }

    const nextTurn = () => {
        if (player1.active === true) {
            player1.active = false;
            player2.active = true;
        } else if (player2.active === true) {
            player1.active = true;
            player2.active = false;
        }
    }

    const turnAction = (position, index) => {
        if (document.getElementById(position).innerHTML === 'x' || document.getElementById(position).innerHTML === 'o') {
            console.log('nope')
        } else {
            if (player1.active === true) {
                document.getElementById(position).innerHTML = player1.symbol;
                gameBoard.positions[index] = player1.symbol;
            } else if (player2.active === true) {
                document.getElementById(position).innerHTML = player2.symbol;
                gameBoard.positions[index] = player2.symbol;
            }
            gameFlow.checkForWinner();
            gameFlow.nextTurn();
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
                console.log('we have a winner!')
                gameFlow.gameOver();

                if (player1.active === true) {
                    document.getElementById('winnerBox').innerHTML = 'Player 1 is the Winner!';
                } else {
                    document.getElementById('winnerBox').innerHTML = 'Player 2 is the Winner!';
                }
            } 
        }
    }

    return {
        nextTurn, checkForWinner, turnAction, gameOver
    };
 })();

const newPlayer = (name, symbol, active) => {
    const sayHello = () => console.log('hello ' + name + '. ' + 'Your symbol is ' + symbol);
    return { name, symbol, sayHello, active };
};

const player1 = newPlayer('rob', 'x', true );
const player2 = newPlayer('joe', 'o', false );

createEventHandlers();
