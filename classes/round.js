const { Dealer, Player } = require('./player.js');

class Round {
    constructor(dealer) {
        this.round = new Array();
        this.dealer = dealer;
    }

    AddHand(hand) {
        this.round.push(hand);
    }

    InitialDeal( numberOfCards, shoe ) {

        for( var i=0; i < numberOfCards; i++ ) {
            // Deal Crads to players
            this.round.forEach((hand) => { 
                hand.GetCard(shoe);
            })
    
            if( this.dealer !== null ) {
                // Deal Cards to delaer
                this.dealer.hand.GetCard(shoe);
            }        
        }
    }
    
    AutoPlayRound(players, shoe) {
        console.log(this.dealer);
        console.log(`Dealer is showing: ${this.dealer.hand.UpCard().text}\n`);
    
        if( this.dealer.hand.UpCard().value == 11) {
            console.log("Insurance?");
        }
        
        if( this.dealer.hand.IsBlackJack() ) {
            this.dealer.hand.status = "BlackJack!"
            console.log("Dealer has BlackJack!");
            return;
        }
        console.log(this.round);
        this.round.forEach((hand) => {
        
            outside_while:
            while(hand.status == "Open") {
                if(hand.score >= 17) {
                    hand.status = "Stand";
                    break outside_while;
                }
        
                const upcard = this.dealer.hand.UpCard().value;
        
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
                    if( players[hand.playerID].stack >= hand.wager ) {
                        players[hand.playerID].stack -= hand.wager;
                        hand.wager *= 2;
                        hand.GetCard(shoe);
                        return;
                    }
                }
    
                if(hand.score < 9) {
                    hand.GetCard(shoe);
                    break outside_while;
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
            }
    //        console.log(hand);
        });    
    }
    
    PlayDealer() {
        while( this.dealer.hand.score < 17 ) {
            this.dealer.hand.GetCard(shoe)
        }
        
        this.dealer.hand.status = (this.dealer.hand.score <= 21) ? "Stand" : "Busted"
        
        console.log(this.dealer.hand);    
    }
    
    ScoreRound(players) {
        switch( this.dealer.hand.status ) {
            case "Busted":
                this.round.forEach((hand) => {
                    if( hand.status == "BlackJack!" ) {
                        players[hand.playerID].GivePayout(hand.wager * 2.5);
                    }
                    if( (hand.status == "Stand") || (hand.status == "Doubled")) {
                        hand.status = "Win";
                        players[hand.playerID].GivePayout(hand.wager * 2);
                    }
                })
                break;
            case "Stand":
                this.round.forEach((hand) => {
                    if( hand.status == "BlackJack!" ) {
                        players[hand.playerID].GivePayout(hand.wager * 2.5);
                    }
                    if( (hand.status == "Stand") || (hand.status == "Doubled")) {
                        if( hand.score == dealer.hand.score ) {
                            hand.status = "Push";
                            players[hand.playerID].GivePayout(hand.wager);
                        }
                        if( hand.score > dealer.hand.score ) {
                            hand.status = "Win";
                            players[hand.playerID].GivePayout(hand.wager * 2);
                        }
                        if( hand.score < dealer.hand.score ) {
                            hand.status = "Lose";
                        }
                    }
                })
                break;
            case "BlackJack!":
                this.round.forEach((hand) => {
                    if( hand.status == "BlackJack!") {
                        hand.status = "Push";
                        players[hand.playerID].GivePayout(hand.wager);
                    } else {
                        hand.status = "Lose";
                    }
                })
                break;
        }    
    }
}

module.exports = { Round };