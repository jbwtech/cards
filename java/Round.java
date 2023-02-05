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

        var counter = 0;

        outside_while:
        while(hand.status == "Open") {

            counter++;
            if(counter > 6) {
//                console.log(hand);
            }

            if(hand.canSplit == true) {
//                console.log(`Should Split: ${hand.ShouldSplit(this.upcard)}`);
            }

            if(hand.canDouble == true) {
//                console.log(`Should Double: ${hand.ShouldDouble(this.upcard)}`);
            }

//            console.log("Hand less than 9 check ...");
            if(hand.score < 9) {
//                console.log("Hit ...");
                hand.GetCard(this.shoe);
            }

//            console.log("Double process check ...");
            if( hand.canDouble && hand.ShouldDouble(this.upcard) ) {
                if( player.stack >= hand.wager ) {
                    player.stack -= hand.wager;
                    hand.wager *= 2;
                    hand.status = "Doubled";
                    hand.doubled = true;
//                    console.log("Hit ...");
                    hand.GetCard(this.shoe);
                    break outside_while;
                }
            }

//            console.log("Hand less than 17 check ...");
            if( hand.score < 17 ) {
                switch(this.upcard) {
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        hand.status = "Stand";
                        break;
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
//                        console.log("Dealer UpCard 7-11 ...");
//                        console.log("Hit ...");
                        hand.GetCard(this.shoe);
                        break;
                }
            }
            if(hand.score >= 17) {
                hand.status = "Stand";
            }
            if(hand.score > 21) {
                hand.status = "Busted";
            }
        }
    }
        
}
