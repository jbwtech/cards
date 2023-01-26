
class Hand {

    constructor() {
        this.id = Hand.id++;
        this.cards = [];
        this.status = "Open";
        this.score = 0;
        this.text = "";
    }

    static id = Date.now();

    AddCard(card) {
        this.cards.push(card);
        this.text += card.text;
        this.score += card.value;
    }
}

class PlayerHand extends Hand {
    constructor() {
        super();
        this.wager = 0;
        this.insurance = false;
    }
}

module.exports = {
    Hand,
    PlayerHand
}