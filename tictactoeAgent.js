// Tic Tac Toe
// source: http://headinside.blogspot.com/2012/08/the-game-of-15-part-1.html

//Jeffrey LeCompte && Robert Nichols
var Agent = function () {

};

Agent.prototype.selectMove = function(board) {
    var freeCells = [];
    var evenNums = [2, 4, 6 ,8];
    var f, i, j, k, l;
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

        // test to see if we can block
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

        // setup for trap (fork) and three corners
        if (board.cellFree(5) && freeCells.length === 7) {
            switch(board.X[0]) {
                case 2:
                    if (board.cellFree(4) && board.cellFree(9)) return 4;
                    else return 6;
                case 4:
                    if (board.cellFree(2) && board.cellFree(9)) return 2;
                    else return 8;
                case 6:
                    if (board.cellFree(8)&& board.cellFree(1)) return 8;
                    else return 2;
                case 8:
                    if (board.cellFree(6)&& board.cellFree(1)) return 6;
                    else return 4;
            }
        }

        // finishes the trap (fork) or three corners
        if (board.cellFree(5) && freeCells.length === 5) {
            // check if edge or corner (for loop)
            for (j = 0; j < evenNums.length; j++) {
                if (board.O[0] === evenNums[j]) { // corner spot
                    for (k = 0; freeCells.length; k++) {
                        if (freeCells[k] % 2 === 0) {
                            alert("corner kick");
                            return freeCells[k];
                        }
                    }
                }
            }
            alert("trap daddy");
            return 5; // trap spot
        }

    } else { // agent 2 (also known as playerTwo)
        //if (board.cellFree(5)) return 5;
        return freeCells[Math.floor(Math.random() * freeCells.length)];
    }
};