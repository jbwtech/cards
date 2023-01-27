const readline = require('readline-sync');

const { Shoe } = require('./classes/shoe.js');
const { Dealer, Player } = require('./classes/player.js');

function InitialDeal( numberOfCards, round, dealer ) {

    for( i=0; i < numberOfCards; i++ ) {
        // Deal Crads to players
        round.forEach((hand) => { 
            hand.GetCard(shoe);
        })

        if(dealer !== null) {
            // Deal Cards to delaer
            dealer.hand.GetCard(shoe);
        }        
    }

    return;
}

function AutoPlayRound(round, players, dealer) {

    console.log(`Dealer is showing: ${dealer.hand.UpCard().text}\n`);

    if( dealer.hand.UpCard().value == 11) {
        console.log("Insurance?");
    }
    
    if( dealer.hand.IsBlackJack() ) {
        dealer.hand.status = "BlackJack!"
        console.log("Dealer has BlackJack!");
        return;
    }
    
    round.forEach((hand) => {
    
        outside_while:
        while(hand.status == "Open") {
            if(hand.score >= 17) {
                hand.status = "Stand";
                break outside_while;
            }
    
            const upcard = dealer.hand.UpCard().value;
    
            if( hand.cards.length == 2 ) {
                switch(hand.score) {
                    case 9:
                        if( ((upcard > 2) && (upcard < 7)) || (upcard == 8)) {
                            hand.doubled = true;
                        }
                        break;
                    case 10:
                        if( upcard < 10) {
                            hand.doubled = true;
                        }
                        break;
                    case 11:
                        hand.doubled = true;
                        break;
                    case 12:
                        if((upcard == 2) || (upcard == 3)) {
                            hand.GetCard(shoe);
                            break outside_while;
                        }
                        break;
        
                }

                if( hand.cards[0].value == hand.cards[1].value ) {
                    switch(hand.score) {
                        case 2:
                        case 16:
                            console.log("Split");
                            break;
                        case 4:
                        case 6:
                        case 8:
                        case 10:
                            // Should Already 
                        case 12:
                        case 14:
                        case 16:
                        case 18:
                        case 20:
                    }
                }
            }
            if( hand.doubled ) {
                hand.status = "Doubled";
                if( players[hand.playerID].stack >= hand.wager ) {
                    players[hand.playerID].stack -= hand.wager;
                    hand.wager *= 2;
                }
                hand.GetCard(shoe);
                return;
            }
    
            if( hand.score < 17 ) {
                switch(upcard) {
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        hand.status = "Stand"
                        break;
                    default:
                        hand.GetCard(shoe);
                }
            }

            if(hand.score < 9) {
                hand.GetCard(shoe);
            }
        }
//        console.log(hand);
    });    
}

function PlayDealer(dealer) {
    while( dealer.hand.score < 17 ) {
        dealer.hand.GetCard(shoe)
    }
    
    dealer.hand.status = (dealer.hand.score <= 21) ? "Stand" : "Busted"
    
    console.log(dealer.hand);    
}

function ScoreRound(round, dealer) {
    switch( dealer.hand.status ) {
        case "Busted":
            round.forEach((hand) => {
                if( hand.status == "BlackJack!" ) {
                    players[hand.playerID].stack += (hand.wager * 2.5);
                }
                if( (hand.status == "Stand") || (hand.status == "Doubled")) {
                    hand.status = "Win";
                    players[hand.playerID].stack += (hand.wager * 2);
                }
            })
            break;
        case "Stand":
            round.forEach((hand) => {
                if( hand.status == "BlackJack!" ) {
                    players[hand.playerID].stack += (hand.wager * 2.5);
                }
                if( (hand.status == "Stand") || (hand.status == "Doubled")) {
                    if( hand.score == dealer.hand.score ) {
                        hand.status = "Push";
                        players[hand.playerID].stack += hand.wager;
                    }
                    if( hand.score > dealer.hand.score ) {
                        hand.status = "Win";
                        players[hand.playerID].stack += (hand.wager * 2);
                    }
                    if( hand.score < dealer.hand.score ) {
                        hand.status = "Lose";
                    }
                }
            })
            break;
        case "BlackJack!":
            round.forEach((hand) => {
                if( hand.status == "BlackJack!") {
                    hand.status = "Push";
                    players[hand.playerID].stack += hand.wager;
                } else {
                    hand.status = "Lose";
                }
            })
            break;
    }    
}

const players = new Array();

var shoe = new Shoe(8);
var numberOfRounds = 0;

players.push(new Player("Sam", 2000));
players.push(new Player("Wanda", 2000));
players.push(new Player("Brent", 2000));
players.push(new Player("Maritza", 2000));

for(i=0; i<100; i++) {

    const round = new Array();

    console.log(players);
    console.log("");

    players.forEach((player) => {
        var hand = player.CreateHand(20);
    
        if( hand !== null) {
            round.push(hand);
        }    
    })
        
    const dealer = new Dealer();

    InitialDeal(2, round, dealer);
    AutoPlayRound(round, players, dealer);
    PlayDealer(dealer);
    ScoreRound(round, dealer);
    
    console.log(round);
    console.log("");
    round.length = 0;

    console.log(shoe.CardsLeft());
    numberOfRounds++;
    console.log(numberOfRounds);

    if(shoe.CardsLeft() < ((players.length * 7 ) + 7) ) {
        console.log(players);
        return;        
    }
}


