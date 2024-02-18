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
}


function field() {
    let value = 0;

    const placePlayerMark = (player) => value = player;

}

// Players stored in objects -> Factory function for player with own name and functions like mark with X or O the field

function createPlayer(name) {

    const pickMark = () => {
        const X = "X";
        const O = "O";
    }

    return { name, pickMark };
}

// Object to control the game itself: start the game with all fields clear, turns, win / lose / tie,

// DOM should be responsible for reading and displaying the application state to the user and providing an easy-to-use
// gateway to interact with the methods it needs to.

