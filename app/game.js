angular.module('con4', [])
	.component('gameComponent', {
		templateUrl: 'app/game.html',
		controller: GameController
	})

function GameController() {

	var gc = this;

	gc.newGame = function () {
		gc.victory = false;
		gc.grid = buildGrid();

		gc.activePlayer = 'red';
	}

	function buildGrid() {
		var grid = [];
		for (var i = 0; i < 6; i++) {
			grid.push([]);
			for (var j = 0; j < 7; j++) {
				grid[i].push({ row: i, col: j })
			}
		}
		return grid;
	}

	gc.dropToken = function (col) {
		console.log(gc.grid[0][col]);
		if (gc.grid[0][col].hasToken) {
			return;
		}
		console.log(gc.grid);
		var row = checkSouth(0, col);
		console.log(row + ', ' + col)
		debugger;
		var cell = gc.grid[row][col];
		cell.hasToken = true;
		cell.color = gc.activePlayer;
		
		endTurn();
		checkVictory(cell);
	}

	function checkSouth(row, col) {
		if (row === 5) {
			console.log("found the row")
			return row;
		}
		if (gc.grid[row+1][col].hasToken) {
			return row;
		}
		row ++;
		return checkSouth(row, col)
	}

	function checkVictory(cell) {
		//This one is a gimme you shouldn't have to change anything here
		//Once you fix the checkNextCell function the green squiggles should dissapear.
		//If they don't make sure you are returning a number from the checkNextCell function

		var horizontalMatches = 0;
		//Check Horizontal
		horizontalMatches += checkNextCell(cell, 0, 'left');
		horizontalMatches += checkNextCell(cell, 0, 'right');

		//Check Vertical
		var verticalMatches = 0;
		verticalMatches += checkNextCell(cell, 0, 'bottom');

		//Check DiagLeftUp and RightDown
		var diagLeft = 0;
		diagLeft += checkNextCell(cell, 0, 'diagUpLeft');
		diagLeft += checkNextCell(cell, 0, 'diagBotRight');

		//Check DiagRigthUp and LeftDown
		var diagRight = 0;
		diagRight += checkNextCell(cell, 0, 'diagUpRight');
		diagRight += checkNextCell(cell, 0, 'diagBotLeft');

		if (verticalMatches >= 3 || horizontalMatches >= 3 || diagLeft >= 3 || diagRight >= 3) {
			//You can do better than an alert 
			alert(cell.color + ' Wins');
		}
	}

	function getNextCell(cell, direction) {

		var nextRow = cell.row;
		var nextCol = cell.col;

		switch (direction) {
			case 'left':
				nextCol--;
				break;
			case 'right':
				nextCol++;
				break;
			case 'bottom':
				nextRow++;
				break;
			case 'diagUpLeft':
				nextRow--;
				nextCol--;
				break;
			case 'diagBotRight':
				nextRow++;
				nextCol++;
				break;
			case 'diagUpRight':
				nextRow--;
				nextCol++;
				break;
			case 'diagBotLeft':
				nextRow++;
				nextCol--;
				break;
		}

		if (nextRow < 0 || nextRow > 5 || nextCol < 0 || nextCol > 6) {
			return null;
		}

		return gc.grid[nextRow][nextCol];
	}

	function checkNextCell(cell, matches, direction) {
		debugger;
		var nextCell = getNextCell(cell, direction);
		if (nextCell) {
			if (nextCell.hasToken && nextCell.color == cell.color) {
				matches++;
				return checkNextCell(nextCell, matches, direction)
			}
		}
		return matches;
	}

	function endTurn() {
		
		switch (gc.activePlayer) {
			case 'red':
				gc.activePlayer = 'yellow';
				break;
			case 'yellow':
				gc.activePlayer = 'red';
				break;
		}
	}
};