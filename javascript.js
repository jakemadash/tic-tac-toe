'use strict';

const Player = (name, mark) => {
    let moves = [];
    let won = false;
    const squares = document.querySelectorAll("div[data-number]");
    const play = squares.forEach(square => {
        square.addEventListener('click', () => {
            if (square.textContent == '') {
                square.textContent = mark;
                let index = square.dataset.number - 1;
                gameBoard.board.splice(index, 1, square.textContent);
                moves.push(index);
                if (moves.length >= 3) {
                    console.log('wow');
                    displayController.winner();
                }
            }
        });
    });
    return {play, moves, won};
};

const gameBoard = (() => {
    const board = Array(9);
    const winningPositions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    return {board, winningPositions};
})();

const displayController = (() => {
    const playerOne = Player(prompt('Player 1 Name:'), 'x');
    const playerTwo = Player(prompt('Player 2 Name:'), 'o');

    const winner = () => {
        const winning = gameBoard.winningPositions;
        let playerOneCount = 0;
        let playerTwoCount = 0;
        for (let i = 0; i < winning.length; i++) {
            for (let j = 0; j < winning[i].length; j++) {
                if (playerOne.moves.includes(winning[i][j])) {
                    playerOneCount++;
                }
                else if (playerTwo.moves.includes(winning[i][j])) {
                    playerTwoCount++;
                }
            }
            if (playerOneCount == 3) {
                playerOne.won = true;
            }
            else if (playerTwoCount == 3) {
                playerTwo.won = true;
            }
            else {
                playerOneCount = 0;
                playerTwoCount = 0;
            }
        }
        if (playerOne.won == true || playerTwo.won == true) {
            return true;
        }
        else return false;
        };

    while (winner() == undefined) {
        playerOne.play;
        playerTwo.play;
    }
    return {playerOne, playerTwo, winner};
})();
