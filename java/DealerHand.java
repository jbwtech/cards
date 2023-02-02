

public class DealerHand extends Hand
{    
    public DealerHand()
    {
        super();
        this.id = currentID++;
        this.playerID = -1;
    }

    Card UpCard() {
        return this.cards.get(0);
    }
    
    private void AddCard(DealerHand hand, Card cardObject) 
    {

        if( cardObject.Value() == 11) {
            hand.aces++;
        }
    
        hand.cards.add(cardObject);
        hand.score = 0;
        hand.text = "";
    
        hand.cards.forEach((card) -> {
            hand.score += card.Value();
            hand.text += card.Text();
        });
    
        int numberOfAces = hand.aces;
        while( (hand.score > 21) && (numberOfAces > 0) ) {
            hand.score -= 10;
            numberOfAces--;
        }
    
        if( hand.score > 21 ) {
            hand.status = "Busted";
            return;
        }
    
        if( hand.score == 21 ) {
            if(hand.cards.size() == 2) {
                hand.status = "BlackJack!";
            }
            return;
        }
    }    
}
