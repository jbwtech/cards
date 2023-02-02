
public class PlayerHand extends Hand
{
    public double wager;
    public boolean insurance;
    public boolean doubled;
    public boolean canSplit;
    public boolean canDouble;
    
    public PlayerHand(int playerID)
    {
        super();
        this.playerID = playerID;
        this.wager = 0;
        this.insurance = false;
        this.doubled = false;
        this.canSplit = false;
        this.canDouble = false;
    }

    boolean ShouldSplit(int upcard) 
    {
        if( this.canSplit == true ) {
            switch(this.score) {
                case 2:
                case 16:
                    return true;
                case 10:
                case 20:
                    return false;
                case 4:
                case 6:
                case 8:
                case 12:
                case 14:
                case 18:
                    if(upcard < 7) {
                        return true;
                    } else {
                        return false;
                    }
            }
        }
        return false;
    }

    boolean ShouldDouble(int upcard) 
    {
        if( this.canDouble != true ) {
            return false;
        }

        if(this.aces == 1 ) {
            switch(this.score) {
                case 19:
                    return (upcard == 6) ? true : false;
                case 18:
                    return ((upcard >= 2) && (upcard <= 6)) ? true : false;
                case 17:
                    return ((upcard >= 3) && (upcard <= 6)) ? true : false;
                case 16:
                case 15:
                    return ((upcard >= 4) && (upcard <= 6)) ? true : false;
                case 14:
                    return ((upcard >= 5) && (upcard <= 6)) ? true : false;
                case 13:
                    return ((upcard >= 5) && (upcard <= 6)) ? true : false;
                default:
                    return false;
            }
        }

        switch(this.score) {
            case 9:
                if( ((upcard > 2) && (upcard < 7)) || (upcard == 8)) {
                    return true;
                }
                return false;
            case 10:
                if( upcard < 10) {
                    return true;
                }
                return false;
            case 11:
                return true;
            default:
                return false;
        }
    }

    protected void AddCard(Card cardObject) 
    {
        super.AddCard(cardObject);
        
        if( this.doubled == true ) {
            this.status = "Stand";
            return;
        }

        if( (this.cards.size() == 2) && (this.cards.get(0).Value() == this.cards.get(1).Value()) ) {
            this.canSplit = true;
        } else {
            this.canSplit = false;
        }
        if( this.cards.size() == 2 ) {
            this.canDouble = true;
        } else {
            this.canDouble = false;
        }
    
    }
}
