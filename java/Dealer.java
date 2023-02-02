public class Dealer extends Person {

    private DealerHand hand;

    Dealer() {
        super();
        this.id = -1;
        this.name = "Dealer";
        this.hand = this.CreateHand();
    }
    
    private DealerHand CreateHand() {
        DealerHand hand = new DealerHand();
        hand.playerID = this.id;
        return hand;
    }
}
