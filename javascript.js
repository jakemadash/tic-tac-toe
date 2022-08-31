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
                    gameBoard.winner();
                }
            }
        });
    });
    return {play, moves, won};
};

const playerOne = Player(prompt('Player 1 Name:'), 'x');
const playerTwo = Player(prompt('Player 2 Name:'), 'o');

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
    const winner = () => {
        let playerOneCount = 0;
        let playerTwoCount = 0;
        for (let i = 0; i < winningPositions.length; i++) {
            for (let j = 0; j < winningPositions[i].length; j++) {
                if (playerOne.moves.includes(winningPositions[i][j])) {
                    playerOneCount++;
                }
                else if (playerTwo.moves.includes(winningPositions[i][j])) {
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
        };
    return {board, winner};
})();

const displayController = (() => {
    playerOne.play;
    return {playerOne, playerTwo};
})();