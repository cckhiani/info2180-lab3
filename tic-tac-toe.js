document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelectorAll('#board > div');
    const status = document.getElementById('status');
    const newGameButton = document.querySelector('.btn');
    let currentPlayer = 'X';
    let gameActive = true;

    // Add classes and event listeners to board squares
    board.forEach((square, index) => {
        square.classList.add('square');
        square.addEventListener('click', () => handleSquareClick(square, index));
        square.addEventListener('mouseover', () => square.classList.add('hover'));
        square.addEventListener('mouseout', () => square.classList.remove('hover'));
    });

    newGameButton.addEventListener('click', resetGame);

    function handleSquareClick(square, index) {
        if (!gameActive || square.textContent !== '') return;

        square.textContent = currentPlayer;
        square.classList.add(currentPlayer);

        if (checkWin()) {
            status.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
            status.classList.add('you-won');
            gameActive = false;
        } else if (Array.from(board).every(square => square.textContent !== '')) {
            status.textContent = "It's a Draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return (
                board[a].textContent === currentPlayer &&
                board[a].textContent === board[b].textContent &&
                board[a].textContent === board[c].textContent
            );
        });
    }

    function resetGame() {
        board.forEach(square => {
            square.textContent = '';
            square.classList.remove('X', 'O');
        });
        currentPlayer = 'X';
        gameActive = true;
        status.textContent = 'Move your mouse over a square and click to play an X or an O.';
        status.classList.remove('you-won');
    }
});
