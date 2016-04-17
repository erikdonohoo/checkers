window.GameManager = (function () {

	var currentTurn = Piece.BLACK; // black goes first
	var player1, player2, board;
	function GameManager() {}

	GameManager.prototype.setupGame = function () {
		board = new Board();
		player1 = new Player({color: Piece.BLACK});
		player2 = new Player({color: Piece.RED});
	};

	GameManager.prototype.renderGame = function () {
		var container = document.querySelector('.board-container');
		container.innerHTML = '';
		container.appendChild(board.render());
	};

	return new GameManager();
})();
