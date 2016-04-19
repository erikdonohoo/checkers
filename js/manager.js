window.GameManager = (function () {

	var currentTurn = Piece.BLACK; // black goes first
	var player1, player2, board, curPlayer;

	var setupGame = function () {
		board = new Board();
		curPlayer = player1 = new Player({color: Piece.BLACK});
		player2 = new Player({color: Piece.RED});
		Move.setBoard(board);
	};

	var renderGame = function () {
		var container = document.querySelector('.board-container');
		container.innerHTML = '';
		container.appendChild(board.render());
	};

	var findCell = function (elem) {
		if (elem.classList.contains('cell')) {
			var x = +elem.getAttribute('coord-x');
			var y = +elem.getAttribute('coord-y');
			return board.cellAt(x, y);
		}

		if (elem.parentNode) {
			return findCell(elem.parentNode);
		}

		return null;
	};

	EventManager.on('cellClick', function (evt, cell) {
		curPlayer.selectCell(cell);
		renderGame();
	});

	EventManager.on('moveComplete', function (evt) {
		curPlayer = curPlayer === player1 ? player2 : player1;
	});

	document.querySelector('.board-container').addEventListener('click', function (evt) {
		var cell = findCell(evt.target);
		if (cell) {
			curPlayer.selectCell(cell);
			renderGame();
		}
	});

	return {
		setupGame: setupGame,
		renderGame: renderGame
	};
})();
