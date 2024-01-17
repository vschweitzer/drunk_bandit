const wheels = 5;
const wheel_height = 5;
let run_anim = 0;
const animation_speed = 3.0;

// This needs a speed variable additional to the fps, 
// but i'm too tired right now.

const fps = 256;
const round_delay = 20;

let animation_frames = new Array(wheels).fill(1);
let indices = new Array(wheels).fill(0);

async function sleeb(mil) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("resolved");
        }, mil);
    });
}

// https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
function mod(n, m) {
    return ((n % m) + m) % m;
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
            quantity: 30,
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
    [
        "🍏",
        {
            name: "Apple Juice",
            quantity: 30,
        },
    ],
    [
        "💚",
        {
            name: "Lime Juice",
            quantity: 15,
        },
    ],
    [
        "🎱",
        {
            name: "Gin",
            quantity: 15,
        },
    ],
    [
        "🍓",
        {
            name: "Strawberry Juice",
            quantity: 30,
        },
    ],
    [
        "🍇",
        {
            name: "Cranberry Juice",
            quantity: 30,
        },
    ],
    [
        "🍑",
        {
            name: "Peach liqueur",
            quantity: 15,
        },
    ],
    [
        "🥭",
        {
            name: "Mango Juice",
            quantity: 30,
        },
    ],
    [
        "🍫",
        {
            name: "Creme de Cacao",
            quantity: 15,
        },
    ],
    [
        "🦌",
        {
            name: "Jägermeister",
            quantity: 15,
        },
    ],
    [
        "🔥",
        {
            name: "Fireball Whiskey",
            quantity: 15,
        },
    ],
    [
        "🌵",
        {
            name: "Mezcal",
            quantity: 15,
        },
    ],
    [
        "☕",
        {
            name: "Espresso",
            quantity: 30,
        },
    ],
    [
        "🧉",
        {
            name: "Club Mate",
            quantity: 30,
        },
    ],

    /* 
    // These entries are most likely terrible additions.
    [
        "🍅",
        {
            name: "Tomato Juice",
            quantity: 30,
        }
    ],
    [
        "💩",
        {
            name: "Baileys",
            quantity: 15,
        },
    ],
    [
        "🍾",
        {
            name: "Sparkling Wine",
            quantity: 30,
        }
    ],
    [
        "🍺",
        {
            name: "Beer",
            quantity: 30,
        }
    ],
    [
        "🍶",
        {
            name: "Sake",
            quantity: 30,
        }
    ]*/
]);

const KEYS = Array.from(SYMBOLS.keys());

class Cocktail {
    constructor(recipe) {
        // Takes a string of key indices
        this.ingredients = new Map();
        for (const index in recipe) {
            const i_index = index_from_value(recipe[index]);
            const key = KEYS[i_index];
            const ingredient = SYMBOLS.get(key);
            console.log(i_index);
            console.log(key);
            console.log(ingredient);

            if (this.ingredients.has(key)) {
                this.ingredients
                    .get(key)
                    .set(
                        "quantity",
                        this.ingredients.get(key).get("quantity") +
                            ingredient["quantity"]
                    );
            } else {
                this.ingredients.set(
                    key,
                    new Map([
                        ["name", ingredient["name"]],
                        ["quantity", ingredient["quantity"]],
                    ])
                );
            }
        }
    }

    to_html() {
        console.log(this.ingredients);

        let list = "<ul>\n";

        this.ingredients.forEach((value, key, map) => {
            list +=
                "<li>" +
                value.get("quantity") +
                "ml " +
                value.get("name") +
                "</li>\n";
        });

        list += "</ul>\n";
        return list;
    }
}

function get_value(key, a = KEYS) {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const index = a.findIndex((e) => {
        return e === key;
    });

    return alphabet[index];
}

function index_from_value(value) {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabet.search(value);
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
    const dir_rank = ["horizontal", "diagonal"];

    if (a[0].length > b[0].length) {
        return 1;
    }
    if (b[0].length > a[0].length) {
        return -1;
    }

    const a_props = a[1];
    const b_props = b[1];

    const a_rank = dir_rank.indexOf(a_props.get("direction"));
    const b_rank = dir_rank.indexOf(b_props.get("direction"));

    console.log("ranks" + a_rank + " " + b_rank);

    const a_offset = a_props.get("offset");
    const b_offset = b_props.get("offset");

    if (a_rank < b_rank) {
        return 1;
    }
    if (b_rank < a_rank) {
        return -1;
    }

    if (a_offset < b_offset) {
        return 1;
    }
    if (b_offset < a_offset) {
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

function get_symbols(width = wheels) {
    const sym = Array.from(SYMBOLS.keys());
    const mat = new Array(width);
    for (let i = 0; i < width; i++) {
        mat[i] = shuffleArray(sym);
    }

    return mat;
}

function create_slots(
    width = wheels,
    height = wheel_height,
    negative_fields = 1
) {
    const slot_div = get_slot_div();
    const mat = get_symbols(width);

    for (let i = 0; i < width; i++) {
        const slot = document.createElement("div");
        slot.classList.add("slot");
        slot.id = get_slot_id(i);
        slot_div.appendChild(slot);
        for (let j = -negative_fields; j < height; j++) {
            const field = document.createElement("div");
            field.classList.add("field");
            field.id = get_field_id(i, j);
            const index = mod(j, mat[i].length);
            const text = get_display_version(SYMBOLS, mat[i][index]);
            const val = get_value(mat[i][index]);

            field.innerText = text;
            field.setAttribute("value", val);
            slot.appendChild(field);
        }
    }

    return mat;
}

function create_offset_rules(width = wheels, initial_offset = -60) {
    const base_id = "offset_rule_";
    for (let i = 0; i < width; ++i) {
        const offset_rule = document.createElement("style");
        offset_rule.id = base_id + i;
        offset_rule.innerText =
            "#slots .slot:nth-child(" +
            (i + 1) +
            ") .field {top: " +
            initial_offset +
            "px;}";
        document.head.appendChild(offset_rule);
    }

    return base_id;
}

function set_offset_rule(index, offset, base_id = "offset_rule_") {
    const offset_rule = document.getElementById(base_id + index);
    offset_rule.innerText =
        "#slots .slot:nth-child(" +
        (index + 1) +
        ") .field {top: " +
        offset +
        "px;}";
}

function animate_wheel(
    mat,
    wheel_index,
    height = wheel_height,
    negative_fields = 1,
    fps = fps,
    field_height = 120,
) {
    const run = wheel_index >= run_anim;
    const animation_frame = animation_frames[wheel_index];
    const index = indices[wheel_index];

    if (run) {
        const field_offset =(field_height / fps * animation_frames[wheel_index]) - (field_height / 2);

        if (!mod(animation_frame, fps)) {
            const sym_len = mat[wheel_index].length;
            for (let i = -negative_fields; i < height; i++) {
                const sym_index =
                    (sym_len - (index % sym_len) + i + 1) % sym_len;
                const field_index = i;
                const field = document.getElementById(
                    get_field_id(wheel_index, field_index)
                );
                const key = mat[wheel_index][sym_index];
                field.innerText = get_display_version(SYMBOLS, key);
                const val = get_value(key);
                field.setAttribute("value", val);
            }

            indices[wheel_index] += 1;
        }

        set_offset_rule(wheel_index,  field_offset);
        animation_frames[wheel_index] = mod(animation_frames[wheel_index] + animation_speed, fps);
    }
}

function shift_wheel(
    mat,
    wheel_index,
    height = wheel_height,
    index = 0,
    negative_fields = 1
) {
    const sym_len = mat[wheel_index].length;

    for (let i = -negative_fields; i < height; i++) {
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

function read_wheel(width = wheels, height = wheel_height) {
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
                //console.log("chunk**", chunk);
            }
            if (str[i] !== str[i - 1]) {
                chunk = str[i];
            }
            if (chunk.length > longest.length) {
                longest = chunk;
            }
        }
    }
    //console.log(longest);
    return longest;
}

function get_scores(rmat) {
    let scores = score_horizontal(rmat);
    scores = scores.concat(score_diagonal(rmat));
    scores.sort(compare_scores);

    return scores;
}

function final_score(scores, min_length = 3) {
    const best_score = scores.sort(compare_scores).reverse()[0];
    console.log(scores);

    let str_repr = "";

    if (best_score[0].length < min_length) {
        str_repr = "No Win";
    } else {
        console.log(scores);
        console.log(best_score);
        for (const value of best_score[0]) {
            const index = index_from_value(value);
            const key = KEYS[index];
            const str = get_display_version(SYMBOLS, key);
            str_repr += str;
        }
    }

    display_score(str_repr);
    return best_score;
}

function display_score(text) {
    const scoreboard = document.getElementById("scoreboard");
    scoreboard.innerText = text;
}

function display_cocktails(cocktails) {
    const scoreboard = document.getElementById("cocktail");
    scoreboard.innerHTML = "";

    const nodes = cocktails.map((c) => c.to_html());
    console.log(nodes);
    const string = nodes.join("\n<p>☞ or ☜</p>\n");
    scoreboard.innerHTML = string;
    console.log("Cocktails: " + string);
}

function score_horizontal(rmat) {
    const reps = rmat.map((a, i) => {
        const offset = Math.abs(Math.round(wheels / 2) - i);
        return [
            longestRepetition(a.join("")),
            new Map([
                ["direction", "horizontal"],
                ["position", i],
                ["offset", offset],
            ]),
        ];
    });

    return reps;
}

function score_diagonal(rmat) {
    const rr = rot45(rmat);
    const rl = rot45(rmat, true);

    const res_r = rr.map((a, i) => {
        const offset = Math.abs(Math.round(rr.length / 2) - i) + rmat.length;
        return [
            longestRepetition(a.join("")),
            new Map([
                ["direction", "diagonal"],
                ["position", i],
                ["offset", offset],
            ]),
        ];
    });

    const res_l = rl.map((a, i) => {
        const offset = Math.abs(Math.round(rl.length / 2) - i) + rmat.length;
        return [
            longestRepetition(a.join("")),
            new Map([
                ["direction", "diagonal"],
                ["position", i],
                ["offset", offset],
            ]),
        ];
    });

    const all = res_r.concat(res_l);

    return all;
}

function get_cocktails(recipe_length, direction, position, min_length = 3) {
    const rmat = read_wheel();
    let lines = new Array();
    const cocktails = new Array();
    const height = rmat.length;
    const middle = Math.round(height / 2.0 + 0.1);

    if (recipe_length < min_length) {
        return cocktails;
    }

    if (direction === "diagonal") {
        lines.push(middle - 1);
    } else if (direction === "horizontal") {
        if (position + 1 === middle) {
            for (let i = 0; i < height; ++i) {
                if (i + 1 !== middle) {
                    lines.push(i);
                }
            }
        } else {
            if (position + 1 < middle) {
                for (let i = 0; i < middle; ++i) {
                    if (i !== position) {
                        lines.push(i);
                    }
                }
            } else if (position + 1 > middle) {
                for (let i = middle - 1; i < height; ++i) {
                    if (i !== position) {
                        lines.push(i);
                    }
                }
            }
        }
    }

    console.log("lines: ");
    console.log(lines);

    for (const line_index of lines) {
        const recipe = rmat[line_index].join("").slice(0, recipe_length);
        console.log("recipe " + recipe);
        cocktails.push(new Cocktail(recipe)); // TODO
    }

    return cocktails;
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
    const offset_rules_id = create_offset_rules();

    let first_run = wheels;
    await sleeb(1000);

    for (let i = 0; i < wheels; i++) {
        await sleeb(
            round_delay + round_delay * Math.random() * 5 * Math.random()
        );
        setInterval(
            animate_wheel,
            1000 / fps,
            ...[mat, i, wheel_height, 1, fps]
        );
    }
}

(async () => {
    sleeb(5);
    //console.log(JSON.stringify(JSON.stringify(SYMBOLS, replacer)));
    document.addEventListener("keyup", (e) => {
        run_anim = (run_anim + 1) % (wheels + 1);
        if (run_anim === wheels) {
            const scores = get_scores(read_wheel());
            const best_score = final_score(scores);
            const cocktails = get_cocktails(
                best_score[0].length,
                best_score[1].get("direction"),
                best_score[1].get("position")
            );
            console.log(cocktails);
            display_cocktails(cocktails);
        }
    });
    await _main();
})();
