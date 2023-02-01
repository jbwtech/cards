const { PlayerHand, DealerHand } = require('./hand.js');

class Dealer {
    constructor() {
        this.id = -1;
        this.name = "Dealer";
        this.hand = Dealer.CreateHand();
        this.hand.playerID = this.id;
    }

    static CreateHand() {
        const hand = new DealerHand();
        return hand;
    }
}

class Player {
    constructor(name, amount) {
        this.id = Player.id++;
        this.name = name;
        this.stack = amount;
        this.max_stack = this.stack;
//        this.bank = 0;
    }

    static id = 0

    CreateHand( wager ) {

        const hand = new PlayerHand();

        if( this.stack >= wager ) {
            // Deduct amount from player's stack
            this.stack -= wager;

            // Add the player ID and wager to the hand object
            hand.wager = wager;
            hand.playerID = this.id;

            return hand;
        } else {
            return null;
        }
    }

    GivePayout(amount) {
        this.stack += amount;
        if( this.stack > this.max_stack ) {
            this.max_stack = this.stack;
        }
/*
        if( this.stack >= 525 ) {
            this.stack -= 25;
            this.bank += 25;
        }
*/
    }
}


module.exports = {
    Dealer,
    Player
}