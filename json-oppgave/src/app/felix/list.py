import json
import requests
import random

# URL to the JSON file containing jokes
URL = "https://terjetheteacher.github.io/some-jokes/justJokes.json"

#Gets and defines joke 1
def get_joke_1():
    respons = requests.get(URL)
    return respons.json()



# gets and defines all jokes
def show_all_jokes(jokes):
    print("\nAll jokes:")
    for i, joke in enumerate(jokes, start=1):
        print(f"Joke {i}: {joke}")


def show_random_joke(jokes)
    random_joke = random.choice(jokes)
    print(f"\nRandom Joke: {random_joke}")
  
#prints all jokes and jokes 1
vitser = get_joke_1()
jokes = list(vitser.values())

show_all_jokes(jokes)
show_random_joke(jokes)

