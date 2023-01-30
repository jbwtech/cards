
const { Shoe } = require('./shoe.js');
const { Dealer, Player } = require('./player.js');
const { DealerHand, PlayerHand } = require('./hand.js');

const minimumBet = 5;



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
        
        this.round.forEach((hand) => {
    
            outside_while:
            while(hand.status == "Open") {
                if(hand.score >= 17) {
                    hand.status = "Stand";
                    break;
                }
        
                const upcard = this.#dealer.hand.UpCard().value;
        
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
                                hand.doubled = true;
                            }
                            break;
                    }
    
                    if( hand.cards[0].value == hand.cards[1].value ) {
                        switch(hand.score) {
                            case 2:
                            case 16:
                                console.log("Split");
                                break outside_while;
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
/*                    if( players[hand.playerID].stack >= hand.wager ) {
                        players[hand.playerID].stack -= hand.wager;
                        hand.wager *= 2;
                        hand.GetCard(shoe);
                        return;
                    }
*/
                    const currentPlayer = this.#seats.find((player) => {
                        return hand.playerID == player.id;
                    });

                    if( currentPlayer !== undefined ) {
                        console.log(`Player: ${currentPlayer}`);
                        hand.wager *= 2;
                        hand.status = "Stand";
                        hand.GetCard(this.#shoe);
                        break;
                    }
    
                }
    
                if(hand.score < 9) {
                    hand.GetCard(this.#shoe);
                }
        
                if( (hand.score >= 12) && (hand.score < 17) ) {
                    switch(upcard) {
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
                            hand.GetCard(this.#shoe);
                            break;
                    }
                }
            }
//        console.log(hand);
        });    
        
        console.log(this.round);
    }

    PlayDealer() {
        while( this.#dealer.hand.score < 17 ) {
            this.#dealer.hand.GetCard(this.#shoe)
        }
        
        this.#dealer.hand.status = (this.#dealer.hand.score <= 21) ? "Stand" : "Busted"
        
        console.log(this.#dealer.hand);
        this.#ScoreRound();
    }

    #ScoreRound() {
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
                        players[hand.playerID].GivePayout(hand.wager);
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