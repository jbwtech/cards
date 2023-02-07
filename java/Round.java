import java.util.ArrayList;

public class Round {
    private static long roundID = System.nanoTime();

    private long id;
    private Shoe shoe;
    private Dealer dealer;
    private ArrayList<PlayerHand> hands;
    private int upcard;
    
    Round(Shoe shoe, Dealer dealer, ArrayList<PlayerHand> hands) {
        this.id = roundID;
        this.shoe = shoe;
        this.dealer = dealer;
        this.hands = hands;
        this.upcard = 0;

        roundID++;

        if( this.hands.size() > 0 ) {
            this.DealStartingHands(2);
        }
    }

    private void DealStartingHands(int numberOfCards) {
        for( int i = 0; i < numberOfCards; i++ ) {
            // Deal Crads to players
            this.hands.forEach((hand) -> { 
                hand.ReceiveCard(this.shoe.GetCard());
            });
    
            this.dealer.hand.ReceiveCard(this.shoe.GetCard());
        }
        this.upcard = this.dealer.hand.UpCard().Value();
    }

    public ArrayList<PlayerHand> GetHands() {
        return this.hands;
    }

    public void PlayDealer() {
        while( this.dealer.hand.score < 17 ) {
            this.dealer.hand.GetCard(this.shoe);
        }
        
        this.dealer.hand.status = (this.dealer.hand.score > 21) ? "Busted" : "Stand";
    }

    public void Play(PlayerHand hand, Player player) {
        
    }

    public void AutoPlay(PlayerHand hand, Player player) {

//        console.log("AutoPlay ...");

        int counter = 0;
        outside_while:
        while(hand.status == "Open") {

            switch(hand.Strategy(this.upcard)) {
                case "Hit":
                    hand.GetCard(this.shoe);
                    break;
                case "Double":
                    if( player.stack >= hand.wager ) {
                        player.stack -= hand.wager;
                        hand.wager *= 2;
                        hand.status = "Doubled";
                        hand.doubled = true;
    //                    console.log("Hit ...");
                        hand.GetCard(this.shoe);
                        break outside_while;
                    } else {
                        hand.GetCard(this.shoe);
                    }
                    break;
                case "Split":
                    System.out.println("Split");
                    break;
                case "Stand":
                    hand.status = "Stand";
                    break outside_while;
            }

            if(hand.score > 21) {
                hand.status = "Busted";
            }
        }
        // System.out.println(hand.text);
        // System.out.println(hand.status);
    }
        
}
