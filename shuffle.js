
const readline = require('readline-sync');
const utils = require('./modules/utils');

const players = [];
const round = [];

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

    if( utils.HandValue(dealer.cards) == 21 ) {

        console.log("Dealer:");
        cardsText = utils.GetCardText(dealer.cards[0]) + " ";
        cardsText += utils.GetCardText(dealer.cards[1]);
        console.log(cardsText);

        console.log("Dealer Has Blackjack!");

        round.forEach((obj) => {
            // Check for insurance
            if( utils.HandValue(obj.cards) == 21 ) {
                obj.status = "Push";
            } else {
                obj.status = "Lose";
            }
        })
        // settle wagers
        return;
    }

    if( (dealer.cards[1] % 13) == 0 ) {
        console.log("Dealer:");
        cardsText = "XX ";
        cardsText += utils.GetCardText(dealer.cards[1])
        console.log(cardsText);
        console.log("");
        console.log("Insurance?");
        // handle insurance for players in round
    }

    round.forEach((player) => {
    
        const playerAction = {"H": "hit", "S": "stand", "D": "double", "y": "split", "N": "no split"};
    
        console.log("Dealer:");
        cardsText = "XX ";
        cardsText += utils.GetCardText(dealer.cards[1])
        console.log(cardsText);
        console.log("");

        console.log(`Player: ${player.name}`);
        console.log(`Bet: ${player.wager}`)
        console.log("");

        while( player.status == "Open" ) {

            cardsText = "";
        
            player.cards.forEach((card) => {
                cardsText = cardsText + utils.GetCardText(card) + " ";
            })
            
            console.log(cardsText);
            player.score = utils.HandValue(player.cards);

            if( player.score == 21) {
                console.log("Blackjack!!");
                break;
            }
            console.log(`Hand Score: ${utils.HandValue(player.cards)}`);

            var action = "";

            if( (utils.GetCardValue(player.cards[0]) == utils.GetCardValue(player.cards[1])) && player.cards.length < 3 ) {
                action = readline.question("Split? (y/N): ");
                console.log("");
            }

            if( player.cards.length < 3 ) {
                action = readline.question("H)it  S)tand  D)ouble: ");
                console.log("");
            } else {
                action = readline.question("H)it  S)tand: ");
                console.log("");
            }

            switch(action) {
                case "H":
                    temp = shoe.pop();
                    player.cards.push(temp);
                    cardsText = cardsText + utils.GetCardText(temp) + " ";
                    console.log(cardsText);
                    player.score = utils.HandValue(player.cards);
                    if( player.score > 21 ) {
                        player.status = "Bust";
                        console.log("Bust");
                    }
                    if( player.score == 21 ) {
                        player.status = "Stand";
                    }
                    break;
                case "D":
                    temp = shoe.pop();
                    player.cards.push(temp);
                    player.wager *= 2;
                    cardsText = cardsText + utils.GetCardText(temp) + " ";
                    console.log(cardsText);
                    player.score = utils.HandValue(player.cards);
                    if( player.score > 21 ) {
                        player.status = "Bust";
                        console.log("Bust");
                    } else {
                        player.status = "Stand";
                    }
                    break;
                case "S":
                    player.score = utils.HandValue(player.cards);
                    player.status = "Stand";
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
    console.log(cardsText);

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
        console.log(cardsText);
    }

    if( dealer.score > 21 ) {
        dealer.status = "Bust";
    }
    console.log(cardsText);
    console.log("Score: ");
    console.log(dealer.score);

    console.log(dealer);
}

// End of Functions

const shoe = utils.CreateShoe(8);

players.push(utils.CreatePlayer("Sam", 1000));
players.push(utils.CreatePlayer("Wanda", 500));
players.push(utils.CreatePlayer("Brent", 1000));
players.push(utils.CreatePlayer("Maritza", 1000));

console.log(players);
console.log("");

const dealer = {"name": "Dealer", "cards": [], "status": "Open", "score": 0};

players.forEach((obj) => {

    const wager = utils.DealMeIn(obj);

    if( wager > 0 ) {
        var hand = utils.CreateHand(obj, wager);
    
        if( hand !== null) {
            round.push(hand);
        }
    }

})
 
InitialDeal();

PlayRound();

PlayDealer();

console.log(`Cards Remaining: ${shoe.length}\n`);

console.log(round);
return 0;