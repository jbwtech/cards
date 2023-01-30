const readline = require('readline-sync');
const { Player } = require('./classes/player.js');

const { Table } = require('./classes/table.js');

const chips = 500;

const table1 = new Table();

console.log(`Table: ${table1.ID()}`);

for( var i =0; i<7; i++) {

    var name = `Player ${i}`;
    var currentPlayer = new Player(name,chips)

    table1.TakeSeat(currentPlayer, chips);
    (i == 3) ? table1.TakeSeat(currentPlayer, chips) : console.log("");
}

table1.GetWagers();
table1.ShowPlayers();
table1.DealStartingHands(2);


return;

var numberOfRounds = 0;

while( true ) {

    const dealer = new Dealer();
    const round = new Round(dealer);

    console.log(players);
    console.log("");

    players.forEach((player) => {
        var hand = player.CreateHand(minimumBet);
    
        if( hand !== null) {
            round.AddHand(hand);
        }    
    })

    try {
        round.InitialDeal(2, shoe);
        round.AutoPlayRound(players);
        round.PlayDealer();
        round.ScoreRound(players);
        console.log(round);
        console.log("");
        numberOfRounds++;
        if(shoe.CardsLeft() < ((players.length * 7 ) + 7) ) {
            console.log(`Cards Before Reset: ${shoe.CardsLeft()}`);
            console.log(`Number of rounds: ${numberOfRounds}\n`);
            shoe.Reset();
            console.log("Resuming play ...");
        }
    } catch (error) {
        console.error(error);
    } finally {
        var busted = false;
        players.forEach((player) => {
            if( player.stack < minimumBet ) {
                busted = true;
            }
        });
        if( busted == true ) {
            break;
        }
    }
}

console.log(`Round: ${numberOfRounds}`);
players.forEach((player) => {
    console.log(player);
});


