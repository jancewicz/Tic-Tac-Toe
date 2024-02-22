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
    return board
}

function field(player) {
    let value = 0;

    const placePlayerMark = (player) => {
        value = player.mark
    };

    function getValue() {
        return value;
    }

    function checkFieldsCurrentValue() {
        // the way to read each of fields value (could be 0 -free, 1 - X's player mark, 2 - O's player mark)
        board.forEach((row) => {
            row.map((element) => console.log(field.getValue()));
        });
    }

    return { placePlayerMark, getValue, checkFieldsCurrentValue };
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

    const activePlayerTurn = () => {
        return players[activePlayerIndex];
    };

    function swapActivePlayer() {
        activePlayerIndex = 1 - activePlayerIndex;
    };

    return { players, activePlayerTurn, swapActivePlayer };
}






// playground 
const board = gameBoard();

const game = playGame();


const [playerOne, playerTwo] = game.players; // destructuring techique 

const gameField = field(playerOne);


console.log(board)


board.forEach((row) => {
    row.map((element) => console.log(gameField.getValue()));
});


// What should happen when the turn is on: 
// Choose field to place mark, 
// check if field's value is 0 (free spot)
// use field.placePlayerMark 
// end turn
console.log(`TURN 1, active player is: ${game.activePlayerTurn().name}`);
let input = prompt(`${game.activePlayerTurn().name} which field would you like to take?`)





























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

