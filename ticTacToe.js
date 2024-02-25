function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = []
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(field());
        }
    };

    const getBoard = () => board;

    const printBoard = () => {
        const boardWithFieldValues = board.map((row) => row.map((field) => field.getValue()));
        console.log(boardWithFieldValues);
    };

    const checkFreeField = (position) => {
        const [row, column] = position;
        if (board[row][column].getValue() === 0) {
            return true;
        } else {
            return false;
        }
    };


    return { getBoard, printBoard, checkFreeField };
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


function ruleSet() {
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


function playGame() {
    const board = gameBoard();
    const gameRules = ruleSet();
    const gameChart = board.getBoard();
    const [playerOne, playerTwo] = gameRules.players;
    let endOfTurn = false;
    let endGame = false;
    let turn = 1;

    let input = () => {
        let placeToPutMark = prompt(`${gameRules.activePlayer().name} where do You want to place your mark?`);
        let position = JSON.parse(placeToPutMark);
        return position = position.map(Number);
    };


    console.log("Welcome to tic tac toe game!");
    console.log(`TURN ${turn}! Active player: ${gameRules.activePlayer().name}, mark: ${gameRules.activePlayer().mark} `);
    board.printBoard();
    let position = input();

    if (board.checkFreeField(position)) {
        const [row, column] = position;
        gameChart[row][column].placePlayerMark(gameRules.activePlayer());;
    }

    board.printBoard();
    gameRules.swapActivePlayer();
    console.log(`TURN ${turn}! Active player: ${gameRules.activePlayer().name}, mark: ${gameRules.activePlayer().mark} `);
    board.printBoard();
    position = input();
    if (board.checkFreeField(position)) {
        const [row, column] = position;
        gameChart[row][column].placePlayerMark(gameRules.activePlayer());;
    };

}


const gameOn = playGame();






