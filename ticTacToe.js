// gameboard as an array of GameBoard obcject

// template for array of gameboard -> nested for loop
// gameBoard = [
//  [0, 0], [0, 1], [0, 2]
//  [1, 0], [1, 1], [1, 2]
//  [2, 0], [2, 1], [2, 2]
//      ]

function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = []

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(field);
        }
    }
    console.log(board);
}


function field() {
    let value = 0;

    const placePlayerMark = (player) => {
        value = player
    };

    function getValue() {
        return value;
    }

    return { placePlayerMark, getValue };
}

// Players stored in objects -> Factory function for player with own name and functions like mark with X or O the field

function playGame() {
    const playerOne = "Player One";
    const playerTwo = "Player Two";

    const X = 1;
    const O = 2;

    const players = [
        {
            name: playerOne,
            mark: X
        },
        {
            name: playerTwo,
            mark: O
        }
    ]

    let activePlayerIndex = 0;

    function swapActivePlayer() {
        //[players[0], players[1]] = [players[1], players[0]]; doesn't work with code below
        activePlayerIndex = 1 - activePlayerIndex;
    }

    return { players, playerTurn: () => players[activePlayerIndex], swapActivePlayer };
}



gameBoard();

const game = playGame();
console.log(game.players)
console.log(`TURN 1, active player is: ${game.playerTurn().name}`);

console.log(`SWITCH`)
game.swapActivePlayer();

console.log(`TURN 2 active player after switch is: ${game.playerTurn().name}`)
console.log(game.players)


console.log(`switch number two!`);
game.swapActivePlayer();

console.log(`TURN 3 active player is: ${game.playerTurn().name}`);
console.log(game.players);


// Object to control the game itself: start the game with all fields clear, turns, win / lose / tie,

// DOM should be responsible for reading and displaying the application state to the user and providing an easy-to-use
// gateway to interact with the methods it needs to.

