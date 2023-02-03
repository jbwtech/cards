import java.lang.Math;
import java.util.ArrayList;
import java.util.Random;

public class Shoe
{
    private int decks;
    private ArrayList<Integer> shoe;

    private double runningCount;
    private double decksRemaining;
    private int trueCount;

    public Shoe()
    {
        this.decks = 2;
        this.Shuffle();
    }
    
    public Shoe( int number_of_decks )
    {
        if( number_of_decks > 0 ) {
            this.decks = number_of_decks;
        }

        this.Shuffle();
    }

    public int TrueCount() {
        return this.trueCount;
    }

    public void Shuffle() {
        this.shoe = new ArrayList<Integer>();
        this.runningCount = 0;
        this.trueCount = 0;
        this.decksRemaining = this.decks;
        this.Setup();
    }

    private void Setup() {

        for( int i=0; i < (this.decks * 52); i++) {
            shoe.add(i);
        }
    
        // Initialize seed randomly
        Random RNG = new Random(System.nanoTime());
    
        for( int i = this.shoe.size() - 1; i >= 0; i--)
        {
            // Random for remaining positions.
            int r = RNG.nextInt(this.shoe.size());
            int temp = this.shoe.get(i);
            this.shoe.set(i, r);
            this.shoe.set(r, temp);
        }
    }

    private void UpdateCount(Card card) {
        if( (card.Value() > 1) && (card.Value() < 7) ) {
            this.runningCount++;
        }

        if(card.Value() > 9) {
            this.runningCount--;
        }
        this.decksRemaining = (this.shoe.size() / 52 * 100) / 100;
        this.trueCount = (int)(Math.floor(this.runningCount / this.decksRemaining));

        System.out.printf("Running: %f   Decks: %d   True: %d\n", this.runningCount, this.decks, this.trueCount);
    }

    public int CardsLeft() {
        return this.shoe.size();
    }

    public Card GetCard() {
        Card tempCard = new Card(this.shoe.get(0));
        this.shoe.remove(0);
        this.UpdateCount(tempCard);
        return tempCard;
    }

    public void Reset() {
        this.Shuffle();
    }

    public void Show() {
        this.DisplayShoe();
    }

    private void DisplayShoe() {
        for( int i = 0; i < shoe.size(); i++) {

            Card theCard = new Card(shoe.get(i) % 52);

            System.out.printf("shoe[%d]:  %s  %d\n", i, theCard.Text(), theCard.Value());

            // console.log(`shoe[${i}]:  ${theCard.text}  ${theCard.number}`);
        }
    }
}
