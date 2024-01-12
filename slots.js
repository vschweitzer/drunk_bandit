const wheels = 4;
let run_anim = 0;

async function sleeb(mil) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("resolved");
        }, mil);
    });
}

const SYMBOLS = new Map([
    [
        "🍋",
        {
            name: "Lemon Juice",

            quantity: 15, // ml
        },
    ],
    [
        "🍊",
        {
            name: "Orange Juice",
            quantity: 30,
        },
    ],
    [
        "🍍",
        {
            name: "Pineapple Juice",

            quanitity: 30,
        },
    ],
    [
        "♣️",
        {
            name: "Rum",
            display: [0x2663, 0xfe0f],
            quantity: 15,
        },
    ],
    [
        "♦️",
        {
            name: "Tequila",
            display: [0x2666, 0xfe0f],
            quantity: 15,
        },
    ],
    [
        "♠️",
        {
            name: "Vodka",
            display: [0x2660, 0xfe0f],
            quantity: 15,
        },
    ],
    [
        "♥️",
        {
            name: "Whiskey",
            quantity: 15,
            display: [0x2665, 0xfe0f],
        },
    ],
    [
        "💀",
        {
            name: "Tonic",
            quantity: 30,
        },
    ],
    [
        "💩",
        {
            name: "Baileys",
            quantity: 15,
        },
    ],
    [
        "🥥",
        {
            name: "Coconut Syrup",
            quantity: 15,
        },
    ],
    [
        "🍭",
        {
            name: "Simple Syrup",
            quantity: 15,
        },
    ],
]);

const KEYS = Array.from(SYMBOLS.keys());

function get_value(key, a = KEYS) {
    return a.findIndex((e) => {
        return e === key;
    });
}

class Cocktail {
    insert(ingredient) {
        const key = get_value(ingredient);
        if (this.ingredients.has(key)) {
            this.ingredients
                .get(key)
                .set("quantity", this.ingredients.get("quantity") + 1);
        } else {
            this.ingredients.set(key, new Map());
            this.ingredients.get(key).set("quantity", 1);
        }
    }

    constructor(recipe) {
        this.ingredients = new Map();
        for (const index in recipe) {
            const ingredient = recipe[index];
            this.insert(ingredient);
        }
    }

    to_string() {
        let string = "";
        const i = this.ingredients;

        for (const key in i) {
            string += "";
        }
    }
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
/* https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */

function shuffleArray(a) {
    let array = new Array(...a);
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

function rot45(array, reverse = false) {
    const arr = Array.from(array);
    if (reverse) {
        for (const index in arr) {
            arr[index].reverse();
        }
    }

    let summax = arr.length + arr[0].length - 1; // max index of diagonal matrix
    let rotated = []; // initialize to an empty matrix of the right size
    for (let i = 0; i < summax; ++i) rotated.push([]);
    // Fill it up by partitioning the original matrix.
    for (let j = 0; j < arr[0].length; ++j)
        for (let i = 0; i < arr.length; ++i) rotated[i + j].push(arr[i][j]);

    return rotated;
}

function compare_scores(a, b) {
    if (a === b) {
        return 0;
    }
    if (a === undefined) {
        return -1;
    }
    if (b === undefined) {
        return 1;
    }

    if (a[0].length > b[0].length) {
        return 1;
    }
    if (b[0].length > a[0].length) {
        return -1;
    }

    if (a[1] < b[1]) {
        return 1;
    }
    if (a[1] > b[1]) {
        return -1;
    }

    return 0;
}

function get_slot_id(wheel) {
    return "slot_" + wheel;
}

function get_field_id(wheel, field) {
    return "slot_" + wheel + "_field_" + field;
}

function get_slot_div() {
    return document.getElementById("slots");
}

function get_display_version(dict, key) {
    if (dict.get(key)["display"] !== undefined) {
        return String.fromCharCode(...dict.get(key)["display"]);
    } else {
        return key;
    }
}

function get_symbols(width = 4) {
    const sym = Array.from(SYMBOLS.keys());
    const mat = new Array(width);
    for (let i = 0; i < width; i++) {
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
        slot.id = get_slot_id(i);
        slot_div.appendChild(slot);
        for (let j = 0; j < height; j++) {
            const field = document.createElement("div");
            field.classList.add("field");
            field.id = get_field_id(i, j);
            const text = get_display_version(SYMBOLS, mat[i][j]);
            const val = get_value(mat[i][j]);

            field.innerText = text;
            field.setAttribute("value", val);
            slot.appendChild(field);
        }
    }

    return mat;
}

function shift_wheel(mat, wheel_index, height = 5, index = 0) {
    const sym_len = mat[wheel_index].length;

    for (let i = 0; i < height; i++) {
        const sym_index = (sym_len - (index % sym_len) + i + 1) % sym_len;
        const field_index = i;
        const field = document.getElementById(
            get_field_id(wheel_index, field_index)
        );
        const key = mat[wheel_index][sym_index];
        field.innerText = get_display_version(SYMBOLS, key);
        const val = get_value(key);
        field.setAttribute("value", val);
    }
}

function read_wheel(width = 4, height = 5) {
    const rmat = new Array(height);
    for (let i = 0; i < height; i++) {
        rmat[i] = new Array(width);
        for (let j = 0; j < width; j++) {
            rmat[i][j] = document
                .getElementById(get_field_id(j, i))
                .getAttribute("value");
        }
    }

    return rmat;
}

// https://stackoverflow.com/questions/58573919/longest-repeating-character-in-string-javascript
function longestRepetition(str) {
    if (str.length === 0) {
        return ["", 0];
    }
    let longest = "";
    let chunk = "";
    for (let i = 0; i < str.length; i++) {
        if (i === 0) {
            if (str[i] === str[i + 1]) {
                chunk += str[i];
            }
        }
        if (i > 0) {
            if (str[i] === str[i - 1]) {
                chunk += str[i];
                console.log("chunk**", chunk);
            }
            if (str[i] !== str[i - 1]) {
                chunk = str[i];
            }
            if (chunk.length > longest.length) {
                longest = chunk;
            }
        }
    }
    console.log(longest);
    return longest;
}

function get_scores(rmat) {
    let scores = score_horizontal(rmat);
    scores = scores.concat(score_vertical(rmat));
    scores.sort(compare_scores).reverse();

    return scores;
}

function final_score(scores, min_length = 3) {
    const best_score = scores.sort(compare_scores).reverse()[0];

    let str_repr = "";

    if (best_score[0].length < min_length) {
        str_repr = "No Win";
    } else {
        for (const index of best_score[0]) {
            const key = KEYS[index];
            const str = get_display_version(SYMBOLS, key);
            str_repr += str;
        }
    }

    display_score(str_repr);
    return str_repr;
}

function display_score(text) {
    const scoreboard = document.getElementById("scoreboard");
    scoreboard.innerText = text;
}

function score_horizontal(rmat) {
    const reps = rmat.map((a, i) => {
        const offset = Math.abs(Math.round(wheels / 2) - i);
        return [longestRepetition(a.join("")), offset];
    });

    return reps;
}

function score_vertical(rmat) {
    const rr = rot45(rmat);
    const rl = rot45(rmat, true);

    const res_r = rr.map((a, i) => {
        const offset = Math.abs(Math.round(rr.length / 2) - i) + rmat.length;
        return [longestRepetition(a.join("")), offset];
    });

    const res_l = rl.map((a, i) => {
        const offset = Math.abs(Math.round(rr.length / 2) - i) + rmat.length;
        return [longestRepetition(a.join("")), offset];
    });

    const all = res_r.concat(res_l);
    console.log("Vertical");
    console.log(all);

    return all;
}

function get_cocktails(offset) {
    const rmat = read_wheel();
    let start;
    let length;
    const cocktails = new Array();
    const height = rmat.length;

    if (!offset) {
        start = 0;
        length = height;
    } else {
        const center = Math.round(height / 2.0);
        length = 1;
        start = center;
    }

    for (let i = start; i < start + length; i++) {
        cocktails.push(); // TODO
    }
}

// https://stackoverflow.com/questions/29085197/how-do-you-json-stringify-an-es6-map
function replacer(key, value) {
    if (value instanceof Map) {
        return {
            dataType: "Map",
            value: Array.from(value.entries()), // or with spread: value: [...value]
        };
    } else {
        return value;
    }
}

async function _main() {
    const mat = create_slots(wheels);
    let index = 0;

    let first_run = wheels;
    await sleeb(1000);
    const round_delay = 20;
    while (true) {
        for (let i = run_anim; i < wheels; i++) {
            shift_wheel(mat, i, 5, index);
            if (first_run) {
                --first_run;
                await sleeb(round_delay * Math.random() * 5 * Math.random());
            }

            await sleeb(round_delay);
        }
        await sleeb(100);
        index += 1;
    }
}

(async () => {
    sleeb(5);
    //console.log(JSON.stringify(JSON.stringify(SYMBOLS, replacer)));
    document.addEventListener("keyup", (e) => {
        run_anim = (run_anim + 1) % (wheels + 1);
        if (run_anim === wheels) {
            const scores = get_scores(read_wheel());
            final_score(scores);
        }
    });
    await _main();
})();
