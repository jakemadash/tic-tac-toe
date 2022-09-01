'use strict';

const Player = (name) => {
    let moves = [];
    let won = false;
    return {moves, won, name};
};

const playerOne = Player(prompt('Player 1 Name:'));
const playerTwo = Player(prompt('Player 2 Name:'));

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

    let count = 0;
    const squares = document.querySelectorAll("div[data-number]");
    const play = squares.forEach(square => {
        square.addEventListener('click', () => {
            if (square.textContent == '' && count % 2 == 0) {
                count++;
                square.textContent = 'x';
                let index = square.dataset.number - 1;
                board.splice(index, 1, square.textContent);
                playerOne.moves.push(index);
                if (playerOne.moves.length >= 3) {
                    displayController.winner();
                }
            }
            else if (square.textContent == '' && count % 2 != 0) {
                square.textContent = 'o';
                count++;
                let index = square.dataset.number - 1;
                board.splice(index, 1, square.textContent);
                playerTwo.moves.push(index);
                if (playerTwo.moves.length >= 3) {
                    displayController.winner();
                }
            }
        });
    });
    return {board, winningPositions, play};
})();

const displayController = (() => {
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
        if (playerOne.won == true) {
            let button = document.querySelector('button');
            button.removeAttribute('hidden');
        }
        else if (playerTwo.won == true) {
            button.removeAttribute('hidden');
        }
        else if (playerOne.moves.length + playerTwo.moves.length == 9) {
            let button = document.querySelector('button');
            button.removeAttribute('hidden');
        }
    };
    return {winner};
})();
