window.Player = (function () {

	function Player(config) {
		this.selectedCell = null;
		this.color = config.color;
	}

	Player.prototype.selectCell = function (cell) {
		if (cell.hasPiece() && cell.getPiece().color === this.color) {
			(this.selectedCell ? this.selectedCell.deselect.bind(this.selectedCell) : function () {})();
			this.selectedCell = cell;
			cell.select();
			return cell;
		} else if (this.selectedCell && Move.isValid(this.selectedCell, cell)) {
			Move.execute(this.selectedCell, cell);
			this.selectedCell = null;
			cell.deselect();
			EventManager.trigger('moveComplete');
			return cell;
		} else {
			(this.selectedCell ? this.selectedCell.deselect.bind(this.selectedCell) : function () {})();
			this.selectedCell = null;
		}
	};

	return Player;
})();
