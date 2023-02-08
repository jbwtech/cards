public class Blackjack3 {

    private double chips;
    private int numberOfCycles;
    private int numberOfRounds;
    private double totalBank;
    private int maxRounds;

    Blackjack3() {
        this.maxRounds = 100;
        this.totalBank = 100000;
        this.chips = 1000;

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

            if( player.stack >= 2500 ) {
                break;
            }

            if( player.stack == 0 ) {
                break;
            }

            table.PlayRound();
            this.numberOfRounds++;
        }

        System.out.printf("Cycle: %3d  Rounds: %4d  Stack: %8.2f  Max: %8.2f\n", this.numberOfCycles, this.numberOfRounds, 
            player.stack, player.max_stack);
        this.Finish(player.stack);

    }

    public void Start() {

        while( this.numberOfCycles < 100 ) {
            Table table = new Table(10);
            String name = "Player";
            this.totalBank -= this.chips;
            table.AddPlayer(name, this.chips);
            this.numberOfCycles++;
            this.PlayUntilBust(table);
        }
        System.out.printf("Cycles: %d  Bank: %.2f\n", this.numberOfCycles, this.totalBank);
    }

    private void Finish(double stack) {
        this.totalBank += stack;
    }
}

