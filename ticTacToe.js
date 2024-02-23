function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = []
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(field());
        }
    }
    const getBoard = () => board;


    const printBoard = () => {
        const boardWithFieldValues = board.map((row) => row.map((field) => field.getValue()));
        console.log(boardWithFieldValues);
    }


    return { getBoard, printBoard };
}

function field(player) {
    let value = 0;

    const placePlayerMark = (activePlayer) => {
        return value = activePlayer.mark
    };

    const getValue = () => {
        return value;
    }

    return { placePlayerMark, getValue };
}

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
    ];

    let activePlayerIndex = 0;

    const activePlayer = () => {
        return players[activePlayerIndex];
    };

    const swapActivePlayer = () => {
        activePlayerIndex = 1 - activePlayerIndex;
    };

    return { players, activePlayer, swapActivePlayer };
}





// playground 
const board = gameBoard();

const game = playGame();


const [playerOne, playerTwo] = game.players; // destructuring techique

let currentPlayer = game.activePlayer().name;

console.log(`Current active player is: ${currentPlayer}`);


console.log(board.printBoard())





// What should happen when the turn is on: 
// Choose field to place mark, 
// check if field's value is 0 (free spot)
// use field.placePlayerMark 
// end turn
console.log(`TURN 1, active player is: ${game.activePlayer().name}`);
//let input = prompt(`${game.activePlayerTurn().name} which field would you like to take?`)

console.log(`The value of chosen field ([0][1]) is:  ${board[0][1].getValue()}`);





























// console.log(`TURN 1, active player is: ${game.playerTurn().name}`);

// console.log(`SWITCH`)
// game.swapActivePlayer();

// console.log(`TURN 2 active player after switch is: ${game.playerTurn().name}`)
// console.log(game.players)


// console.log(`switch number two!`);
// game.swapActivePlayer();

// console.log(`TURN 3 active player is: ${game.playerTurn().name}`);
// console.log(game.players);





// Object to control the game itself: start the game with all fields clear, turns, win / lose / tie,

// DOM should be responsible for reading and displaying the application state to the user and providing an easy-to-use
// gateway to interact with the methods it needs to.

