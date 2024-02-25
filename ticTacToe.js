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

    const isWin = () => {
        const winCombinations = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7]
        ];
        // find a way to save to an array player marked fields, then compare every tour to winning combinations 
    }


    return { getBoard, printBoard, checkFreeField };
}

function field() {
    let value = 0;


    let fieldId = field.id || 1;
    field.id = fieldId + 1;

    const placePlayerMark = (activePlayer) => {
        return value = activePlayer.mark
    };

    const getValue = () => {
        return value;
    }

    return { id: fieldId, placePlayerMark, getValue };
}


function ruleSet() {
    const playerOne = "Player One";
    const playerTwo = "Player Two";

    const X = 1;
    const O = 2;

    let fieldsMarkedP1 = [];
    let fieldsMarkedP2 = [];

    const players = [
        {
            name: playerOne,
            mark: X,
            fieldsMarked: fieldsMarkedP1
        },
        {
            name: playerTwo,
            mark: O,
            fieldsMarked: fieldsMarkedP2
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
    // GAME STARTS
    console.log(`TURN ${turn}! Active player: ${gameRules.activePlayer().name}, mark: ${gameRules.activePlayer().mark} `);
    board.printBoard();

    let position = input();

    if (board.checkFreeField(position)) {
        const [row, column] = position;
        gameChart[row][column].placePlayerMark(gameRules.activePlayer());
        gameRules.activePlayer().fieldsMarked.push(gameChart[row][column].id);
        console.log(`THE ID OF TAKEN FIELD IS STORED IN ${gameRules.activePlayer().name} ARRAY AND IT'S: ${gameRules.activePlayer().fieldsMarked}`);
    }

    board.printBoard();
    // SWAP PLAYER 
    gameRules.swapActivePlayer();

    console.log(`TURN ${turn}! Active player: ${gameRules.activePlayer().name}, mark: ${gameRules.activePlayer().mark} `);
    board.printBoard();
    position = input();
    if (board.checkFreeField(position)) {
        const [row, column] = position;
        gameChart[row][column].placePlayerMark(gameRules.activePlayer());
        gameRules.activePlayer().fieldsMarked.push(gameChart[row][column].id);
        console.log(`THE ID OF TAKEN FIELD IS STORED IN ${gameRules.activePlayer().name} ARRAY AND IT'S: ${gameRules.activePlayer().fieldsMarked}`);
    };
    board.printBoard();

}


const gameOn = playGame();






