# The Drunk Bandit

A slot machine that lets you gamble for cocktail recipes (and for free!).

## How to Run

1. Clone or download this repository.
2. Unpack or unzip it if necessary.
3. Start `index.html` with a browser of your choice. It must support and have JavaScript enabled. Tested only on new versions of Firefox and Chrome.

## Usage Warning

 - The animation is very choppy, in case you are sensitive to flashing images.
 - It's probably still buggy.

## How Scoring Works

 - You have to align at least 3 equal symbols to win.
 - The longer your line, the more ingredients you get.
 - The orientation and position of your line will determine your cocktail choice(s).

## Customizing the Game

To add or remove ingredients, edit the global `SYMBOLS` map.
Each entry needs a key, a name and an amount (in milliliters).
Optionally, you can add an optional property called "display", which should be an array of utf-16 character codes.
If this property is not defined, the key is used to display the ingredient on the wheel.
To modify the speed of the wheels, edit `round_delay` in `_main`.
