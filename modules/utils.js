const RNG = require('random-seed').create();

const rank = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
const suit = ["s", "h", "d", "c" ];

const minimumBet = 10;

function Shuffle(shoe)
{
    // Initialize seed randomly
    RNG.seed(Date.now());
  
    for (i=shoe.length-1; i>=0; i--)
    {
        // Random for remaining positions.
        const r = (RNG.range(i));
        //console.log(`i: ${i} r: ${r}`);

        temp = shoe[i];
        shoe[i]= shoe[r];
        shoe[r] = temp;
    }
}

function CreateShoe( numDecks ) {

    const shoe = new Array();

    for(i=0; i < numDecks*52; i++) {
        shoe.push(i);
    }

    Shuffle(shoe)

    return shoe;
}

function DisplayShoe(shoe) {
    for(i=0; i<shoe.length; i++) {

        const j = Math.trunc(shoe[i] / 52);
        const k = shoe[i] - (j*52);
        const l = Math.trunc(k/13);
        const m = k - (l*13);
    
        console.log(`shoe[${i}]:  ${rank[m]}${suit[l]}  ${shoe[i]}`);
    }
}


function GetCardValue(card) {
    switch (card % 13) {
        case 0:
            return 11;
        case 9:
        case 10:
        case 11:
        case 12:
            return 10;
        default:
            return ((card % 13) + 1);
    }
}

function GetCardText(card) {

    card = card % 52;

    return `${rank[card%13]}${suit[Math.trunc(card/13)]}` ;

}

function HandValue(cards) {

    var handTotal = 0;

    var aces = 0;

    cards.forEach((card) => {
    
        var value = GetCardValue(card);

        if( (card % 13) == 0 ) {
            aces++;
            return;
        } else {
            handTotal += value;
        }
    })

    while( aces > 0 ) {
        if( (handTotal + 11) > 21 ) {
            handTotal++;
            aces--;
        } else {
            handTotal += 11;
            aces--;
        }
    }

    return handTotal;
}

function CreateHand(obj, amount) {
    const hand = {"name": "", "cards": [], "status": "Open", "wager": 0, "insurance": false, "score": 0, "cardsText": ""};

    if( obj.stack >= amount ) {
        obj.stack -= amount;
        hand.name = obj.name;
        hand.wager = amount;
        return hand;
    } else {
        return null;
    }
}

function DealMeIn(obj) {
    // Add logic to ask player for a bet
    return minimumBet;
}

function CreatePlayer(name, amount) {

    var currentPlayer = {"name": "", "stack": 0};

    currentPlayer.name = name;
    currentPlayer.stack = amount;

    return currentPlayer;
}

module.exports = {
    GetCardValue,
    GetCardText,
    DealMeIn,
    CreatePlayer,
    CreateShoe,
    DisplayShoe,
    HandValue,
    CreateHand
}