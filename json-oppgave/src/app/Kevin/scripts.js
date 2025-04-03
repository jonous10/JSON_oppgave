let jokes = {};

async function fetchJokes() {
   const response = await fetch('https://terjetheteacher.github.io/some-jokes/justJokes.json');
   jokes = await response.json();
   getRandomJoke();
}

function getRandomJoke(){
    const keys = Object.keys(jokes);
    const randomkey = keys[math.floor(math.random() * keys.length)];
    document.getElementById('joke').textContent = jokes[randomkey];
}

function showalljokes() {
    const alljokesDiv = document.getElementById('alljokes');
    alljokesDiv.innerHTML = Object.values(jokes).map(joke => `<p>- ${joke}</p>`).join('');
    alljokesDiv.style.display ='block';
}

fetchJokes();
