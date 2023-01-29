
const { Shoe } = require('./shoe.js');
const { Dealer, Player } = require('./player.js');

const minimumBet = 5;

class Table {
    #id;
    #shoe;
    #dealer;
    #seats;

    constructor() {
        this.#shoe = new Shoe(8);
        this.#dealer = new Dealer();
        this.#seats = new Array();
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