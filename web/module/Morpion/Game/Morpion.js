import { Board } from "../Board.js";
import { Algorithme } from "./Algorithme.js";

export class Morpion {
    constructor() {
        this.board;
        this.coup = 0;
        this.tour = undefined;
        this.ancienTour = undefined;
        this.res = {
            win: undefined,
        };
    };

    /**
     * Start the game
     */
    start() {
        this.board = this.#createMorpion();
        this.tour = 'X';
    };

    /**
     * Obtain the result of the game
     * @param {Object} param
     * @returns {Object} result
     */

    result(param = {}) {
        if(param.console === true) console.log(`Win: ${this.res.win} \nCoup: ${this.coup} \nBoard: \n ${this.board[0]} \n ${this.board[1]} \n ${this.board[2]}`);
        return {win: this.res.win, coup: this.coup, board: this.board};
    };

    #createMorpion() {
        const board = new Board(3);
        return board.init([0, 0, 0], [0, 0, 0], [0, 0, 0]);
    };

    checkIdValue(value) {
        switch(value) {
            case 1: return this.board[0][0];
            case 2: return this.board[0][1];
            case 3: return this.board[0][2];
            case 4: return this.board[1][0];
            case 5: return this.board[1][1];
            case 6: return this.board[1][2];
            case 7: return this.board[2][0];
            case 8: return this.board[2][1];
            case 9: return this.board[2][2];
        };
    };

    player(value) {
        if(this.tour === 'X') {
            switch(value) {
                case 1: this.#coup({x: 0, y: 0}, "X", true); break;
                case 2: this.#coup({x: 0, y: 1}, "X", true); break;
                case 3: this.#coup({x: 0, y: 2}, "X", true); break;
                case 4: this.#coup({x: 1, y: 0}, "X", true); break;
                case 5: this.#coup({x: 1, y: 1}, "X", true); break;
                case 6: this.#coup({x: 1, y: 2}, "X", true); break;
                case 7: this.#coup({x: 2, y: 0}, "X", true); break;
                case 8: this.#coup({x: 2, y: 1}, "X", true); break;
                case 9: this.#coup({x: 2, y: 2}, "X", true); break;
            };
            this.tour = 'O';
        };
    };

    bot() {
        if(this.tour === 'O') {
            const algorithme = new Algorithme(this.board)
            let value = {x: Math.floor(Math.random() * 3), y: Math.floor(Math.random() * 3)};

            if(this.board[value.x][value.y] === 0) {
                if(algorithme.findRightMove() !== false) value = {x: algorithme.findRightMove().x, y: algorithme.findRightMove().y};
                if(value.x === 0 && value.y === 0) this.ancienTour = 1;
                if(value.x === 0 && value.y === 1) this.ancienTour = 2;
                if(value.x === 0 && value.y === 2) this.ancienTour = 3;
                if(value.x === 1 && value.y === 0) this.ancienTour = 4;
                if(value.x === 1 && value.y === 1) this.ancienTour = 5;
                if(value.x === 1 && value.y === 2) this.ancienTour = 6;
                if(value.x === 2 && value.y === 0) this.ancienTour = 7;
                if(value.x === 2 && value.y === 1) this.ancienTour = 8;
                if(value.x === 2 && value.y === 2) this.ancienTour = 9;
                this.tour = 'X';
                this.#coup(value, "O");
            } else {
                this.bot();
            };
        };
    };

    #coup(value, player) {
        this.board[value.x][value.y] = player;
        this.coup++;
        this.#var(player);
    };

    #var(x) {
        const player = this.#checkWin('X');
        const bot = this.#checkWin('O');

        if(this.coup === 9) return this.res.win = "Draw";
        if(player.win === 'X') return this.res.win = "Player";
        if(bot.win === 'O') return this.res.win = "Bot";
        if(x === 'X') return this.bot();
    };

    #checkWin(p) {
        for(let x = 0; x <= 2; x++) {
            if(this.board[x][0] === p && this.board[x][1] === p && this.board[x][2] === p) {
                return {win: this.board[x][0]};
            };
            if(this.board[0][x] === p && this.board[1][x] === p && this.board[2][x] === p) {
                return {win: this.board[0][x]};
            };
        };
        if(this.board[0][0] === p && this.board[1][1] === p && this.board[2][2] === p) {
            return {win: this.board[0][0]};
        };
        if(this.board[0][2] === p && this.board[1][1] === p && this.board[2][0] === p) {
            return {win: this.board[2][0]};
        };
        return {win: false};
    };
};