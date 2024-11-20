var quotes = [
    {
        quote: "Be yourself; everyone else is already taken.",
        author: "Oscar Wilde"
    },
    {
        quote: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
        author: "Mahatma Gandhi"
    },
    {
        quote: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
        author: "Ralph Waldo Emerson"
    },
    {
        quote: "Insanity is doing the same thing, over and over again, but expecting different results.",
        author: "Narcotics Anonymous"
    }
]
var lastIndex = null // newly loaded site only
function displayQuote() {
    var newIndex;

    // if we we're getting the list from backend we must check if length is more than 0 so it will not throw error
    do { // this is do while function where it will do the lines first then check the condition of while loop down (THIS LINE RUNS FIRST)
        var newIndex = getRandomNumber(0, quotes.length - 1); // min and max index
    } while (newIndex === lastIndex); // if the quote didn't change reroll and get new random number until it changes
    lastIndex = newIndex; // Assign the new quote index to the global variable so it won't be displayed next roll

    document.getElementById("quote").innerText = `“${quotes[newIndex].quote}”`; // display the quite
    document.getElementById("author").innerText = "― " + quotes[newIndex].author; // display the author name
}

// This method has performance issue as it will rerun the getRandomNumber until it gets different one
// to optimize it we need to save the quotes in another list excluding the last used quote
function displayQuoteOptimized() {
    
    // if we we're getting the list from backend we must check if length is more than 0 so it will not throw error

    var removed = 1; // 1: no items removed this happen when page loads
    if (lastIndex != null) removed = 2; // 2: when there is generated item before so we remove its index so the length will be shorter
    var newIndex = getRandomNumber(0, quotes.length - removed); // size of the list with removed item

    if (lastIndex != null && newIndex >= lastIndex) newIndex++; // this is a bit complicated:
    // We have a list which contains [red, blue, violet];
    // first time we generate it will getRandomNumber from 0 to array.length-1 (as removed = 1 and lastIndex== null is it will not be 2)
    // it will give us for example blue
    //
    // 2 roll lastIndex is defined and is not null so removed will be 2
    // its like we have a list [red, violet] which its length will do array.length-1 but for the bigger list it will be array.length - 2
    // getRandomNumber will give us number between 0-1 which is red or violet
    // if the number is bigger or equal lastIndex ex. 1 then its in the shorter list it will be violet which is index 2 in bigger list
    // we have to add 1 to get the right index in the bigger list if its bigger than the lastindex
    // but if its less than ex. 0 which is red in short list and big list so we don't need to add 1

    // the whole idea is that we imagine we created a new list but removed the lastIndex item if present
    // then we generate from that new list with removed item
    // then link the lastindex to the original list
    // for better optimization we don't create new list we imagine its length with numbers cuz we don't need to make the new list

    lastIndex = newIndex; // Assign the new quote index to the global variable so it won't be displayed next roll

    document.getElementById("quote").innerText = `“${quotes[newIndex].quote}”`; // display the quite
    document.getElementById("author").innerText = "― " + quotes[newIndex].author; // display the author name
}


function getRandomNumber(min, max) { //Function to get random number between two numbers
    // Math.floor to make it integer (0, 1, 2) as Math.random will generate a number with decimals
    // Math.random generating number from 0 (inclusive) to 1 (exclusive), multiply it by a number from 0 - 2 : (in our example)
    // indexes are 0, 1, 2 so we need to get number from 0 to 2
    // (max - min + 1) = (2 - 0 + 1) = 3 total indexes (the "+ min" in case numbers are different will be useful but its 0)

    // Math.random = 0.1 (RANDOM)   *     (3)          +  0    = 0.3  with math floor = 0
    // Math.random = 0.4 (RANDOM)   *     (3)          +  0    = 1.2  with math floor = 1
    // Math.random = 0.7 (RANDOM)   *     (3)          +  0    = 2.1  with math floor = 2
    // Math.random doesn't generate 1 but it generate 0, the range from 0 to 1 and 1 is exclusive so its kinda 0 - 0.9999..
    return Math.floor(Math.random() * (max - min + 1)) + min;
}