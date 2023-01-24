
const readline = require('readline');
const RNG = require('random-seed').create();

const rank = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
const suit = ["s", "h", "d", "c" ];
  
const shoe = require('./modules/shoe');

const players = [];
const round = [];
const minimumBet = 10;


function ShowCard(card) {

    card = card % 52;

    return `${rank[card%13]}${suit[Math.trunc(card/13)]}` ;

}

function GetNewPlayer(name, amount) {

    var currentPlayer = {"name": "", "stack": 0};

    currentPlayer.name = name;
    currentPlayer.stack = amount;

    return currentPlayer;
}

function CardValue(card) {
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

function HandValue(cards) {

    var handTotal = 0;

    cards.forEach((card) => {
    
        var value = CardValue(card);

        if( (value == 11) && (handTotal + value) > 21 ) {
            value = 1;
        }

        handTotal += value;
    })

    return handTotal;
}

function CreateHand(obj, amount) {
    const hand = {"name": "", "cards": [], "status": "Open", "wager": 0};

    if( obj.stack >= amount ) {
        obj.stack -= amount;
        hand.name = obj.name;
        hand.wager = amount;
        return hand;
    } else {
        return null;
    }
}

function InitialDeal() {
    for(i=0; i<2; i++) {
        round.forEach((obj) => { 
            obj.cards.push(shoe.pop());
        })    
    }
}

async function PlayRound() {
    console.log('Hands:\n');
    console.log(round);
    console.log('\n');
    
    if( (dealer.cards[1] % 13) == 0 ) {
        console.log("Insurance?");
    }
    var dealer_blackjack = false;
    if( HandValue(dealer.cards) == 21 ) {
        console.log("Dealer Has Blackjack!");
        dealer_blackjack = true;
        round.forEach((obj) => {
            if( HandValue(obj.cards) == 21 ) {
                obj.status = "Push";
            } else {
                obj.status = "Lose";
            }
        })
    }

    var cardsText = "";

    round.forEach((obj) => {
    
        const playerAction = "";
    
        console.log(`Player: ${obj.name}`);


        obj.cards.forEach((card, index ) => {
            if( index == 0 ) {
                cardsText = ShowCard(card) + " ";
            } else {
                cardsText += ShowCard(card);
            }
        })
        
        console.log(cardsText);
        console.log(`Bet: ${obj.wager}`)
        console.log(`Hand Score: ${HandValue(obj.cards)}`);

        while((obj.status !== "Stand") && ! dealer_blackjack) {

            if( HandValue(obj.cards) == 21 ) {
                obj.status = "Stand";
            }

            var action = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            if( (CardValue(obj.cards[0]) == CardValue(obj.cards[1])) && obj.cards.length < 3 ) {
                action.question("Split? (y/N): ", function (answer) {
                    console.log(`Decision to split: ${answer}`);
                    action.close();
                });
            }

            if( obj.cards.length < 3 ) {
                action.question("H)it  S)tand  D)ouble: ", function (answer) {
                    console.log(`Action: ${answer}`);
                    action.close();
                });
            } else {
                action.question("H)it  S)tand: ", function (answer) {
                    console.log(`Action: ${answer}`);
                    action.close();
                });
            }

            obj.status = "Stand";
        }
        console.log("");

    })

    if( ! dealer_blackjack ) {
        cardsText = "XX ";
        cardsText += ShowCard(dealer.cards[1])
    } else {
        cardsText = ShowCard(dealer.cards[0]) + " ";
        cardsText += ShowCard(dealer.cards[1]);
    }

    console.log('\n');
}

function DealMeIn(obj) {
    // Add logic to ask player for a bet
    return minimumBet;
}

// End of Functions

players.push(GetNewPlayer("Sam", 1000));
players.push(GetNewPlayer("Wanda", 500));
players.push(GetNewPlayer("Brent", 1000));
players.push(GetNewPlayer("Maritza", 1000));

console.log(players);

const dealer = {"name": "Dealer", "cards": [], "status": "Open"};

shoe.Fill();
shoe.Shuffle();
//shoe.Show();

players.forEach((obj) => {

    const wager = DealMeIn(obj);

    if( wager > 0 ) {
        var temp = CreateHand(obj, wager);

        if( temp !== null) {
            round.push(temp);
        } else {
            console.log('Error');
        }
    }

})

console.log(`Cards Remaining: ${shoe.length}\n`);

return 0;

InitialDeal();
PlayRound();

console.log(`Cards Remaining: ${shoe.length}\n`);

return 0;