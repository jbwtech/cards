public class Player extends Person {

    private double stack;
    private double max_stack;
    private double bank;
    
    Player(String name, double chips) {
        super();
        this.id = currentID;
        this.name = name;
        this.stack = chips;
        this.max_stack = this.stack;
        this.bank = 0;

        currentID++;
    }

    public PlayerHand CreateHand( int wager ) {

        Player hand = new PlayerHand();

        if( this.stack >= wager ) {
            // Deduct amount from player's stack
            this.stack -= wager;

            // Add the player ID and wager to the hand object
            hand.wager = wager;
            hand.playerID = this.id;

            return hand;
        } else {
            return null;
        }
    }

    public void GivePayout(double amount) {
    
        this.stack += amount;

        if( this.stack > this.max_stack ) {
            this.max_stack = this.stack;
        }

        if( this.stack >= 550 ) {
            this.stack -= 50;
            this.bank += 50;
        }
    }

    public void Info() {
        System.out.printf(
            "id: %d, name: %s, stack: %.2f, max_stack: %.2f, bank: %.2f\n",
            this.id, this.name, this.stack, this.max_stack, this.bank
        );
    }
}
