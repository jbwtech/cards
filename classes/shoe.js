const RNG = require('random-seed').create();

const rank = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
const suit = ["s", "h", "d", "c" ];

class Shoe {

    decks = 2;
    shoe = [];

    constructor( number_of_decks ) {

        if( number_of_decks !== undefined ) {
            this.decks = number_of_decks;
        }

        for( var i=0; i < (this.decks * 52); i++) {
            this.shoe.push(i);
        }

        this.Shuffle();
    }

    Shuffle() {

        // Initialize seed randomly
        RNG.seed(Date.now());
    
        for( var i=this.shoe.length-1; i>=0; i--)
        {
            // Random for remaining positions.
            const r = (RNG.range(i));

            const temp = this.shoe[i];
            this.shoe[i]= this.shoe[r];
            this.shoe[r] = temp;
        }
    }

    CardsLeft() {
        return this.shoe.length;
    }

    GetCard() {
        const card = this.shoe.pop() % 52;

        return rank[card%13] + suit[Math.trunc(card/13)];
    }
}

module.exports = {
    Shoe
}