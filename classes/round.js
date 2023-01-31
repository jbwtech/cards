const { DealerHand, PlayerHand } = require('./hand.js');

const simulation = true;

class Round {
    constructor(shoe, dealer, hands) {
        this.shoe = shoe;
        this.dealer = dealer;
        this.hands = hands;
        this.upcard = 0;

        if(this.hands.length) {
            this.DealStartingHands(2);
        }
    }

    AddHand(hand) {
        this.hands.push(hand);
    }

    DealStartingHands( numberOfCards ) {

        for( var i=0; i < numberOfCards; i++ ) {
            // Deal Crads to players
            this.hands.forEach((hand) => { 
                hand.ReceiveCard(this.shoe.GetCard());
            })
    
            this.dealer.hand.ReceiveCard(this.shoe.GetCard());
        }

        console.log(this.hands);
        console.log(this.dealer.hand);

        this.upcard = this.dealer.hand.UpCard().value;

        console.log(this.upcard);

        this.PlayHands();
        if(this.dealer.hand.IsBlackJack() !== true ) {
            this.PlayDealer();
        } else {
            console.log(this.dealer.hand);
        }
    }

    PlayHands() {
        console.log(`Dealer is showing: ${this.dealer.hand.UpCard().text}\n`);

        if( this.dealer.hand.UpCard().value == 11) {
            console.log("Insurance?");
        }

        if( this.dealer.hand.IsBlackJack() ) {
            this.dealer.hand.status = "BlackJack!"
            console.log("Dealer has BlackJack!");
            this.hands.forEach((hand) => {
                hand.status = (hand.IsBlackJack()) ? "Push" : "Lose";
                console.log(hand);
            });
            return;
        }

        if( simulation == true ) {
            this.hands.forEach((hand) => {
                console.log("AutoPlay ...");
                this.#AutoPlay(hand);
                console.log(hand);
            });
        } else {
            this.hands.forEach((hand) => {
                this.Play(hand);
            })
        }
    }

    #AutoPlay(hand) {

        var counter = 0;

        outside_while:
        while(hand.status == "Open") {

            counter++;
            if(counter > 6) {
                console.log(hand);
                throw error;
            }

            if(hand.canSplit == true) {
                console.log(`Should Split: ${hand.ShouldSplit(this.upcard)}`);
            }

            if(hand.canDouble == true) {
                console.log(`Should Double: ${hand.ShouldDouble(this.upcard)}`);
            }

            console.log("Hand less than 9 check ...");
            if(hand.score < 9) {
                console.log("Hit ...");
                hand.GetCard(this.shoe);
            }

            console.log("Double process check ...");
            if( hand.canDouble && hand.ShouldDouble(this.upcard) ) {
/*                    if( players[hand.playerID].stack >= hand.wager ) {
                    players[hand.playerID].stack -= hand.wager;
                    hand.wager *= 2;
                    hand.GetCard(shoe);
                    return;
                }
*/
                const currentPlayer = "";
/*                const currentPlayer = this.#seats.find((player) => {
                    return hand.playerID == player.id;
                });

*/
                console.log(`Player: ${currentPlayer}`);
                hand.wager *= 2;
                hand.status = "Doubled";
                hand.doubled == true;
                console.log("Hit ...");
                hand.GetCard(this.shoe);
                break outside_while;
            }

            console.log("Hand less than 17 check ...");
            if( hand.score < 17 ) {
                switch(this.upcard) {
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        hand.status = "Stand"
                        break;
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                        console.log("Dealer UpCard 7-11 ...");
                        console.log("Hit ...");
                        hand.GetCard(this.shoe);
                        break;
                }
            }
            if(hand.score >= 17) {
                hand.status = "Stand";
            }
            if(hand.score > 21) {
                hand.status = "Busted";
            }
        }
    }

    PlayDealer() {
        while( this.dealer.hand.score < 17 ) {
            this.dealer.hand.GetCard(this.shoe)
        }
        
        this.dealer.hand.status = (this.dealer.hand.score > 21) ? "Busted" : "Stand";
        
        console.log(this.dealer.hand);
    }

}
    

module.exports = { Round };