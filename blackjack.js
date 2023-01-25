
const readline = require('readline-sync');
const utils = require('./modules/utils');

const players = [];
var round = [];
var dealer = {"name": "Dealer", "cards": [], "status": "Open", "score": 0};

function InitialDeal() {
    for(i=0; i<2; i++) {
        // Deal Crads to players
        round.forEach((player) => { 
            player.cards.push(shoe.pop());
        })
        // Deal Cards to delaer
        dealer.cards.push(shoe.pop());
    }
}

async function PlayRound() {

    var cardsText = "";

    if( (dealer.cards[1] % 13) == 0 ) {
        console.log("Dealer:");
        cardsText = "XX ";
        cardsText += utils.GetCardText(dealer.cards[1])
        console.log(cardsText);
        console.log("");
        round.forEach((hand) => {
            var insurance = readline.question(`${hand.name}: Insurance? y/N `);
            if( insurance == "y" ) {
                hand.insurance = true;
            }
        });
    }

    if( utils.HandValue(dealer.cards) == 21 ) {

        console.log("Dealer:");
        cardsText = utils.GetCardText(dealer.cards[0]) + " ";
        cardsText += utils.GetCardText(dealer.cards[1]);
        console.log(cardsText);

        console.log("Dealer Has Blackjack!");

        round.forEach((hand) => {

            hand.score = utils.HandValue(player.cards);

            // Check for insurance
            if( hand.insurance == true ) {
                hand.status = "Insured";
            }
            if( hand.score == 21 ) {
                hand.status = "Push";
            } else {
                hand.status = "Lose";
            }
        })
        // settle wagers
        return;
    }

    round.forEach((hand) => {
    
        const playerAction = {"H": "hit", "S": "stand", "D": "double", "y": "split", "N": "no split"};
    
        console.log("Dealer:");
        cardsText = "XX ";
        cardsText += utils.GetCardText(dealer.cards[1])
        console.log(cardsText);
        console.log("");

        console.log(`Player: ${hand.name}`);
        console.log(`Bet: ${hand.wager}`)
        console.log("");

        while( hand.status == "Open" ) {

            cardsText = "";
        
            hand.cards.forEach((card) => {
                cardsText = cardsText + utils.GetCardText(card) + " ";
            })
            hand.cardsText = cardsText;

            console.log(cardsText);
            hand.score = utils.HandValue(hand.cards);

            if( hand.score == 21) {
                hand.status = "Stand"
                console.log("Blackjack!!");
                break;
            }
            console.log(`Hand Score: ${utils.HandValue(hand.cards)}`);

            var action = "";

            if( (utils.GetCardValue(hand.cards[0]) == utils.GetCardValue(hand.cards[1])) && hand.cards.length < 3 ) {
                action = readline.question("Split? (y/N): ");
                console.log("");
            }

            if( hand.cards.length < 3 ) {
                action = readline.question("H)it  S)tand  D)ouble: ");
                console.log("");
            } else {
                action = readline.question("H)it  S)tand: ");
                console.log("");
            }

            switch(action) {
                case "H":
                    temp = shoe.pop();
                    hand.cards.push(temp);
                    cardsText = cardsText + utils.GetCardText(temp) + " ";
                    hand.cardsText = cardsText;
                    hand.score = utils.HandValue(hand.cards);
                    if( hand.score > 21 ) {
                        console.log(cardsText);
                        hand.status = "Bust";
                        console.log("*** Bust ***");
                    }
                    if( hand.score == 21 ) {
                        console.log(cardsText);
                        hand.status = "Stand";
                        console.log("*** Stand (Automatic at 21) ***");
                    }
                    break;
                case "D":
                    temp = shoe.pop();
                    hand.cards.push(temp);
                    hand.wager *= 2;
                    cardsText = cardsText + utils.GetCardText(temp) + " ";
                    hand.cardsText = cardsText;
                    hand.score = utils.HandValue(hand.cards);
                    if( hand.score > 21 ) {
                        hand.status = "Bust";
                        console.log("*** Bust ***");
                    } else {
                        hand.status = "Stand";
                    }
                    console.log(cardsText);
                    console.log("*** Doubled ***");
                    break;
                case "S":
                    hand.score = utils.HandValue(hand.cards);
                    hand.status = "Stand";
                    break;
            }
        }
        console.log("");

    })

    console.log('\n');
}

function PlayDealer() {

    console.log("Dealer:");

    var cardsText = "";

    dealer.cards.forEach((card) => {
        cardsText = cardsText + utils.GetCardText(card) + " ";
    });
    dealer.score = utils.HandValue(dealer.cards);

    while( true ) {
        dealer.score = utils.HandValue(dealer.cards);

        if( dealer.score < 17 ) {
            dealer.cards.push(shoe.pop());
        } else {
            break;
        }

        cardsText = "";
        dealer.cards.forEach((card) => {
            cardsText = cardsText + utils.GetCardText(card) + " ";
        });
    }

    console.log(cardsText);

    if( dealer.score > 21 ) {
        console.log("Dealer Busts!");
        console.log("");
        dealer.status = "Bust";
        return;
    }
    console.log("Score: ");
    console.log(dealer.score);

    console.log("");
}

function ScoreRound() {
    round.forEach((hand) => {
        if( hand.status == "Win" ) {
            players.forEach( (player, index) => {
                if( player.name == hand.name ) {
                    if( (hand.score == 21) && (hand.cards.length == 2) ) {
                        players[index].stack += (hand.wager + (hand.wager * 1.5));
                    } else {
                        players[index].stack += (hand.wager*2);
                    }
                    console.log(players[index]);
                    return;
                }
            });    
        }
    })    
}

function ShowOutcomes() {
    round.forEach((hand) => {
        console.log(`Player: ${hand.name}`);
        console.log(`Bet: ${hand.wager}`);
        console.log(`Hand: ${hand.cardsText}`);
        console.log(`Score: ${hand.score}`);
        var outcome = "";
    
        switch(hand.status) {
            case "Stand":
                if(dealer.status == "Bust") {
                    outcome = "Win";
                    break;
                } else {
                    if( dealer.score < hand.score ) {
                        outcome = "Win";
                        break;
                    }
                    if( dealer.score == hand.score ) {
                        outcome = "Push";
                        break;
                    }
                    if( dealer.score > hand.score ) {
                        outcome = "Lose";
                        break;
                    }
                }
            case "Bust":
                outcome = "Bust";
        }
        hand.status = outcome;
        console.log(`Outcome: ${hand.status}`)
        console.log("");
    });    
}

// End of Functions

const shoe = utils.CreateShoe(8);

players.push(utils.CreatePlayer("Sam", 1000));
players.push(utils.CreatePlayer("Wanda", 500));
players.push(utils.CreatePlayer("Brent", 1000));
players.push(utils.CreatePlayer("Maritza", 1000));

console.log(players);
console.log("");

while( true ) {

    players.forEach((player) => {
    
        const wager = utils.DealMeIn(player);
    
        if( wager > 0 ) {
            var hand = utils.CreateHand(player, wager);
        
            if( hand !== null) {
                round.push(hand);
            }
        }
    
    })
    
    InitialDeal();
    PlayRound();
    PlayDealer();
    ShowOutcomes();
    
    //console.log(`Cards Remaining: ${shoe.length}\n`);
    ScoreRound();

    // console.log(round);
    console.log(players);
    round = [];
    dealer = {"name": "Dealer", "cards": [], "status": "Open", "score": 0};
}

return 0;