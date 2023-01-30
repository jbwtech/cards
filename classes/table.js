
const { Shoe } = require('./shoe.js');
const { Dealer, Player } = require('./player.js');
const { DealerHand, PlayerHand } = require('./hand.js');

const minimumBet = 5;


class Table {

    static #currentID = Date.now() - 1;

    #id;
    #shoe = new Shoe(8);
    #dealer = new Dealer();
    #seats = new Array();
    #minimumBet = 5;

    constructor() {
        this.#id = Table.#currentID++;
    }

    ID() {
        return this.#id;
    }

    TakeSeat(player) {
        this.#seats.push(player);
    }

    AddPlayer(name, chips) {
        this.#seats.push(new Player(name, chips));
    }

    ShowPlayers() {
        this.#seats.forEach((player) => {
            console.log(player);
        });
    }

    SetMinimum(amount) {
        this.#minimumBet = amount;
    }

    GetMinimum() {
        return this.#minimumBet;
    }

    GetWagers() {

        this.round = new Array();

        for( const player of this.#seats ) {
            const tempHand = new PlayerHand(player.id);
            if(player.stack >= this.#minimumBet) {
                player.stack -= this.#minimumBet;
                tempHand.wager = this.#minimumBet;
                this.round.push(tempHand);    
            }
        }
    }

    DealStartingHands( numberOfCards ) {
        this.#dealer.hand = new DealerHand();

        for( var i=0; i < numberOfCards; i++ ) {
            // Deal Crads to players
            this.round.forEach((hand) => { 
                hand.ReceiveCard(this.#shoe.GetCard());
            })
    
            this.#dealer.hand.ReceiveCard(this.#shoe.GetCard());
        }

        console.log(this.round);
        console.log(this.#dealer);
    }

}

module.exports = { Table };