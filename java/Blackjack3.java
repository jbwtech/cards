public class Blackjack3 {

    private double chips;
    private int numberOfCycles;
    private int numberOfRounds;
    private double totalBank;
    Blackjack3() {
        this.totalBank = 0;
        this.chips = 500;

        this.numberOfRounds = 0;
        this.numberOfCycles = 0;
    }
    
    private void PlayUntilBust(Table table) {

        this.numberOfRounds = 0;

        while( true ) {
            this.numberOfRounds++;
            // theTable.ShowPlayers();
            if( ! table.GetWagers() ) {
                break;
            };
        }
        Player player = table.GetPlayer(0);
        double net = player.bank - this.chips;
        System.out.printf("Rounds: %d  Net: %.2f\n", this.numberOfRounds, net);
        this.Finish(net);
    }

    public void Start() {

        while( this.numberOfCycles < 1000 ) {
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

