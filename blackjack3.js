const readline = require('readline-sync');
const { Player } = require('./classes/player.js');

const { Table } = require('./classes/table.js');

const chips = 500;

const table1 = new Table();

console.log(`Table: ${table1.ID()}`);

for( var i =0; i<1; i++) {

    var name = `Player ${i}`;
    var currentPlayer = new Player(name,chips)

    table1.TakeSeat(currentPlayer, chips);
    (i == 3) ? table1.TakeSeat(currentPlayer, chips) : console.log("");
}

var numberOfRounds = 0;

while( true ) {
    numberOfRounds++;
    table1.ShowPlayers();
    if( table1.GetWagers() !== true ) {
        break;
    }
}

console.log(`Round: ${numberOfRounds++}`)

return;
