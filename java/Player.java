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
}
