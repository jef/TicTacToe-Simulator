/* name: Jeffrey LeCompte & Robert Nichols
 * class: TCSS 435 AI
 * assignment: Tic Tac Toe
 * sources used:
 *     http://headinside.blogspot.com/2012/08/the-game-of-15-part-1.html
 */
var Agent = function () {

};

Agent.prototype.selectMove = function (board) {
    var freeCells = [];
    var magicSum;
    var evenNums = [2, 4, 6, 8];
    var oddNums = [1, 3, 7, 9];
    var f, i, k, l;

    for (i = 1; i < 10; i++)
        if (board.cellFree(i)) freeCells.push(i);

    if (board.playerOne) {
        magicSum = 0;

        // random peice
        //return freeCells[Math.floor(Math.random() * freeCells.length)];

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
        if (!board.cellFree(5) && board.X[0] % 2 === 0 && freeCells.length === 7) {
            switch (board.X[0]) {
                case 2:
                    return 8;
                case 4:
                    return 6;
                case 8:
                    return 2;
                case 6:
                    return 4;
                default:
                    return freeCells[Math.floor(Math.random() * freeCells.length)];
            }
        }

        // setup for trap (fork) and three corners
        if (board.cellFree(5) && board.X[0] % 2 === 0 && freeCells.length === 7) {
            switch (board.X[0]) {
                case 2:
                    if (board.cellFree(4) && board.cellFree(9)) return 4;
                    else return 6;
                case 4:
                    if (board.cellFree(2) && board.cellFree(9)) return 2;
                    else return 8;
                case 6:
                    if (board.cellFree(8) && board.cellFree(1)) return 8;
                    else return 2;
                case 8:
                    if (board.cellFree(6) && board.cellFree(1)) return 6;
                    else return 4;
                default:
                    return freeCells[Math.floor(Math.random() * freeCells.length)];
            }
        }

        // starts in center
        if (board.X[0] === 5 && freeCells.length === 7) {
            if (board.O[0] % 2 === 0) {
                switch (board.O[0]) {
                    case 2:
                        return 8;
                    case 4:
                        return 6;
                    case 6:
                        return 4;
                    case 8:
                        return 2;
                }
            } else {
                switch (board.O[0]) {
                    case 1: return 2;
                    case 3: return 6;
                    case 7: return 4;
                    case 9: return 8;
                }
            }
        }

        // starts in center
        if (board.X[0] === 5 && freeCells.length === 5) {
            if (board.O[0] % 2 === 0) {
                switch (board.O[0]) {
                    case 2:
                        return 4;
                    case 4:
                        return 8;
                    case 6:
                        return 2;
                    case 8:
                        return 6;
                }
            } else {
                if (board.X[1] % 2 != 0) {
                    switch (board.X[1]) {
                        case 1:
                            return 8;
                        case 3:
                            return 4;
                        case 7:
                            return 6;
                        case 9:
                            return 2;
                    }
                } else {
                    switch (board.O[1]) {
                        case 2: return 1;
                        case 4: return 8;
                        case 6: return 1;
                        case 8: return 4;
                    }
                }
            }
        }

        // finishes the trap (fork) or three corners
        if (board.cellFree(5) && freeCells.length === 5) {
            if (board.O[0] % 2 === 0) { // corner spot
                for (k = 0; k < freeCells.length; k++) {
                    if (freeCells[k] % 2 === 0)
                        return freeCells[k];
                }
            }
            return 5; // trap spot
        }

        if (!board.cellFree(5) && freeCells.length === 5) {
            for (k = 0; k < freeCells.length; k++) {
                if (board.X[k] % 2 === 0) {
                    switch (board.X[k]) {
                        case 2:
                            if (board.cellFree(4)) return 4;
                            else return 6;
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
            }
        } else {
            // automatic draw, doesn't matter where this move is.
            return freeCells[Math.floor(Math.random() * freeCells.length)];
        }
    } else { // agent 2 (also known as playerTwo)
        magicSum = 0;

        // test to see if we can win (playerOne makes a mistake)
        for (k = 0; k < board.O.length - 1; k++) {
            for (l = k + 1; l < board.O.length; l++) {
                for (f = 0; f < freeCells.length; f++) {
                    magicSum = board.O[k] + board.O[l] + freeCells[f];
                    if (magicSum === 15)
                        return freeCells[f];
                }
            }
        }

        // test to see if we can block
        for (k = 0; k < board.X.length - 1; k++) {
            for (l = k + 1; l < board.X.length; l++) {
                for (f = 0; f < freeCells.length; f++) {
                    magicSum = board.X[k] + board.X[l] + freeCells[f];
                    if (magicSum === 15) {
                        //alert(magicSum);
                        return freeCells[f];
                    }
                }
            }
        }

        // first move as second player
        if (freeCells.length === 8) {
            if (!board.cellFree(5)) return evenNums[Math.floor(Math.random() * evenNums.length)];
            else return 5;
        }

        // breaks a weird setup that playerOne might do to trick
        // playerTwo into a trap.
        if (freeCells.length === 6) {
            for (k = 0; k < freeCells.length - 1; k++) {
                if (board.X[k] % 2 != 0 && board.X[k + 1] % 2 != 0) {
                    switch (board.X[0]) {
                        case 1:
                            if (board.X[1] === 3) return 8;
                            if (board.X[1] === 7) return 6;
                            break;
                        case 3:
                            if (board.X[1] === 1) return 8;
                            if (board.X[1] === 9) return 4;
                            break;
                        case 7:
                            if (board.X[1] === 1) return 6;
                            if (board.X[1] === 9) return 2;
                            break;
                        case 9:
                            if (board.X[1] === 3) return 4;
                            if (board.X[1] === 7) return 2;
                            break;
                    }
                } else if (board.X[k] === 5 && board.X[k + 1] % 2 === 0 ||
                    board.X[k + 1] === 5 && board.X[k] % 2 === 0) {
                    return evenNums[Math.floor(Math.random() * evenNums.length)];
                } else {
                    return oddNums[Math.floor(Math.random() * oddNums.length)];
                }
            }
        } else {
            // picks an edge to try and force a cat's game
            if (board.X[0] % 2 === 0) {
                return oddNums[Math.floor(Math.random() * oddNums.length)];
            } else {
                return freeCells[Math.floor(Math.random() * freeCells.length)];
            }
        }
    }
};