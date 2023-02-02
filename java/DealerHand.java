

public class DealerHand extends Hand
{   
    
    DealerHand()
    {
        super();
        this.id = currentID++;
        this.playerID = -1;
    }

    Card UpCard() {
        return this.cards.get(0);
    }
    
}
