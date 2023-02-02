import java.util.ArrayList;

public class Table {

    private static long currentID = System.nanoTime();
    
    private long id;
    private Shoe shoe;
    private Dealer dealer;
    private ArrayList<Player> seats;
    private int minimumBet;
    private Round round;

    Table() {
        this.id = currentID++;
        this.shoe = new Shoe(8);
        this.dealer = new Dealer();
        this.seats = new ArrayList<Player>();
        this.minimumBet = 10;
    }

    Table(int minimumBet) {
        this.id = currentID++;
        this.shoe = new Shoe(8);
        this.dealer = new Dealer();
        this.seats = new ArrayList<Player>();
        this.minimumBet = minimumBet;
    }

    public long ID() {
        return this.id;
    }

    public void TakeSeat(Player player) {
        this.seats.add(player);
    }

    public void AddPlayer(String name, double chips) {
        this.seats.add(new Player(name, chips));
    }

    public void ShowPlayers() {
        this.seats.forEach((player) -> {
            player.Info();
        });
    }

    public void SetMinimum(int amount) {
        this.minimumBet = amount;
    }

    public int GetMinimum() {
        return this.minimumBet;
    }

    public Player GetPlayer(int playerID) {
        return this.seats.get(playerID);
    }

    public void GetWagers() {

        ArrayList<PlayerHand> currentHands = new ArrayList<PlayerHand>();

        this.seats.forEach((player) -> {

            PlayerHand tempHand = new PlayerHand(player.id);
            int currentBet = this.minimumBet * 1;

            if(this.shoe.TrueCount() > 2) {
                currentBet *= (this.shoe.TrueCount() - 1);
            }

            if(this.shoe.TrueCount() < 0) {
                currentBet *= this.minimumBet;
            }
/*
            if(player.stack >= 750 || player.stack <= 100) {
                return false;
            }
*/
            if(player.stack >= currentBet) {
                player.stack -= currentBet;
                tempHand.wager = currentBet;
                currentHands.add(tempHand);
            }
        });

        if( currentHands.size() > 0 ) {
            this.dealer.hand = new DealerHand();
            this.round = new Round(this.shoe, this.dealer, currentHands);
        } else {
            return;
        }

        // Check for Dealer Blackjack
        try {
//            console.log(this.#dealer);
            if( this.dealer.hand.UpCard().Value() == 11) {
//                console.log("Insurance?");
            }
        } catch (Error error) {
            throw error;
        }

        if( this.dealer.hand.IsBlackJack() ) {
            this.dealer.hand.status = "BlackJack!";
//            console.log("Dealer has BlackJack!");
//            console.log(this.#dealer.hand);
            currentHands.forEach((hand) -> {
                hand.status = (hand.IsBlackJack()) ? "Push" : "Lose";
//                console.log(hand);
            });
            return;
        }

        // int handCount = 0;

        currentHands.forEach((hand) -> {
//            console.log(`Dealer is showing: ${this.#dealer.hand.UpCard().text}\n`);
            Player player = this.seats.get(hand.playerID);
            this.PlayHand(hand,player);
        });

        // currentHands.removeIf((hand) -> (hand.status == "Busted"));

        /*
        if( (hand.status == "Stand") || (hand.status == "Doubled") ) {
            handCount++;
        }
 */

        if( currentHands.size() > 0 ) {
            this.round.PlayDealer();
        } else {
            this.dealer.hand.status = "Reveal";
        }
//        console.log(this.#dealer.hand);

        currentHands.forEach((hand) -> {
            Player player = this.seats.get(hand.playerID);
            double payout = this.ScoreRound(hand);

            if( payout > 0 ) {
                player.GivePayout(payout);
            }
//            console.log(hand);
        });

        if( this.shoe.CardsLeft() <= 50) {
            this.shoe.Shuffle();
        }
        return;
    }

    private void PlayHand(PlayerHand hand, Player player) {

        boolean simulation = true;
        
        // console.log(hand);

        if( simulation == true ) {
            this.round.AutoPlay(hand, player);
        } else {
            this.Play(hand);
        }
    }

    private double ScoreRound(PlayerHand hand) {
        // console.log("Scoring hand ...");
        
        if( (this.dealer.hand.IsBlackJack() == false) && (hand.status == "BlackJack!") ) {
            return hand.wager * 2.5;
        }

        switch( this.dealer.hand.status ) {
            case "BlackJack!":
                if( hand.status == "BlackJack!") {
                    hand.status = "Push";
                    return hand.wager * 1.0;
                }
                break;
            case "Busted":
                if( (hand.status == "Stand") || (hand.status == "Doubled")) {
                    hand.status = "Win";
                    return hand.wager * 2.0;
                }
                break;
            case "Stand":
                if( (hand.status == "Stand") || (hand.status == "Doubled")) {
                    if( hand.score == this.dealer.hand.score ) {
                        hand.status = "Push";
                        return hand.wager * 1.0;
                    } else if( hand.score > this.dealer.hand.score ) {
                        hand.status = "Win";
                        return (hand.wager * 2.0);
                    } else {
                        hand.status = "Lose";
                        return 0;
                    }
                }
                break;
        }
        return 0.0;
    }
}
