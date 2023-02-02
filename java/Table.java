import java.util.ArrayList;

public class Table {

    private static long currentID = System.nanoTime();
    
    private long id;
    private Shoe shoe;
    private Dealer dealer;
    private ArrayList<Player> seats;
    private int minimumBet;

    Table() {
        this.id = currentID++;
        this.shoe = new Shoe(8);
        this.dealer = new Dealer();
        this.seats = new ArrayList<Player>();
        this.minimumBet = 10;
    }

    Table(int min) {
        this.id = currentID++;
        this.shoe = new Shoe(8);
        this.dealer = new Dealer();
        this.seats = new ArrayList<Player>();
        this.minimumBet = min;
    }

    public void Info() {
        System.out.println(this.id);
    }
}
