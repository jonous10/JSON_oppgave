import json
import requests
import random

URL = "https://terjetheteacher.github.io/some-jokes/justJokes.json"

def get_joke_1():
    respons = requests.get(URL)
    return respons.json()

vitser = get_joke_1()
jokes = list(vitser.values())
first_joke = jokes[0]
print(first_joke)

