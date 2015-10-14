// Tic Tac Toe
var Agent = function () {

};

Agent.prototype.selectMove = function(board) {
    var freeCells = [];
    var k, l, f, i, j;
    for (i = 1; i < 10; i++) {
        if (board.cellFree(i)) freeCells.push(i);
    }

    if (board.playerOne) {
        var magicSum = 0;

        // test to see if we can win
        for (k = 0; k < board.X.length - 1; k++) {
            for (l = k + 1; l < board.X.length; l++) {
                for (f = 0; f < freeCells.length; f++) {
                    magicSum = board.X[k] + board.X[l] + freeCells[f];
                    if (magicSum === 15) {
                        alert("I won!");
                        return freeCells[f];
                    }
                }
            }
        }

        if (board.O.length >= 2) {
            // O:[1,5,7] free:[3,9,2,4]
            for (k = 0; k < board.O.length - 1; k++) {
                for (l = k + 1; l < board.O.length; l++) {
                    for (f = 0; f < freeCells.length; f++) {
                        magicSum = board.O[k] + board.O[l] + freeCells[f];
                        if (magicSum === 15) {
                            alert("Blocked!");
                            return freeCells[f];
                        }
                    }
                }
            }
            // if magicSum != 15 && board.O.length >= 2
            // basically cats game from here
            return freeCells[Math.floor(Math.random() * freeCells.length)];
        } else { // X can do strategy
            var evenNums = [2, 4, 6 ,8];

            // nothing on the board, x makes random move in corner
            if (freeCells.length === 9) {
                return evenNums[Math.floor(Math.random() * evenNums.length)];
            }

            // chose diagonal corner spot
            if (!board.cellFree(5) && freeCells.length === 7) {
                switch(board.X[0]) {
                    case 2: return 8;
                    case 4: return 6;
                    case 8: return 2;
                    case 6: return 4;
                }
            }

            // setup for trap (fork) or three corners
            else if (board.cellFree(5) && freeCells.length === 7) {
                switch(board.X[0]) {
                    case 2:
                        if (board.cellFree(6)) return 6;
                        else return 4;
                    case 4:
                        if (board.cellFree(2)) return 2;
                        else return 8;
                    case 6:
                        if (board.cellFree(8)) return 8;
                        else return 2;
                    case 8:
                        if (board.cellFree(6)) return 6;
                        else return 4;
                }
            }

            // finishes the trap (fork)
            if (freeCells.length === 5 && board.cellFree(5)) return 5;

            // finishes 3 corners
            if (freeCells.length === 5 && !board.cellFree(5)) {
                for (i = 0; i < evenNums.length; i++) {
                    for (j = 0; j < freeCells.length; j++) {
                        if (freeCells[j] % 2 === evenNums[i]) return evenNums[i];
                    }
                }
            }

            return freeCells[Math.floor(Math.random() * freeCells.length)];
        }
    } else { // agent 2 (also known as playerTwo)
        //if (board.cellFree(5)) return 5;
        return freeCells[Math.floor(Math.random() * freeCells.length)];
    }
};