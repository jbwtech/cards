
const { Shoe } = require('./shoe.js');
const { Dealer, Player } = require('./player.js');
const { DealerHand, PlayerHand } = require('./hand.js');
const { Round } = require('./round.js');

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

        const currentHands = new Array();

        for( const player of this.#seats ) {

            const tempHand = new PlayerHand(player.id);
            var currentBet = this.#minimumBet;

            if(this.#shoe.TrueCount > 2) {
                currentBet *= (this.#shoe.TrueCount() - 1);
            }

            if(this.#shoe.TrueCount() < 0) {
                currentBet *= 1;
            }
/*
            if(player.stack >= 750 || player.stack <= 100) {
                return false;
            }
*/
            if(player.stack >= currentBet) {
                player.stack -= currentBet;
                tempHand.wager = currentBet;
                currentHands.push(tempHand);
            }
        }

        this.round = null;

        if( currentHands.length > 0 ) {
            this.#dealer.hand = new DealerHand();
            this.round = new Round(this.#shoe, this.#dealer, currentHands);
        } else {
            return false;
        }

        // Check for Dealer Blackjack
        try {
//            console.log(this.#dealer);
            if( this.#dealer.hand.UpCard().value == 11) {
//                console.log("Insurance?");
            }
        } catch (error) {
            throw error;
        }

        if( this.#dealer.hand.IsBlackJack() ) {
            this.#dealer.hand.status = "BlackJack!"
//            console.log("Dealer has BlackJack!");
//            console.log(this.#dealer.hand);
            currentHands.forEach((hand) => {
                hand.status = (hand.IsBlackJack()) ? "Push" : "Lose";
//                console.log(hand);
            });
            return true;
        }

        var handCount = 0;

        currentHands.forEach((hand) => {
//            console.log(`Dealer is showing: ${this.#dealer.hand.UpCard().text}\n`);
            const player = this.#seats[hand.playerID];

            this.PlayHand(hand,player);

            if( (hand.status == "Stand") || (hand.status == "Doubled") ) {
                handCount++;
            }
        });

        if( handCount > 0 ) {
            this.round.PlayDealer();
        } else {
            this.#dealer.hand.status = "Reveal";
        }
//        console.log(this.#dealer.hand);

        currentHands.forEach((hand) => {
            const player = this.#seats[hand.playerID];

            const payout = this.#ScoreRound(hand, player);

            if( payout > 0 ) {
                player.GivePayout(payout);
            }
//            console.log(hand);
        });

        if( this.#shoe.CardsLeft() <= 50) {
            this.#shoe.Reset();
        }
        return true;
    }

    PlayHand(hand, player) {

        const simulation = true;
        
//        console.log(hand);

        if( simulation == true ) {
            this.round.AutoPlay(hand, player);
        } else {
            this.Play(hand);
        }
    }

    #ScoreRound(hand) {
//        console.log("Scoring hand ...");

        if( (this.#dealer.hand.IsBlackJack() == false) && (hand.status == "BlackJack!") ) {
            return hand.wager * 2.5;
        }

        switch( this.#dealer.hand.status ) {
            case "BlackJack!":
                if( hand.status == "BlackJack!") {
                    hand.status = "Push";
                    return hand.wager;
                }
                break;
            case "Busted":
                if( (hand.status == "Stand") || (hand.status == "Doubled")) {
                    hand.status = "Win";
                    return hand.wager * 2;
                }
                break;
            case "Stand":
                if( (hand.status == "Stand") || (hand.status == "Doubled")) {
                    if( hand.score == this.#dealer.hand.score ) {
                        hand.status = "Push";
                        return hand.wager;
                    } else if( hand.score > this.#dealer.hand.score ) {
                        hand.status = "Win";
                        return hand.wager * 2;
                    } else {
                        hand.status = "Lose";
                        return 0;
                    }
                }
                break;
        }
    }
}


module.exports = { Table };