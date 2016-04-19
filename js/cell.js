window.Cell = (function () {

	// Provide x and y coordinate
	function Cell(config) {
		this.x = config.x;
		this.y = config.y;
		this.piece = config.piece || null;

		// Determine cell color based on coordinates
		// If addition of x,y is odd, cell is black, else red
		this.color = (this.x + this.y) % 2 > 0 ? Piece.BLACK : Piece.RED;
	}

	Cell.prototype.hasPiece = function () {
		return !!this.piece;
	};

	Cell.prototype.getPiece = function () {
		return this.piece;
	};

	Cell.prototype.setPiece = function (piece) {
		this.piece = piece;
	};

	Cell.prototype.select = function () {
		this.selected = true;
	};

	Cell.prototype.deselect = function () {
		this.selected = false;
	};

	Cell.prototype.render = function () {
		var cell = document.createElement('div');
		cell.classList.add('cell');
		cell.classList.add(this.color);
		cell.setAttribute('coord-x', this.x);
		cell.setAttribute('coord-y', this.y);

		// Selected?
		if (this.selected) {
			cell.classList.add('selected');
		}

		// Append piece
		if (this.hasPiece()) {
			cell.appendChild(this.piece.render());
		}

		return cell;
	};

	return Cell;
})();
