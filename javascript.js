'use strict';

const Player = (name) => {
    let moves = [];
    let won = false;
    return {moves, won, name};
};

const playerOne = Player(document.getElementById('player1').value);
const playerTwo = Player(document.getElementById('player2').value);

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
            if (square.textContent == '' && count % 2 == 0 && playerOne.name != '') {
                count++;
                square.textContent = 'x';
                let index = square.dataset.number - 1;
                board.splice(index, 1, square.textContent);
                playerOne.moves.push(index);
                if (playerOne.moves.length >= 3) {
                    displayController.winner();
                }
            }
            else if (square.textContent == '' && count % 2 != 0 && playerTwo.name != '') {
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
    return {board, winningPositions, play, squares};
})();

const displayController = (() => {
    const winner = () => {
        const winning = gameBoard.winningPositions;
        const message = document.getElementById('message');
        let playerOneCount = 0;
        let playerTwoCount = 0;
        const start = document.querySelector('button');
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
            start.removeAttribute('hidden');
            message.textContent = `${playerOne.name} wins!`
        }
        else if (playerTwo.won == true) {
            start.removeAttribute('hidden');
            message.textContent = `${playerTwo.name} wins!`
        }
        else if (playerOne.moves.length + playerTwo.moves.length == 9) {
            start.removeAttribute('hidden');
            message.textContent = `It's a tie!`
        }
    };
    const playerOneName = document.getElementById('player1');
    const playerTwoName = document.getElementById('player2');
    const start = document.querySelector('button');
    const nextPlayer = playerOneName.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
            playerTwoName.focus();
        }
        else if (playerTwoName.value != '' && playerOneName.value != '') {
            start.removeAttribute('hidden');
        }
        else if (playerTwoName.value == '' || playerOneName.value == '')
            start.setAttribute('hidden', '');
    });
    const initialize = playerTwoName.addEventListener('keydown', () => {
        if (playerTwoName.value != '' && playerOneName.value != '') {
            start.removeAttribute('hidden');
        }
        else if (playerTwoName.value == '' || playerOneName.value == '')
            start.setAttribute('hidden', '');
    })
    const startGame = start.addEventListener('click', () => {
        if (message.textContent != '') {
            message.textContent = '';
            gameBoard.board = Array(9);
            gameBoard.squares.forEach(square => {
                square.textContent = '';
            });
        }
        start.setAttribute('hidden', '');
        playerOne.name = playerOneName.value;
        playerTwo.name = playerTwoName.value;
        const board = document.querySelectorAll('div[data-number]');
        board.forEach(item => {
            item.setAttribute('style', 'border-style:solid');
        });
    })
    return {winner};
})();
