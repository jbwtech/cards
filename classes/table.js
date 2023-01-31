
const { Shoe } = require('./shoe.js');
const { Dealer, Player } = require('./player.js');
const { DealerHand, PlayerHand } = require('./hand.js');

const minimumBet = 5;

const simulation = true;

class Table {

    static #currentID = Date.now() - 1;

    #id;
    #shoe = new Shoe(8);
    #dealer = new Dealer();
    #seats = new Array();
    #minimumBet = 5;

    constructor() {
        this.#id = Table.#currentID++;
    }

    ID() {
        return this.#id;
    }

    TakeSeat(player) {
        this.#seats.push(player);
    }

    AddPlayer(name, chips) {
        this.#seats.push(new Player(name, chips));
    }

    ShowPlayers() {
        this.#seats.forEach((player) => {
            console.log(player);
        });
    }

    SetMinimum(amount) {
        this.#minimumBet = amount;
    }

    GetMinimum() {
        return this.#minimumBet;
    }

    GetWagers() {

        this.round = new Array();

        for( const player of this.#seats ) {
            const tempHand = new PlayerHand(player.id);
            if(player.stack >= this.#minimumBet) {
                player.stack -= this.#minimumBet;
                tempHand.wager = this.#minimumBet;
                this.round.push(tempHand);    
            }
        }
    }

    DealStartingHands( numberOfCards ) {
        this.#dealer.hand = new DealerHand();

        for( var i=0; i < numberOfCards; i++ ) {
            // Deal Crads to players
            this.round.forEach((hand) => { 
                hand.ReceiveCard(this.#shoe.GetCard());
            })
    
            this.#dealer.hand.ReceiveCard(this.#shoe.GetCard());
        }

        console.log(this.round);
        console.log(this.#dealer.hand);
    }

    PlayHands() {
        console.log(`Dealer is showing: ${this.#dealer.hand.UpCard().text}\n`);

        if( this.#dealer.hand.UpCard().value == 11) {
            console.log("Insurance?");
        }

        if( this.#dealer.hand.IsBlackJack() ) {
            this.#dealer.hand.status = "BlackJack!"
            console.log("Dealer has BlackJack!");
            return;
        }

        if( simulation == true ) {
            this.round.forEach((hand) => {
                this.#AutoPlay(hand);
            });
        } else {
            this.round.forEach((hand) => {
                this.PlayHands(hand);
            })
        }
        console.log(this.round);
    }

    #AutoPlay(hand) {

        console.log("AutoPlay ...");

        outside_while:
        while(hand.status == "Open") {

            const upcard = this.#dealer.hand.UpCard().value;

            if(hand.canSplit == true) {
                console.log(`Split: ${hand.ShouldSplit(upcard)}`);
            }

            if(hand.canDouble == true) {
                console.log(`Double: ${hand.ShouldDouble(upcard)}`);
            }

            console.log("Hand less than 9 check ...");
            if(hand.score < 9) {
                hand.GetCard(this.#shoe);
                break outside_while;
            }

            if(hand.score >= 17) {
                hand.status = "Stand";
                break outside_while;
            }

            console.log("Double process check ...");
            if( hand.canDouble && hand.ShouldDouble(upcard) ) {
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
                hand.status = "Stand";
                hand.GetCard(this.#shoe);
                break outside_while;
            }

            console.log("Hand between 12-17 check ...");
            if( (hand.score > 10) && (hand.score < 17) ) {
                switch(upcard) {
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        hand.status = "Stand"
                        break outside_while;
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                        console.log("Dealer UpCard 7-11 ...");
                        hand.GetCard(this.#shoe);
                        console.log(hand.status);
                        break outside_while;
                }
            }
        }
        console.log(hand);
    }

    PlayDealer() {
        while( this.#dealer.hand.score < 17 ) {
            this.#dealer.hand.GetCard(this.#shoe)
        }
        
        this.#dealer.hand.status = (this.#dealer.hand.score > 21) ? "Busted" : this.#dealer.hand.status;
        
        console.log(this.#dealer.hand);
        this.#ScoreRound();
    }

    #ScoreRound() {
        console.log("Scoring round ...");
        switch( this.#dealer.hand.status ) {
            case "Busted":
                this.round.forEach((hand) => {
                    if( hand.status == "BlackJack!" ) {
    //                    players[hand.playerID].GivePayout(hand.wager * 2.5);
    //                    players[hand.playerID].stack += (hand.wager * 2.5);
                    }
                    if( (hand.status == "Stand") || (hand.status == "Doubled")) {
                        hand.status = "Win";
    //                    players[hand.playerID].GivePayout(hand.wager * 2);
    //                    players[hand.playerID].stack += (hand.wager * 2);
                    }
                })
                break;
            case "Stand":
                this.round.forEach((hand) => {
                    if( hand.status == "BlackJack!" ) {
    //                    players[hand.playerID].GivePayout(hand.wager * 2.5);
    //                    players[hand.playerID].stack += (hand.wager * 2.5);
                    }
                    if( (hand.status == "Stand") || (hand.status == "Doubled")) {
                        if( hand.score == this.#dealer.hand.score ) {
                            hand.status = "Push";
    //                        players[hand.playerID].GivePayout(hand.wager);
    //                        players[hand.playerID].stack += hand.wager;
                        }
                        if( hand.score > this.#dealer.hand.score ) {
                            hand.status = "Win";
    //                        players[hand.playerID].GivePayout(hand.wager * 2);
    //                        players[hand.playerID].stack += (hand.wager * 2);
                        }
                        if( hand.score < this.#dealer.hand.score ) {
                            hand.status = "Lose";
                        }
                    }
                })
                break;
            case "BlackJack!":
                this.round.forEach((hand) => {
                    if( hand.status == "BlackJack!") {
                        hand.status = "Push";
    //                    players[hand.playerID].GivePayout(hand.wager);
    //                    players[hand.playerID].stack += hand.wager;
                    } else {
                        hand.status = "Lose";
                    }
                })
                break;
        }
        console.log(this.round);
    }
}


module.exports = { Table };