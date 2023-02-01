
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
        this.canSplit = false;
        this.canDouble = false;
    }

    ShouldSplit(upcard) {
        if( this.canSplit == true ) {
            switch(this.score) {
                case 2:
                case 16:
                    return true;
                    break;
                case 10:
                case 20:
                    return false;
                    break;
                case 4:
                case 6:
                case 8:
                case 12:
                case 14:
                case 16:
                case 18:
                    if(upcard < 7) {
                        return true;
                    } else {
                        return false;
                    }
                    break;
            }
        } else {
            return false;
        }
    }

    ShouldDouble(upcard) {
        if( this.canDouble !== true ) {
            return false;
        }

        if(this.aces == 1 ) {
            switch(this.score) {
                case 19:
                    return (upcard == 6) ? true : false;
                case 18:
                    return ((upcard >= 2) && (upcard <= 6)) ? true : false;
                case 17:
                    return ((upcard >= 3) && (upcard <= 6)) ? true : false;
                case 16:
                case 15:
                    return ((upcard >= 4) && (upcard <= 6)) ? true : false;
                case 14:
                    return ((upcard >= 5) && (upcard <= 6)) ? true : false;
                case 13:
                    return ((upcard >= 5) && (upcard <= 6)) ? true : false;
                default:
                    return false;
            }
        }

        switch(this.score) {
            case 9:
                if( ((upcard > 2) && (upcard < 7)) || (upcard == 8)) {
                    return true;
                }
                return false;
                break;
            case 10:
                if( upcard < 10) {
                    return true;
                }
                return false;
                break;
            case 11:
                return true;
                break;
            default:
                return false;
        }
    }
}

function AddCard(hand, cardObject) {

    if( cardObject.value == 11) {
        hand.aces++;
    }

    hand.cards.push(cardObject);
    hand.score = 0;
    hand.text = "";

    if(hand.playerID !== -1) {
        if( (hand.cards.length == 2) && (hand.cards[0].value == hand.cards[1].value) ) {
            hand.canSplit = true;
        } else {
            hand.canSplit = false;
        }
        if( hand.cards.length == 2 ) {
            hand.canDouble = true;
        } else {
            hand.canDouble = false;
        }
    }

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