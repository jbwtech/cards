
const shoe = [];
const decks = 8;
  
// Function which shuffle and print the array
function shuffle(card, n)
{
    // Initialize seed randomly
    srand(time(0));
  
    for (i=0; i<n; i++)
    {
        // Random for remaining positions.
        r = i + (rand() % (52 -i));
  
        swap(card[i], card[r]);
    }
}
  
for(i=0; i<decks*52; i++) {
    console.log(i);
}

//    shuffle(a, 52);
/*  
    // Printing all shuffled elements of cards
    for (i=0; i<52; i++)
        cout << a[i] << " ";
    cout << endl;
*/  
    return 0;
