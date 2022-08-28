const gameBoard = (() => {
    const gameBoard = Array(18).fill('x', 0, 9).fill('o', 9, 18);
    return {gameBoard};
})();