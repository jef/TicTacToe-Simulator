/* name: Jeffrey LeCompte & Robert Nichols
 * class: TCSS 435 AI
 * assignment: Tic Tac Toe
 * sources used:
 *     http://headinside.blogspot.com/2012/08/the-game-of-15-part-1.html
 */
var Agent = function () {

};

Agent.prototype.selectMove = function(board) {
    var freeCells = [];
    var magicSum;
    var evenNums = [2, 4, 6 ,8];
    var oddNums = [1, 3, 7 ,9];
    var f, i, k, l;

    for (i = 1; i < 10; i++)
        if (board.cellFree(i)) freeCells.push(i);

    if (board.playerOne) {
        magicSum = 0;

        // test to see if we can win
        for (k = 0; k < board.X.length - 1; k++) {
            for (l = k + 1; l < board.X.length; l++) {
                for (f = 0; f < freeCells.length; f++) {
                    magicSum = board.X[k] + board.X[l] + freeCells[f];
                    if (magicSum === 15)
                        return freeCells[f];
                }
            }
        }

        // test to see if we can block
        for (k = 0; k < board.O.length - 1; k++) {
            for (l = k + 1; l < board.O.length; l++) {
                for (f = 0; f < freeCells.length; f++) {
                    magicSum = board.O[k] + board.O[l] + freeCells[f];
                    if (magicSum === 15)
                        return freeCells[f];
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
            if (board.O[0] % 2 === 0) { // corner spot
                for (k = 0; freeCells.length; k++) {
                    if (freeCells[k] % 2 === 0)
                        return freeCells[k];
                }
            }
            return 5; // trap spot
        }

    } else { // agent 2 (also known as playerTwo)
        magicSum = 0;

        if (freeCells.length === 8) {
            if (!board.cellFree(5)) return evenNums[Math.floor(Math.random() * evenNums.length)];
            else return 5;
        }

        for (k = 0; k < board.X.length - 1; k++) {
            for (l = k + 1; l < board.X.length; l++) {
                for (f = 0; f < freeCells.length; f++) {
                    magicSum = board.X[k] + board.X[l] + freeCells[f];
                    if (magicSum === 15) {
                        return freeCells[f];
                    }
                }
            }
        }

        if(board.X[0] % 2 === 0)
            return oddNums[Math.floor(Math.random() * oddNums.length)];
    }
};