import fetch from 'node-fetch';

// URL to the JSON file containing jokes
const URL = "https://terjetheteacher.github.io/some-jokes/justJokes.json";

async function getJokes() {
    try {
        const response = await fetch(URL);
        if (response.ok) {
            const jokes = await response.json();
            return Object.values(jokes);
        } else {
            console.log("Failed to retrieve jokes.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching jokes:", error);
        return [];
    }
}

function showSpecificJoke(jokes, jokeNumber, favorites) {
    if (jokeNumber >= 1 && jokeNumber <= jokes.length) {
        const joke = jokes[jokeNumber - 1];
        console.log(`\nJoke ${jokeNumber}: ${joke}`);
        const favorite = prompt("Press 'f' to favorite this joke or Enter to continue: ").toLowerCase();
        if (favorite === "f") {
            if (!favorites.includes(joke)) {
                favorites.push(joke);
                console.log("Joke added to favorites!");
            } else {
                console.log("Joke is already in favorites.");
            }
        }
    } else {
        console.log(`Joke number ${jokeNumber} does not exist.`);
    }
}

function showAllJokes(jokes, favorites) {
    console.log("\nAll jokes:");
    jokes.forEach((joke, index) => {
        console.log(`Joke ${index + 1}: ${joke}`);
        const favorite = prompt("Press 'f' to favorite this joke or Enter to continue: ").toLowerCase();
        if (favorite === "f") {
            if (!favorites.includes(joke)) {
                favorites.push(joke);
                console.log("Joke added to favorites!");
            } else {
                console.log("Joke is already in favorites.");
            }
        }
    });
}

function showRandomJoke(jokes, favorites) {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    console.log(`\nRandom Joke: ${randomJoke}`);
    const favorite = prompt("Press 'f' to favorite this joke or Enter to continue: ").toLowerCase();
    if (favorite === "f") {
        if (!favorites.includes(randomJoke)) {
            favorites.push(randomJoke);
            console.log("Joke added to favorites!");
        } else {
            console.log("Joke is already in favorites.");
        }
    }
}

function showFavorites(favorites) {
    if (favorites.length > 0) {
        console.log("\nYour Favorite Jokes:");
        favorites.forEach((joke, index) => {
            console.log(`Favorite ${index + 1}: ${joke}`);
        });
    } else {
        console.log("\nYou have no favorite jokes yet.");
    }
}

async function menu() {
    const jokes = await getJokes();
    const favorites = []; // List to store favorited jokes

    while (true) {
        console.log("\nMenu:");
        console.log("1. Show a specific joke (1-12)");
        console.log("2. Show all jokes");
        console.log("3. Show a random joke");
        console.log("4. View favorite jokes");
        console.log("5. Exit");
        const choice = prompt("Choose an option (1-5): ");

        if (choice === "1") {
            const jokeNumber = parseInt(prompt("Enter the joke number (1-12): "), 10);
            if (!isNaN(jokeNumber)) {
                showSpecificJoke(jokes, jokeNumber, favorites);
            } else {
                console.log("Invalid input. Please enter a number.");
            }
        } else if (choice === "2") {
            showAllJokes(jokes, favorites);
        } else if (choice === "3") {
            showRandomJoke(jokes, favorites);
        } else if (choice === "4") {
            showFavorites(favorites);
        } else if (choice === "5") {
            console.log("Goodbye!");
            break;
        } else {
            console.log("Invalid choice. Please try again.");
        }
    }
}

// Main program
menu();