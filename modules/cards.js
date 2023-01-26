const RNG = require('random-seed').create();

const rank = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
const suit = ["s", "h", "d", "c" ];



function InitialDeal( numberOfCards, hands, dealer ) {

    for( i=0; i < numberOfCards; i++ ) {
        // Deal Crads to players
        hands.forEach((hand) => { 
            hand.cards.push(shoe.pop());
        })

        if(dealer !== null) {
            // Deal Cards to delaer
            dealer.cards.push(shoe.pop());
        }        
    }

    return;
}

module.exports = {
    InitialDeal
}