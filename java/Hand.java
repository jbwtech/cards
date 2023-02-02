import java.util.ArrayList;

public class Hand
{
    static protected long currentID = System.nanoTime();
    
    public long id;
    public int playerID;
    public ArrayList<Card> cards;
    public String text;
    public int aces;
    public int score;
    public String status;
    
    public Hand()
    {
        this.id = currentID++;
        this.cards = new ArrayList<Card>();
        this.text = "";
        this.aces = 0;
        this.score = 0;
        this.status = "Open";
    }

    public boolean IsBlackJack()
    {
        if( (this.score == 21) && (this.cards.size() == 2) ) {
            return true;
        } else {
            return false;
        }
    }

    public void ReceiveCard(Card card) {
        this.AddCard(card);
    }

    public void GetCard(Shoe shoe) {
        this.AddCard(shoe.GetCard());
    }

    protected void AddCard(Card card) {
        if( card.Value() == 11) {
            this.aces++;
        }
    
        this.cards.add(card);
        this.score = 0;
        this.text = "";
    
        this.cards.forEach((currentCard) -> {
            this.score += currentCard.Value();
            this.text += currentCard.Text();
        });
    
        var numberOfAces = this.aces;
        while( (this.score > 21) && (numberOfAces > 0) ) {
            this.score -= 10;
            numberOfAces--;
        }
    
        if( this.score > 21 ) {
            this.status = "Busted";
            return;
        }
    
        if( this.score == 21 ) {
            if(this.cards.size() == 2) {
                this.status = "BlackJack!";
            }
            return;
        }
    }

}
