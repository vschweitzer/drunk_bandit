function _main() {
    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    /* https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */

    function shuffleArray(a) {
        let array = new Array(...a);
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;
    }

    const SYMBOLS = new Map([
        ["🍋", {
            "name": "Lemon Juice",

            "quantity": 15, // ml
        }],
        ["🍊", {
            "name": "Orange Juice",

            "quantity": 30,
        }],
        ["🍍", {
            "name": "Pineapple Juice",

            "quanitity": 30,
        }], 
        ["♣️", {
            "name": "Rum",

            "quantity": 15,
        }],
        ["♦️", {
            "name": "Tequila",

            "quantity": 15,
        }],
        ["♠️", {
            "name": "Vodka",

            "quantity": 15,
        }],
        ["♥️", {
            "name": "Whiskey",
            "quantity": 15,
        }],
        ["💀", {
            "name": "Tonic",
            "quantity": 30,
        }],
        ["💩", {
            "name": "Baileys",
            "quantity": 15,
        }],
        ["🥥", {
            "name": "Coconut Syrup",
            "quantity": 15,
        }],
        ["🍭", {
            "name": "Simple Syrup",
            "quantity": 15,
        }]
    ]);

    function get_slot_div() {
        return document.getElementById("slots");
    }

    function get_symbols(width = 4) {
        const sym = Array.from(SYMBOLS.keys());
        const mat = new Array(width);
        for(let i = 0; i < width; i++) {
            mat[i] = shuffleArray(sym);
        }

        return mat;
    }

    function create_slots(width = 4, height = 5) {
        const slot_div = get_slot_div();
        const mat = get_symbols(width);

        for (let i = 0; i < width; i++) {
            const slot = document.createElement("div");
            slot.classList.add("slot");
            slot.id = "slot_" + String(i);
            slot_div.appendChild(slot);
            for (let j = 0; j < height; j++) {
                const field = document.createElement("div");
                field.classList.add("field");
                field.innerText = mat[i][j];
                slot.appendChild(field);
            }
        }
    }

    create_slots();
}

_main();