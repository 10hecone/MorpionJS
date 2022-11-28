import { Board } from "../Board.mjs";
import { Algorithme } from "./Algorithme.mjs";

export class Morpion {
    constructor() {
        this.board;
        this.coup = 0;
        this.res = {
            win: undefined,
            evolution: []
        }
    };

    /**
     * Start the game
     */
    start() {
        this.board = this.#createMorpion();
        this.#player();
    };

    /**
     * Obtain the result of the game
     * @param {Object} param
     * @returns {Object} result
     */

    result(param = {}) {
        if(param.evolution === true) for(const evo of this.res.evolution) console.log(`${evo}\n`);
        if(param.console === true) console.log(`Win: ${this.res.win} \nCoup: ${this.coup} \nBoard: \n ${this.board[0]} \n ${this.board[1]} \n ${this.board[2]}`);
        return {win: this.res.win, coup: this.coup, board: this.board};
    };

    #createMorpion() {
        const board = new Board(3);
        return board.init([0, 0, 0], [0, 0, 0], [0, 0, 0]);
    };

    #player() {
        const value = {x: Math.floor(Math.random() * 3), y: Math.floor(Math.random() * 3)};

        if(this.board[value.x][value.y] === 0) {
            this.#coup(value, "X");
        } else {
            this.#player();
        };
    };

    #bot() {
        const value = {x: Math.floor(Math.random() * 3), y: Math.floor(Math.random() * 3)};

        if(this.board[value.x][value.y] === 0) {
            this.#coup(value, "O");
        } else {
            this.#bot();
        };
    };

    #coup(value, player) {
        const algorithme = new Algorithme(this.board);

        if(algorithme.findRightMove !== false) {
            this.board[algorithme.findRightMove.x][algorithme.findRightMove.y] = player;
        } else {
            this.board[value.x][value.y] = player;
        };
        this.res.evolution.push(` ${this.board[0]} \n ${this.board[1]} \n ${this.board[2]}`)
        this.coup++;
        this.#var(player);
    };

    #var(x) {
        const player = this.#checkWin('X');
        const bot = this.#checkWin('O');

        if(this.coup === 9) return this.res.win = "Draw";
        if(player.win === 'X') return this.res.win = "Player";
        if(bot.win === 'O') return this.res.win = "Bot";
        if(x === 'X') return this.#bot();
        if(x === 'O') return this.#player();
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