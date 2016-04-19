window.Piece = (function () {

	Piece.BLACK = 'black';
	Piece.RED = 'red';

	// Constructor for a piece
	function Piece(config) {
		this.color = config.color;
	}

	Piece.prototype.isKing = function () {
		return this.hasCrossedBoard;
	};

	// Return html element of rendered piece
	Piece.prototype.render = function () {
		var piece = document.createElement('div');
		piece.classList.add('piece');
		piece.classList.add(this.color);

		if (this.isKing()) {
			piece.appendChild(document.createTextNode("♔")); // King HTML Char
		}

		return this.isCaptured ? '' : piece;
	};

	return Piece;
})();
