const gameBoard = (() => {
    const gameBoard = Array(9);
    return gameBoard;
})();

const displayController = (() => {
    const squares = document.querySelectorAll("div[data-number]");
    const gameMove = squares.forEach(square => {
        square.addEventListener('click', () => {
            if (square.textContent == '') {
                square.textContent = 'x';
                let index = square.dataset.number - 1;
                gameBoard.splice(index, 1, square.textContent);
            }
        });
    });
    return {gameMove};
})();

const Player = (name) => {

};