import json
import requests
import random

# URL to the JSON file containing jokes
URL = "https://terjetheteacher.github.io/some-jokes/justJokes.json"


def get_jokes():
    response = requests.get(URL)
    if response.status_code == 200:
        jokes = response.json()
        return jokes
    else:
        print("Failed to retrieve jokes.")
        return {}


def show_specific_joke(jokes, joke_number, favorites):
    if 1 <= joke_number <= len(jokes):
        joke = jokes[joke_number - 1]
        print(f"\nJoke {joke_number}: {joke}")
        favorite = input("Press 'f' to favorite this joke or Enter to continue: ").lower()
        if favorite == "f":
            if joke not in favorites:
                favorites.append(joke)
                print("Joke added to favorites!")
            else:
                print("Joke is already in favorites.")
    else:
        print(f"Joke number {joke_number} does not exist.")


def show_all_jokes(jokes, favorites):
    print("\nAll jokes:")
    for i, joke in enumerate(jokes, start=1):
        print(f"Joke {i}: {joke}")
        favorite = input("Press 'f' to favorite this joke or Enter to continue: ").lower()
        if favorite == "f":
            if joke not in favorites:
                favorites.append(joke)
                print("Joke added to favorites!")
            else:
                print("Joke is already in favorites.")


def show_random_joke(jokes, favorites):
    random_joke = random.choice(jokes)
    print(f"\nRandom Joke: {random_joke}")
    favorite = input("Press 'f' to favorite this joke or Enter to continue: ").lower()
    if favorite == "f":
        if random_joke not in favorites:
            favorites.append(random_joke)
            print("Joke added to favorites!")
        else:
            print("Joke is already in favorites.")


def show_favorites(favorites):
    if favorites:
        print("\nYour Favorite Jokes:")
        for i, joke in enumerate(favorites, start=1):
            print(f"Favorite {i}: {joke}")
    else:
        print("\nYou have no favorite jokes yet.")


def menu(jokes):
    favorites = []  # List to store favorited jokes
    while True:
        print("\nMenu:")
        print("1. Show a specific joke (1-12)")
        print("2. Show all jokes")
        print("3. Show a random joke")
        print("4. View favorite jokes")
        print("5. Exit")
        choice = input("Choose an option (1-5): ")

        if choice == "1":
            try:
                joke_number = int(input("Enter the joke number (1-12): "))
                show_specific_joke(jokes, joke_number, favorites)
            except ValueError:
                print("Invalid input. Please enter a number.")
        elif choice == "2":
            show_all_jokes(jokes, favorites)
        elif choice == "3":
            show_random_joke(jokes, favorites)
        elif choice == "4":
            show_favorites(favorites)
        elif choice == "5":
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")


# Main program
vitser = get_jokes()
jokes = list(vitser.values())
menu(jokes)