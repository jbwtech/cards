const readline = require('readline-sync');
const { Player } = require('./classes/player.js');

const { Table } = require('./classes/table.js');

const chips = 500;

var numberOfCycles = 0;

/*
for( var i =0; i<1; i++) {
    
    var name = `Player ${i}`;
    var currentPlayer = new Player(name,chips)

    table1.TakeSeat(currentPlayer, chips);
    (i == 3) ? table1.TakeSeat(currentPlayer, chips) : console.log("");
}

*/

const table1 = new Table();
const name = `Player`;
table1.AddPlayer(name, chips);
numberOfCycles ++;

const net = PlayUntilBust(table1);

console.log(`Net: [ ${net} ]`);

return;

function PlayUntilBust(theTable) {

    var numberOfRounds = 0;

    while( true ) {
        numberOfRounds++;
//        table1.ShowPlayers();
        if( theTable.GetWagers() !== true ) {
            var thePlayer = theTable.GetPlayer();
            var net = thePlayer.bank - chips;
        
            return net;
        }
    }

    console.log(`Round: ${numberOfRounds++}`)
}


return;
