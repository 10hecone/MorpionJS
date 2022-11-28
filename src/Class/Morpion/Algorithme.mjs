export class Algorithme {
    constructor(board) {
        this.board = board;
    };

    get findRightMove() {
        for(let i = 0; i <= 2; i++) {
            const algoDataFor = [
            [[i, 0], [i, 1], [i, 2]], 
            [[i, 2], [i, 1], [i, 0]], 
            [[0, i], [1, i], [2, i]], 
            [[2, i], [1, i], [0, i]],
            [[0, 0], [1, 1], [2, 2]],
            [[2, 2], [1, 1], [0, 0]],
            ];

            for(const algoData of algoDataFor) {
                const [x, y, z] = algoData;
                if(this.board[x[0]][x[1]] === this.board[y[0]][y[1]] && this.board[z[0]][z[1]] === 0) {
                    if(this.board[x[0]][x[1]] === 0) return false;
                    return {x: z[0], y: z[1]};
                };
            };
        };
        return false;
    };
};