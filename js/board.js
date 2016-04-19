window.Board = (function () {

	function Board(config) {
		config = config || {};
		this.size = config.size || 8;
		this.cells = createCells(this.size);
	}

	function createCells(size) {
		var cells = [];
		for (var i = 0; i < size * size; i++) {
			var x = i % 8, y = Math.floor(cells.length / 8);
			var cell = new Cell({x: x, y: y});

			// For black cells in rows 0-2 add black piece
			if (y < 3 && cell.color === Piece.BLACK) {
				cell.setPiece(new Piece({color: Piece.BLACK}));
			}

			// For black cells in rows 5-7 add red piece
			if (y > 4 && cell.color === Piece.BLACK) {
				cell.setPiece(new Piece({color: Piece.RED}));
			}

			cells.push(cell);
		}
		return cells;
	}

	Board.prototype.cellAt = function (x, y) {
		return this.cells[x + (y * this.size)];
	};

	Board.prototype.render = function () {
		var board = document.createElement('div');
		board.classList.add('board');
		this.cells.forEach(function (cell) {
			board.appendChild(cell.render());
		});
		return board;
	};

	Board.prototype.isValidCoordinate = function (x, y) {
		return x >= 0 && x < this.size && y >= 0 && y < this.size;
	};

	return Board;
})();
