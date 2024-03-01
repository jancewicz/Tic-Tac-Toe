function DOMManipulation() {
    const boardElement = document.getElementById("board");
    let createButton = document.createElement("button");
    const squares = document.querySelectorAll(".square");
    const displayTurnScreen = document.getElementById("show-player-turn");
    const closeModalButton = document.getElementById("close-modal");
    const resetModalButton = document.getElementById("reset-modal");

    closeModalButton.addEventListener("click", function () {
        document.getElementById("overlay").style.display = "none";
    })

    resetModalButton.addEventListener("click", () => {
        document.getElementById("overlay").style.display = "none";
        gameBoard().resetGameBoard(gameBoard().boardButtons);
    })

    const displayTheWinner = () => {
        document.getElementById("overlay").style.display = "flex";
    }

    return { boardElement, createButton, squares, displayTurnScreen, displayTheWinner }
}

function gameBoard() {

    const parentDiv = DOMManipulation().boardElement;
    const boardButtons = [];
    let clickedFieldId = null;

    const makeBoard = () => {
        for (let i = 0; i < 9; i++) {
            let button = DOMManipulation().createButton;
            button.id = `${i + 1}`;
            button.classList.add("square");
            button.setAttribute("type", "button");
            parentDiv.appendChild(button);

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
        clickedFieldId = currentFieldId;
    }

    const saveButtonAfterClick = (callback) => {
        const buttons = DOMManipulation().squares;
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
            if (winCombinations[i].every(function (element) {
                return playerMarkedFields.indexOf(element) >= 0;
            })) {
                return true;
            }
        }
        return false;
    }

    const isDraw = (board) => {
        for (let i = 0; i < board.length; i++) {
            if (board[i].field.getValue() === 0) {
                return false;
            }
        }
        return true;
    };

    const resetGameBoard = () => {
        for (let i = 0; i < boardButtons.length; i++) {
            boardButtons[i].field.resetValue();
            document.getElementById(i + 1).disabled = false;
            document.getElementById(i + 1).innerText = "";
        }
    };

    return { getClickedFieldId, makeBoard, saveButtonAfterClick, isWin, isDraw, resetGameBoard, boardButtons, assignPositionToClickedSquare };
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
    const displayPlayerTurn = DOMManipulation().displayTurnScreen;
    const board = gameBoard();
    const gameRules = ruleSet();
    let endGame = false;
    let endTurn = false;
    let turn = 1;
    board.makeBoard();
    const gameChart = board.boardButtons;

    const displayCurrentTurn = () => {
        displayPlayerTurn.innerText = `TURN ${turn}! Active player: ${gameRules.activePlayer().name}, mark: ${gameRules.activePlayer().mark} `;
    };

    const playTurn = (position) => {
        displayCurrentTurn();
        gameChart[position - 1].field.placePlayerMark(gameRules.activePlayer());
        gameRules.activePlayer().fieldsMarked.push(gameChart[position - 1].field.id);
        gameRules.activePlayer().fieldsMarked.sort();
        console.log(`${gameRules.activePlayer().name} has: ${gameRules.activePlayer().fieldsMarked}`); // delete
        document.getElementById(position).innerText = gameRules.activePlayer().markToAppendToHTML;
        document.getElementById(position).disabled = true;
    }

    displayCurrentTurn();
    const handleButtonClickCallback = () => {
        let position = board.assignPositionToClickedSquare();
        if (gameChart[position - 1].field.getValue() === 0) {
            playTurn(position);
            if (board.isWin(gameRules.activePlayer().fieldsMarked)) {
                console.log("WIN")
                console.log(gameRules.activePlayer().name)
                DOMManipulation().displayTheWinner();
            } else if (board.isDraw(gameChart)) {
                console.log("IT'S DRAW");
            } else {
                gameRules.swapActivePlayer();
                displayCurrentTurn();
                console.log("NO")
            }
        }
    };
    board.saveButtonAfterClick(handleButtonClickCallback);

};

const gameOn = playGame();