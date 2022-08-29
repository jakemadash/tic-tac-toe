const gameBoard = (() => {
    const gameBoard = Array(9);
    return {gameBoard};
})();

const displayController = (() => {
    const squares = document.querySelectorAll("div[data-number]");
    const gameMove = squares.forEach(square => {
        square.addEventListener('click', () => {
            square.textContent = 'x';
            gameBoard.splice(square.dataset.number, 0, square.textContent);
        });
    });
    return {gameMove};
})();

const Player = (name) => {

};