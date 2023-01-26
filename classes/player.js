const { PlayerHand, Hand } = require('./hand.js');

class Dealer {
    constructor(name, amount) {
        this.name = "Dealer";
        this.hand = new Hand();
    }
}

class Player {
    constructor(name, amount) {
        this.name = name;
        this.stack = amount;
        this.hands = [];
    }

    CreateHand( wager ) {

        const hand = new PlayerHand();

        if( this.stack >= wager ) {
            // Deduct amount from player's stack
            this.stack -= wager;

            // Add the name and wager to the hand object
            hand.wager = wager;

            this.hands.push(hand);

            return hand.id;
        } else {
            return null;
        }
    }
}


module.exports = {
    Dealer,
    Player
}