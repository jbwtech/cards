const { Card } = require('./card.js');

const RNG = require('random-seed').create();

class Shoe {

    constructor( number_of_decks ) {

        this.decks = 2;
    
        if( number_of_decks !== undefined ) {
            this.decks = number_of_decks;
        }

        this.Reset();
    }

    CardsLeft() {
        return this.shoe.length;
    }

    GetCard() {
        const theCard = new Card(this.shoe.pop());
        return theCard;
    }

    Reset() {
        this.shoe = new Array();
        Setup(this);
    }

    Show() {
        DisplayShoe(this.shoe);
    }
}

function Setup(shoeObject) {

    // If the shoe isn't empty yet reset it
    shoeObject.shoe.length = 0;

    for( var i=0; i < (shoeObject.decks * 52); i++) {
        shoeObject.shoe.push(i);
    }

    // Initialize seed randomly
    RNG.seed(Date.now());

    for( var i=shoeObject.shoe.length-1; i>=0; i--)
    {
        // Random for remaining positions.
        const r = (RNG.range(i));

        const temp = shoeObject.shoe[i];
        shoeObject.shoe[i]= shoeObject.shoe[r];
        shoeObject.shoe[r] = temp;
    }

    return;
}

function DisplayShoe(shoe) {
    for(i=0; i<shoe.length; i++) {

        const theCard = new Card(shoe[i] % 52);

        console.log(`shoe[${i}]:  ${theCard.text}  ${theCard.number}`);
    }
}

module.exports = {
    Shoe
}