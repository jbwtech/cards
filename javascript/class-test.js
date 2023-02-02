const { Shoe } = require('./classes/shoe.js');

const choe = new Shoe(8);

var runningCount = 0;

console.log(choe.CardsLeft());

choe.Show();

while(choe.CardsLeft() > 0) {

    const currentCard = choe.GetCard();

    switch( currentCard.substring(0,1)) {
        case "A":
        case "T":
        case "J":
        case "Q":
        case "K":
            runningCount--;
            break;
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
            runningCount++;
    }

    var decksRemaining = Math.trunc(choe.CardsLeft()/52);
    var trueCount = 0;

    if( decksRemaining > 1 ) {
        trueCount = Math.trunc( runningCount / decksRemaining );
    } else {
        trueCount = runningCount;
    }

    console.log(`Card: ${currentCard}   Running Count: ${runningCount}   Decks: ${decksRemaining}   True Count: ${trueCount}`);
}

console.log(choe.CardsLeft());

const squeaky = new Shoe();

console.log(squeaky.CardsLeft());

squeaky.Show();