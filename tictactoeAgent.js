// Tic Tac Toe
var Agent = function () {

};

Agent.prototype.selectMove = function(board) {
    var freeCells = [];
    for (var i = 1; i < 10; i++) {
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
                        alert("I WON BITCHES");
                        return freeCells[f];
                    }
                }
            }
        }

        if (board.O.length >= 2) {
            // O:[1,5,7] free:[3,9,2,4]
            for (var k = 0; k < board.O.length - 1; k++) {
                for (var l = k + 1; l < board.O.length; l++) {
                    for (var f = 0; f < freeCells.length; f++) {
                        magicSum = board.O[k] + board.O[l] + freeCells[f];
                        if (magicSum === 15) {
                            alert("GOTCHA BITCH");
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
            // testing
            if (freeCells.length === 9) {
                return evenNums[Math.floor(Math.random() * evenNums.length)];
            }

            if (!board.cellFree(5) && freeCells.length === 7) { // chose diagonal corner spot
                switch(board.X[0]) {
                    case 2: return 8;
                    case 4: return 6;
                    case 8: return 2;
                    case 6: return 4;
                }
            }
            else {
                return evenNums[Math.floor(Math.random() * evenNums.length)];
            }

            return freeCells[Math.floor(Math.random() * freeCells.length)];
        }
    } else { // agent 2 (also known as playerTwo)
        if (board.cellFree(5)) return 5;
        return freeCells[Math.floor(Math.random() * freeCells.length)];
    }
};