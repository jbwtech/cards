import java.util.ArrayList;

public class Hand
{
    static protected long currentID = System.nanoTime();
    
    public long id;
    public long playerID;
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
}
