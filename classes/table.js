
const { Shoe } = require('./shoe.js');
const { Dealer, Player } = require('./player.js');

const minimumBet = 5;


class Table {

    static #currentID = Date.now() - 1;

    #id;
    #shoe = new Shoe(8);
    #dealer = new Dealer();
    #seats = new Array();

    constructor() {
        this.#id = Table.#currentID++;
    }

    ID() {
        return this.#id;
    }

    AddPlayer(player,chips) {
        this.#seats.push(new Player(player, chips));
    }

    ShowPlayers() {
        this.#seats.forEach((player) => {
            console.log(player);
        });
    }
}

module.exports = { Table };