const gameBoard = (() => {
    const gameBoard = Array(9);
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
    const winner = gameBoard.map
    return gameBoard;
})();

const Player = (name, mark) => {
    const moves = [];
    const squares = document.querySelectorAll("div[data-number]");
    const play = squares.forEach(square => {
        square.addEventListener('click', () => {
            if (square.textContent == '') {
                square.textContent = mark;
                let index = square.dataset.number - 1;
                gameBoard.splice(index, 1, square.textContent);
                moves.push(index);
            }
        });
    });
    return {play, moves};
};

const displayController = (() => {
    const playerOne = Player(prompt('Player 1 Name:'), 'x');
    const playerTwo = Player(prompt('Player 2 Name:'), 'o');
    playerOne.play;
    return {playerOne, playerTwo};
})();