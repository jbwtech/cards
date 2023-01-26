

const { Shoe } = require('./classes/shoe.js');
const { Dealer, Player } = require('./classes/player.js');
const { Card } = require('./classes/card.js');

const players = [];
const round = [];

const shoe = new Shoe(8);

players.push(new Player("Sam", 100));
players.push(new Player("Wanda", 500));
players.push(new Player("Brent", 1000));
players.push(new Player("Maritza", 1000));

console.log(players);
console.log("");


players.forEach((player) => {
    var handID = player.CreateHand(10);

    if( handID !== null) {
        round.push(handID);
    }    
})

const dealer = new Dealer();


console.log(round);
console.log(players);
console.log(dealer);

dealer.hand.AddCard(new Card(shoe.GetCard()));
dealer.hand.AddCard(new Card(shoe.GetCard()));

console.log(dealer);
