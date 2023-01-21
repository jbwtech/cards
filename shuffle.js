const RNG = require('random-seed').create();

const rank = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
const suit = ["s", "h", "d", "c" ];
  
const decks = 8;
const shoe = [];

const numCards = 2;

var shoePosition = 0;

const players = [];

function FillTheShoe() {
    for(i=0; i<decks*52; i++) {
        shoe.push(i);
    }
}

// Function which shuffle and print the array
function Shuffle()
{
    shoePosition = 0;
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

function ShowCard(card) {

    card = card % 52;

    return `${rank[card%13]}${suit[Math.trunc(card/13)]}` ;

}

function ShowTheShoe() {
    for(i=0; i<shoe.length; i++) {

        const j = Math.trunc(shoe[i] / 52);
        const k = shoe[i] - (j*52);
        const l = Math.trunc(k/13);
        const m = k - (l*13);
    
        console.log(`shoe[${i}]:  ${rank[m]}${suit[l]}  ${shoe[i]}`);
    }
}

function CreatePlayer(name, amount) {

    var currentPlayer = JSON.parse('{"name": "", "stack": 0}');

    currentPlayer.name = name;
    currentPlayer.stack = amount;

    players.push(currentPlayer);

    console.log("Players:");
    console.log(players);
}

function DealCards() {

    var hand = '{ "wager": 0, "total": 0, "cards": []}';

    for(i=0; i < players.length; i++) {

        const playerHands = [];
        const handNum = playerHands.length;
        console.log("Hand Number");
        console.log(handNum);

        if(handNum ) {
            console.log(players[i][1]);
            //hand = players[i-1][1];
        }

        var currentHand = JSON.parse(hand);
        currentHand.cards.push(GetNextCardInShoe());
        console.log(currentHand);

        players[i][1] = currentHand;
        console.log(players[i]);

        //  players[i-1][1][handNum].push(GetNextCardInShoe());
    }    
    return 0;
}

function GetNextCardInShoe() {
    console.log(`Shoe Position: ${shoePosition}`);
    return shoe[shoePosition++];
}

function HandValue(cards) {

    var handTotal = 0;
    var aces = 0;

    console.log(cards);
    console.log(cards.length);

    for( i=0; i < cards.length; i++) { 
 
        tempCard = cards[i] % 13;

        switch (tempCard) {
            case 0:
                if( aces == 0 ) {
                    handTotal += 11;
                    aces++;
                } else {
                    handTotal += 1;
                }
                break;
            case 9:
            case 10:
            case 11:
            case 12:
                handTotal += 10;
                break;
            default:
                handTotal = handTotal + ((cards[i]%13) + 1);
        }
    }

    return handTotal;
}

CreatePlayer("Sam", 1000);
CreatePlayer("Wanda", 500);

FillTheShoe();
Shuffle();
//ShowTheShoe();

var rounds = [{"name": "", "wager": 0, "score": 0, "cards": []}];

rounds[0]["name"] = "Booger";

console.log(rounds);

return 0;

DealCards(2);

