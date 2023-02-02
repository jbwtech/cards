public class Round {
    private static long roundID = System.nanoTime();

    private long id;
    private Shoe shoe;
    private Dealer dealer;
    private ArrayList<PlayerHand> hands;
    private int upcard;
    
    Round(Shoe, shoe, Dealer dealer, ArrayList<PlayerHand> hands) {
        this.id = roundID;
        this.shoe = shoe;
        this.dealer = dealer;
        this.hands = hands;
        this.upcard = 0;

        roundID++;

        if( this.hands.size() > 0 ) {
            this.DealStartingHands();
        }
    }

    private void DealStartingHands(int numberOfCards) {
        for( int i = 0; i < numberOfCards; i++ ) {
            // Deal Crads to players
            this.hands.forEach((hand) => { 
                hand.ReceiveCard(this.shoe.GetCard());
            })
    
            this.dealer.hand.ReceiveCard(this.shoe.GetCard());
        }
        this.upcard = this.dealer.hand.UpCard().Value();
    }
}
