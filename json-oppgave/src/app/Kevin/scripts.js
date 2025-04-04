let jokes = {};

// her så henter scripten informasjonen/vitsene fra jason filen og lagrer den i en variabel
// og så lager den en funksjon som henter en tilfeldig vits og viser den i nettsiden
async function fetchJokes() {
    try {
        const response = await fetch('https://terjetheteacher.github.io/some-jokes/justJokes.json');
        jokes = await response.json();
        getRandomJoke(); // Viser en tilfeldig vits etter lasting
    } catch (error) {
        console.error("Kunne ikke hente vitsene:", error);
        document.getElementById('joke').textContent = "Kunne ikke laste vitser.";
    }
}

//henterer en tilfelig vits fra json filen og viser den i nettsiden 
function getRandomJoke() {
    const keys = Object.keys(jokes);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    document.getElementById('joke').textContent = jokes[randomKey];
}

// denne funksjonen henter informasjonen fra json filen og viser alle vitsene i nettsiden
function showAllJokes() {
    const allJokesDiv = document.getElementById('allJokes');
    allJokesDiv.innerHTML = Object.values(jokes).map(joke => `<p>- ${joke}</p>`).join('');
    allJokesDiv.style.display = 'block';
}

// denne Viser en spesifikk vits basert på det nummeret som er skrevet inn i input feltet
function showSpecificJoke() {
    const jokeNumber = document.getElementById('jokeNumber').value;
    if (jokes[jokeNumber]) {
        document.getElementById('joke').textContent = jokes[jokeNumber];
    } else {
        document.getElementById('joke').textContent = "Ugyldig vitsnummer.";
    }
}

// Henter vitsene ved oppstart
fetchJokes();
