window.Move = (function () {

	var _board = null, colorDirection = {
		'black': 1,
		'red': -1
	};

	var setBoard = function (board) {
		_board = board;
	};

	var validMoves = function (move) {
		var potentialMoves = [];
		var validMoves = [];
		var direction = colorDirection[move.piece.color];
		potentialMoves.push({x: move.endCell.x - 1, y: move.endCell.y + direction});
		potentialMoves.push({x: move.endCell.x + 1, y: move.endCell.y + direction});

		if (move.piece.isKing()) {
			var backwards = direction[0] === 1 ? -1 : 1;
			potentialMoves.push({x: move.endCell.x - 1, y: move.endCell.y + backwards});
			potentialMoves.push({x: move.endCell.x + 1, y: move.endCell.y + backwards});
		}

		var recursiveChecks = [];

		potentialMoves.forEach(function (coordinate) {
			if (_board.isValidCoordinate(coordinate.x, coordinate.y)) {
				var potentialCell = _board.cellAt(coordinate.x, coordinate.y);
				if (move.visited.indexOf(potentialCell) === -1) {

					// If this cell has no piece, and my previous space (before ) was either a capture
					// or the original starting cell, then it is ok
					if (!potentialCell.hasPiece()) {
						var path = move.path.slice();
						path.push(potentialCell);
						var visited = move.visited.slice();
						visited.push(potentialCell);
						var newMove = Object.assign(move, {
							endCell: potentialCell,
							path: path
						});
						return validMoves.push(newMove);
					}

					// If the cell has an enemy, and the space in the same direction is empty
					// add those two spaces to visited, make a new move, add captured piece
					// to captured array
					if (potentialCell.getPiece().color !== move.piece.color) {
					}
				}
			}
		});

		return validMoves;
	};

	var isValid = function (startCell, endCell) {
		if (!startCell.hasPiece() || endCell.hasPiece()) {
			return false;
		}

		var valid = false;
		// Starting move to where we are starting
		validMoves({
			piece: startCell.getPiece(),
			startCell: startCell,
			path: [startCell],
			endCell: startCell,
			capturedPieces: [],
			visited: [startCell]
		}).forEach(function (move) {
			if (move.endCell === endCell) {
				valid = true;
			}
		});
		return valid;
	};

	var execute = function (startCell, endCell) {
		// Find the move
		var move = validMoves({
			piece: startCell.getPiece(),
			startCell: startCell,
			path: [startCell],
			endCell: startCell,
			capturedPieces: [],
			visited: [startCell]
		}).reduce(function (curMove, nextMove) {
			return nextMove.endCell === endCell ? nextMove : curMove;
		}, null);

		if (move) {
			move.capturedPieces.forEach(function (piece) {
				piece.isCaptured = true;
			});
			endCell.setPiece(startCell.getPiece());
			startCell.setPiece(null);
		}

		return move;
	};

	return {
		setBoard: setBoard,
		validMoves: validMoves,
		isValid: isValid,
		execute: execute
	};
})();
