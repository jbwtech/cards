
class Hand {

    constructor() {
        this.id = Hand.id++;
        this.cards = new Array();
        this.text = "";
        this.aces = 0;
        this.score = 0;
        this.status = "Open";
    }

    static id = Date.now();

    GetCard(shoe) {
        AddCard(this, shoe.GetCard());
    }

    ReceiveCard(card) {
        AddCard(this, card);
    }

    IsBlackJack() {
        if( (this.score == 21) && (this.cards.length = 2) ) {
            return true;
        } else {
            return false;
        }
    }
}

class DealerHand extends Hand {
    constructor() {
        super();
        this.playerID = -1;
    }

    UpCard() {
        return this.cards[0];
    }

}

class PlayerHand extends Hand {
    constructor(playerID) {
        super();
        this.playerID = playerID;
        this.wager = 0;
        this.insurance = false;
        this.doubled = false;
    }
}

function AddCard(hand, cardObject) {

    if( cardObject.value == 11) {
        hand.aces++;
    }

    hand.cards.push(cardObject);
    hand.score = 0;
    hand.text = "";

    hand.cards.forEach((card) => {
        hand.score += card.value;
        hand.text += card.text;
    });

    var numberOfAces = hand.aces;
    while( (hand.score > 21) && (numberOfAces > 0) ) {
        hand.score -= 10;
        numberOfAces--;
    }

    if( hand.score > 21 ) {
        hand.status = "Busted";
        return;
    }

    if( hand.score == 21 ) {
        if(hand.cards.length == 2) {
            hand.status = "BlackJack!";
        } else {
            hand.status = "Stand";
        }
        return;
    }

    if( hand.doubled == true ) {
        hand.status = "Stand";
        return;
    }
}

module.exports = {
    DealerHand,
    PlayerHand
}