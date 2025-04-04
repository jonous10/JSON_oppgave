import requests
import json
import random

# URL til JSON-filen
URL = "https://terjetheteacher.github.io/some-jokes/justJokes.json"

# Hent JSON-data fra URL
def hent_json(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print("Feil ved henting av data:", e)
        return None

# Vis første vits
def vis_vits_1(vitser):
    jokes = list(vitser.values())
    if jokes:
        print("\nVits nr. 1:")
        print(jokes[0])
    else:
        print("Fant ingen vitser.")

# Vis alle vitser
def vis_alle_vitser(vitser):
    print("\nAlle vitser:")
    for key, vits in vitser.items():
        print("-" * 40)
        print(f"vits{key}: {vits}")

# Vis en tilfeldig vits
def vis_tilfeldig_vits(vitser):
    if vitser:
        print("\nTilfeldig vits:")
        print(random.choice(list(vitser.values())))
    else:
        print("Ingen vitser tilgjengelig.")

# Hovedmeny
def meny(vitser):
    while True:
        print("\nMeny:")
        print("1: Vis første vits")
        print("2: Vis alle vitser")
        print("3: Vis en tilfeldig vits")
        print("4: Avslutt")
        valg = input("Velg et alternativ: ")

        if valg == "1":
            vis_vits_1(vitser)
        elif valg == "2":
            vis_alle_vitser(vitser)
        elif valg == "3":
            vis_tilfeldig_vits(vitser)
        elif valg == "4":
            print("Avslutter...")
            break
        else:
            print("Ugyldig valg, prøv igjen.")

# Kjør programmet
vitser = hent_json(URL)
if vitser:
    meny(vitser)
