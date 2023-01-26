

function GetCardText(cardNumber) {

    var temp = cardNumber % 52;

    return Card.rank[temp % 13] + Card.suit[Math.trunc(temp/13)];
}

function GetValueByNumber(cardNumber) {

    const theCard = cardNumber % 13;

    switch (theCard) {
        case 0:
            return 11;
        case 9:
        case 10:
        case 11:
        case 12:
            return 10;
        default:
            return (theCard + 1);
    }
}

class Card {

    constructor(cardNumber) {
        this.number = cardNumber;
        this.text = GetCardText(this.number);
        this.value = GetValueByNumber(this.number);
    }

    static rank = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
    static suit = ["s ", "h ", "d ", "c " ];

}

module.exports = { Card }