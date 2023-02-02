import java.util.ArrayList;

public class main {
 
    public static void main(String arg[]) {
        Shoe shoe = new Shoe(8);

        Table table = new Table(10);
        System.out.println("Hello World!");
        System.out.printf("Table: %d\n", table.ID());

        Player player = new Player("Brent", 1000);
        table.TakeSeat(player);
        
        table.AddPlayer("Maritza", 1000);

        table.ShowPlayers();

        Player tempPlayer = table.GetPlayer(0);

        tempPlayer.Info();

        Round currentRound = new Round(shoe, new Dealer(), new ArrayList<PlayerHand>());

        // shoe.Show();
    }
}
