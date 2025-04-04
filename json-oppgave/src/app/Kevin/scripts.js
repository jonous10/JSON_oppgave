let jokes = {};
//her er det hvor scripten henter informasjonen/vitsene i fra JSON Filen 
async function fetchJokes() {
   const response = await fetch('https://terjetheteacher.github.io/some-jokes/justJokes.json');
   jokes = await response.json();
   getRandomJoke();
}
//her er random funksjonen hvor denne henter ut helt tilfeldig informasjon/vist i fra JSON Filen
function getRandomJoke(){
    const keys = Object.keys(jokes);
    const randomkey = keys[math.floor(math.random() * keys.length)];
    document.getElementById('joke').textContent = jokes[randomkey];
}
//dette er hvis alle funksjonen denne gjør sånn at den henter inn all informasjonen/vitsene i fra JSON Filen
function showalljokes() {
    const alljokesDiv = document.getElementById('alljokes');
    alljokesDiv.innerHTML = Object.values(jokes).map(joke => `<p>- ${joke}</p>`).join('');
    alljokesDiv.style.display ='block';
}

fetchJokes();
