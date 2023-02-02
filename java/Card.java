
public class Card
{
    static String[] rank = new String[]{"A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"};
    static String[] suit = new String[]{"s ", "h ", "d ", "c "};

    private int number;
    private String text;
    private int value;

    public Card(int cardNumber)
    {
        this.number = cardNumber % 52;
        this.text = GetCardText(this.number);
        this.value = GetValueByNumber(this.number);
    }

    public String Text()
    {
        return this.text;
    }
    
    public int Value()
    {
        return this.value;
    }
    
    private String GetCardText(int cardNumber)
    {
        int temp = cardNumber % 52;

        return rank[temp % 13] + suit[temp / 13];
    }

    private int GetValueByNumber(int cardNumber)
    {
        switch (cardNumber % 13) {
            case 0:
                return 11;
            case 9:
            case 10:
            case 11:
            case 12:
                return 10;
            default:
                return ((cardNumber % 13) + 1);
        }
    }
}
