function gameBoard() {
    const parent = document.getElementById("board");
    const boardButtons = [];
    let clickedFieldId = null;

    const makeBoardInDOM = () => {
        for (let i = 0; i < 9; i++) {
            let button = document.createElement("button");
            button.id = `${i + 1}`;
            button.classList.add("square");
            button.setAttribute("type", "button");
            parent.appendChild(button);

            let boardField = field();
            button.field = boardField;

            boardButtons.push({
                button: button,
                field: boardField
            });
            button.addEventListener("click", handleButtonClick);
        };
    }

    const handleButtonClick = (e) => {
        let currentFieldId = Number(e.target.id);
        console.log(`The id of clicked field: ${currentFieldId} with type of: ${typeof (currentFieldId)}`)
        clickedFieldId = currentFieldId;
        console.log(boardButtons[clickedFieldId - 1]?.button.field.getValue())
    }

    const saveButtonAfterClick = (callback) => {
        const buttons = document.querySelectorAll(".square");
        buttons.forEach(button => {
            button.addEventListener("click", callback);
        });
    }

    const getClickedFieldId = () => {
        return clickedFieldId
    };

    const assignPositionToClickedSquare = () => {
        const clickedFieldId = getClickedFieldId();
        const position = boardButtons[clickedFieldId - 1].button.field.id;
        return position
    }

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
    };

    const resetGameBoard = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                board[i][j].resetValue();
            }
        }
    };

    return { getClickedFieldId, makeBoardInDOM, saveButtonAfterClick, isWin, isDraw, resetGameBoard, boardButtons, assignPositionToClickedSquare };
}


function field() {
    let value = 0;

    let fieldId = field.id || 1;
    field.id = fieldId + 1;

    const placePlayerMark = (activePlayer) => {
        return value = activePlayer.mark
    };

    const resetValue = () => {
        return value = 0;
    }

    const getValue = () => {
        return value;
    }

    return { id: fieldId, placePlayerMark, resetValue, getValue };
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
            fieldsMarked: fieldsMarkedP1,
            markToAppendToHTML: "X"
        },
        {
            name: playerTwo,
            mark: O,
            fieldsMarked: fieldsMarkedP2,
            markToAppendToHTML: "O"
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


const playGame = () => {
    const displayPlayerTurn = document.getElementById("show-player-turn");
    const board = gameBoard();
    const gameRules = ruleSet();
    let endGame = false;
    let turn = 1;
    board.makeBoardInDOM();
    const gameChart = board.boardButtons;
    displayPlayerTurn.innerText = `TURN ${turn}! Active player: ${gameRules.activePlayer().name}, mark: ${gameRules.activePlayer().mark} `;

    const handleButtonClickCallback = () => {
        console.log(`inner`);
        let position = board.assignPositionToClickedSquare();
        console.log(position)
        console.log(typeof (position))
        if (gameChart[position - 1].field.getValue() === 0) {
            console.log("FREEE")
            gameChart[position - 1].field.placePlayerMark(gameRules.activePlayer());
            console.log(gameChart[position - 1].field.getValue());
            gameRules.activePlayer().fieldsMarked.push(gameChart[position - 1].field.id);
            console.log(gameRules.activePlayer().fieldsMarked);
            document.getElementById(position).innerText = gameRules.activePlayer().markToAppendToHTML;
        }
    };

    board.saveButtonAfterClick(handleButtonClickCallback);
};
const gameOn = playGame();




// if (endGame) {
//     if (board.checkFreeField(position)) {
//         gameChart[position - 1].placePlayerMark(gameRules.activePlayer());
//         gameRules.activePlayer().fieldsMarked.push(gameChart[position - 1].id);
//         console.log(`THE ID OF TAKEN FIELD IS STORED IN ${gameRules.activePlayer().name} ARRAY AND IT'S: ${gameRules.activePlayer().fieldsMarked}`);

//         if (board.isWin(gameRules.activePlayer().fieldsMarked.sort())) {
//             console.log(`${gameRules.activePlayer().name} WINS`);
//             endGame = true;
//         } else if (board.isDraw(gameChart)) {
//             console.log("IT'S A DRAW");
//             endGame = true;
//         } else {
//             gameRules.swapActivePlayer();
//             turn++;
//             displayPlayerTurn.innerText = `TURN ${turn}! Active player: ${gameRules.activePlayer().name}, mark: ${gameRules.activePlayer().mark} `;
//             board.printBoard();
//         }
//     }
// }
// };


// console.log(`TURN ${turn}! Active player: ${gameRules.activePlayer().name}, mark: ${gameRules.activePlayer().mark} `);
// board.printBoard();

// if (board.checkFreeField(position)) {
//     const [row, column] = position;
//     gameChart[row][column].placePlayerMark(gameRules.activePlayer());
//     gameRules.activePlayer().fieldsMarked.push(gameChart[row][column].id);
//     console.log(`THE ID OF TAKEN FIELD IS STORED IN ${gameRules.activePlayer().name} ARRAY AND IT'S: ${gameRules.activePlayer().fieldsMarked}`);
// };
// if (board.isWin(gameRules.activePlayer().fieldsMarked.sort())) {
//     (console.log(`${gameRules.activePlayer().name} WINS`));
//     endGame = false;
//     break
// } else if (board.isDraw(gameChart)) {
//     console.log("IT'S A DRAW");
//     endGame = false;
//     break;
// };

