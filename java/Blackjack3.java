public class Blackjack3 {

    private double chips;
    private int numberOfCycles;
    private int numberOfRounds;
    private double totalBank;
    private int maxRounds;

    Blackjack3() {
        this.maxRounds = 100;
        this.totalBank = 0;
        this.chips = 500;

        this.numberOfRounds = 0;
        this.numberOfCycles = 0;
    }
    
    private void PlayUntilBust(Table table) {

        this.numberOfRounds = 0;

        Player player = table.GetPlayer(0);

        while( this.numberOfRounds < 50 ) {
            this.numberOfRounds++;

            boolean playRound = table.GetWagers();

            // theTable.ShowPlayers();
            if( ! playRound ) {
                break;
            };

            if( player.stack - this.chips >= 500 ) {
                break;
            }
            table.PlayRound();
        }

        double net = player.stack - this.chips;
        System.out.printf("Cycle: %3d  Rounds: %4d  Net: %8.2f  Bank: %12.2f\n", this.numberOfCycles, this.numberOfRounds, net, this.totalBank + net);
        this.Finish(net);

    }

    public void Start() {

        while( this.numberOfCycles < this.maxRounds ) {
            Table table = new Table(10);
            String name = "Player";
            table.AddPlayer(name, this.chips);
            this.numberOfCycles++;
            this.PlayUntilBust(table);
        }
        System.out.printf("Cycles: %d  Net: %.2f\n", this.numberOfCycles, this.totalBank);
    }

    private void Finish(double net) {
        this.totalBank += net;
    }
}

