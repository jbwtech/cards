

class Card {

    constructor(cardNumber) {
        this.number = cardNumber % 52;
        this.text = GetCardText(this.number);
        this.value = GetValueByNumber(this.number);
    }

    static rank = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
    static suit = ["s ", "h ", "d ", "c " ];

}

function GetCardText(cardNumber) {

    var temp = cardNumber % 52;

    return Card.rank[temp % 13] + Card.suit[Math.trunc(temp/13)];
}

function GetValueByNumber(cardNumber) {

    switch (cardNumber % 13) {
        case 0:
            return 11;
        case 9:
        case 10:
        case 11:
        case 12:
            return 10;
        default:
            return ((cardNumber % 13) + 1);
    }
}

module.exports = { Card }