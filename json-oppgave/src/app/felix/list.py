import json
import requests
import random

# URL to the JSON file containing jokes
URL = "https://terjetheteacher.github.io/some-jokes/justJokes.json"


def get_joke_1():
    respons = requests.get(URL)
    return respons.json()




def show_all_jokes(jokes):
    print("\nAll jokes:")
    for i, joke in enumerate(jokes, start=1):
        print(f"Joke {i}: {joke}")
  

vitser = get_joke_1()
jokes = list(vitser.values())

show_all_jokes(jokes)