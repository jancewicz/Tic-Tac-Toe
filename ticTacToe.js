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

function field() {
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

const playBoard = board.getBoard(); // has to be here for instantiate the board

const [playerOne, playerTwo] = game.players; // destructuring techique


console.log(`Default active player at the beginning of the game (turn 1) is: ${game.activePlayer().name}`);




console.log(board.printBoard());

console.log(`SWAP HAPPENS`)
game.swapActivePlayer();


// What should happen when the turn is on: 
// Choose field to place mark, 
// check if field's value is 0 (free spot)
// use field.placePlayerMark 
// end turn
console.log(`TURN 1, after swap active player is: ${game.activePlayer().name}`);

//let input = prompt(`${game.activePlayerTurn().name} which field would you like to take?`)

console.log(`The value of chosen field ([0][1]) is:  ${playBoard[0][1].getValue()}`);


playBoard[0][1].placePlayerMark(game.activePlayer());


console.log(`The value of chosen field ([0][1]) is:  ${playBoard[0][1].getValue()}`);


