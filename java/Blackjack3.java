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

        while( this.numberOfRounds < this.maxRounds ) {

            boolean playRound = table.GetWagers();

            // theTable.ShowPlayers();
            if( ! playRound ) {
                break;
            };

            if( (player.stack - this.chips) >= 500 ) {
                break;
            }
            table.PlayRound();
            this.numberOfRounds++;
        }

        double net = player.stack - this.chips;
        System.out.printf("Cycle: %3d  Rounds: %4d  Stack: %8.2f\n", this.numberOfCycles, this.numberOfRounds, player.stack);
        this.Finish(net);

    }

    public void Start() {

        while( this.numberOfCycles < 100 ) {
            Table table = new Table(10);
            String name = "Player";
            table.AddPlayer(name, this.chips);
            this.numberOfCycles++;
            this.PlayUntilBust(table);
        }
        System.out.printf("Cycles: %d  Stack: %.2f\n", this.numberOfCycles, this.totalBank);
    }

    private void Finish(double net) {
        this.totalBank += net;
    }
}

