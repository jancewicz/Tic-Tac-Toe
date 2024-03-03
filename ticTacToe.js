function DOMManipulation() {
    const boardElement = document.getElementById("board");
    let createButton = document.createElement("button");
    const squares = document.querySelectorAll(".square");
    const displayTurnScreen = document.getElementById("show-player-turn");
    const gameResult = document.getElementById("game-result");

    const displayModal = () => {
        document.getElementById("overlay").style.display = "flex";
    }

    const displayTheWinner = (winner) => {
        displayModal();
        gameResult.innerText = `CONGRATULATIONS ${winner} WON THE GAME`;
    };

    const displayTheDraw = () => {
        displayModal();
        gameResult.innerText = "IT'S A DRAW!"
    }

    return { boardElement, createButton, squares, displayTurnScreen, displayTheWinner, displayTheDraw }
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

    return { getClickedFieldId, makeBoard, saveButtonAfterClick, isWin, isDraw, boardButtons, assignPositionToClickedSquare };
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

    const players = [
        {
            name: playerOne,
            mark: X,
            fieldsMarked: [],
            markToAppendToHTML: "X"
        },
        {
            name: playerTwo,
            mark: O,
            fieldsMarked: [],
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

    const resetPlayerArray = () => {
        players.forEach((player) => {
            player.fieldsMarked = [];
        })
    };

    return { players, activePlayer, swapActivePlayer, resetPlayerArray };
}

const playGame = () => {
    const displayPlayerTurn = DOMManipulation().displayTurnScreen;
    const board = gameBoard();
    const gameRules = ruleSet();
    board.makeBoard();
    const gameChart = board.boardButtons;
    const resetModalButton = document.getElementById("reset-modal");

    resetModalButton.addEventListener("click", () => {
        gameChart.forEach((element) => {
            element.button.field.resetValue();
            document.getElementById(element.button.field.id).innerText = ""
            document.getElementById(element.button.field.id).disabled = false;
            gameRules.resetPlayerArray();
        })
        document.getElementById("overlay").style.display = "none";
    });

    const displayCurrentTurn = () => {
        displayPlayerTurn.innerText = `Active player: ${gameRules.activePlayer().markToAppendToHTML} `;
    };

    const playTurn = (position) => {
        displayCurrentTurn();
        gameChart[position - 1].field.placePlayerMark(gameRules.activePlayer());
        gameRules.activePlayer().fieldsMarked.push(gameChart[position - 1].field.id);
        gameRules.activePlayer().fieldsMarked.sort();
        document.getElementById(position).innerText = gameRules.activePlayer().markToAppendToHTML;
        document.getElementById(position).disabled = true;
    }

    displayCurrentTurn();

    const handleButtonClickCallback = () => {
        let position = board.assignPositionToClickedSquare();
        if (gameChart[position - 1].field.getValue() === 0) {
            playTurn(position);
            if (board.isWin(gameRules.activePlayer().fieldsMarked)) {
                DOMManipulation().displayTheWinner(gameRules.activePlayer().name);
            } else if (board.isDraw(gameChart)) {
                DOMManipulation().displayTheDraw();
            } else {
                gameRules.swapActivePlayer();
                displayCurrentTurn();
            }
        }
    };

    board.saveButtonAfterClick(handleButtonClickCallback);
};

playGame();