const { Card } = require('./card.js');

const RNG = require('random-seed').create();

function DisplayShoe(shoe) {
    for(i=0; i<shoe.length; i++) {

        const theCard = new Card(shoe[i] % 52);

        console.log(`shoe[${i}]:  ${theCard.text}  ${theCard.number}`);
    }
}

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
        return this.shoe.pop() % 52;
    }

    Show() {
        DisplayShoe(this.shoe);
    }
}

module.exports = {
    Shoe
}