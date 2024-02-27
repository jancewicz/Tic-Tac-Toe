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
        };
    };

    const isWin = (playerMarkedFields) => {
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

        for (let i = 0; i < winCombinations.length; i++) {
            if (winCombinations[i][0] === playerMarkedFields[0] &&
                winCombinations[i][1] === playerMarkedFields[1] &&
                winCombinations[i][2] === playerMarkedFields[2]) {
                return true;
            }
        };
    };

    /// iter over 2d array and check if there is field with value 0, if not isDraw return true;
    const isDraw = (board) => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j].getValue() === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    return { getBoard, printBoard, checkFreeField, isWin, isDraw };
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
    let endGame = true;
    let turn = 1;

    let input = () => {
        let placeToPutMark = prompt(`${gameRules.activePlayer().name} where do You want to place your mark?`);
        let position = JSON.parse(placeToPutMark);
        return position = position.map(Number);
    };


    console.log("Welcome to tic tac toe game!");
    while (endGame) {
        let endOfTurn = true;

        while (endOfTurn) {
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
            if (board.isWin(gameRules.activePlayer().fieldsMarked.sort())) {
                (console.log(`${gameRules.activePlayer().name} WINS`));
                endGame = false;
                break;
            } else if (board.isDraw(gameChart)) {
                console.log("IT'S A DRAW");
                board.printBoard();
                endGame = false;
                break;
            }

            board.printBoard();

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
            if (board.isWin(gameRules.activePlayer().fieldsMarked.sort())) {
                (console.log(`${gameRules.activePlayer().name} WINS`));
                endGame = false;
                break
            } else if (board.isDraw(gameChart)) {
                console.log("IT'S A DRAW");
                board.printBoard();
                endGame = false;
                break;
            };

            board.printBoard();
            console.log(`Turn ${turn} ends!`)
            turn++;
            endOfTurn = false;
            gameRules.swapActivePlayer();
            break;
        }
        if (endGame === false) {
            board.printBoard();
            break
        };
    };
}


const gameOn = playGame();






