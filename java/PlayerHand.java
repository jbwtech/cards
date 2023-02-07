import java.io.PipedWriter;
import java.lang.Math;

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

    private boolean IsStartingHand() {
        return (this.cards.size() == 2 ) ? true : false;
    }

    private boolean IsSoftHand() {
        return ((this.cards.get(0).Value() == 11) || (this.cards.get(1).Value() == 11)) ? true : false;
    }

    private String SoftHand(int upcard) {

        String action = "Hit";
        int lowCard = Math.min(this.cards.get(0).Value(), this.cards.get(1).Value());

        switch( lowCard ) {
            case 9:
                action = "Stand";
                break;
            case 8:
                if( upcard == 6 ) {
                    action = "Double";
                } else if( (upcard >= 2 && upcard <= 5) || upcard == 7 || upcard == 8 ) {
                    action = "Stand";
                }
                break;
            case 7:
                if( upcard >= 2 && upcard <= 6 ) {
                    action = "Double";
                }
                break;

            case 6:
                if( upcard >= 3 && upcard <= 6 ) {
                    action = "Double";
                }
                break;

            case 5:
            case 4:
                if( upcard >= 4 && upcard <= 6 ) {
                    action = "Double";
                }
                break;

            case 3:
            case 2:
                if( upcard == 5 && upcard == 6 ) {
                    action = "Double";
                }
                break;
        }
        return action;
    }

    public String Strategy(int upcard) {

        String action = "";

        if( this.IsStartingHand() ) {

            if( this.ShouldSplit(upcard) ) {
                action = "Split";
            }

            if( this.ShouldDouble(upcard) ) {
                action = "Double";
            }

            if( this.IsSoftHand() ) {
                action = SoftHand(upcard);
            } else {
                action = NormalStrategy(upcard);
            }
        } else {
            action = NormalStrategy(upcard);
        }
        return action;
    }

    private String NormalStrategy(int upcard) {
        String action = "";
        switch( this.score ) {
            case 9:
                if(upcard >= 3 || upcard <= 6) {
                    action = "Double";
                }
                break;
            case 10:
                if(upcard < 10) {
                    action = "Double";
                }
                break;
            case 11:
                action = "Double";
                break;
            case 12:
                if(upcard >= 4 || upcard <= 6) {
                    action = "Stand";
                }
                break;
            case 13:
            case 14:
            case 15:
            case 16:
                if(upcard <= 6) {
                    action = "Stand";
                }
                break;
        }
        if( action == "" && this.score < 17 ) {
            action = "Hit";
        } else {
            action = "Stand";
        }
        return action;
    }
}
