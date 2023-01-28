const { Card } = require('./card.js');

const RNG = require('random-seed').create();

class Shoe {

    #decks = 2;
    #shoe = null;

    constructor( number_of_decks ) {
    
        if( number_of_decks !== undefined ) {
            this.#decks = number_of_decks;
        }

        this.Shuffle();
    }

    CardsLeft() {
        return this.#shoe.length;
    }

    GetCard() {
        return new Card(this.#shoe.pop());
    }

    Reset() {
        this.Shuffle();
    }

    Show() {
        DisplayShoe(this.#shoe, this.#decks);
    }

    Shuffle() {
        this.#shoe = new Array();
        Setup(this.#shoe, this.#decks);
    }
}

function Setup(shoe, decks) {

    // If the shoe isn't empty yet reset it
    shoe.length = 0;

    for( var i=0; i < (decks * 52); i++) {
        shoe.push(i);
    }

    // Initialize seed randomly
    RNG.seed(Date.now());

    for( var i=shoe.length-1; i>=0; i--)
    {
        // Random for remaining positions.
        const r = (RNG.range(i));

        const temp = shoe[i];
        shoe[i]= shoe[r];
        shoe[r] = temp;
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