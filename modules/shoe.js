function FillTheShoe() {
    for(i=0; i<decks*52; i++) {
        shoe.push(i);
    }
}

// Function which shuffle and print the array
function Shuffle()
{
    shoePosition = 0;
    // Initialize seed randomly
    RNG.seed(Date.now());
  
    for (i=shoe.length-1; i>=0; i--)
    {
        // Random for remaining positions.
        const r = (RNG.range(i));
        //console.log(`i: ${i} r: ${r}`);

        temp = shoe[i];
        shoe[i]= shoe[r];
        shoe[r] = temp;
    }
}

function Show() {
    for(i=0; i<shoe.length; i++) {

        const j = Math.trunc(shoe[i] / 52);
        const k = shoe[i] - (j*52);
        const l = Math.trunc(k/13);
        const m = k - (l*13);
    
        console.log(`shoe[${i}]:  ${rank[m]}${suit[l]}  ${shoe[i]}`);
    }
}

