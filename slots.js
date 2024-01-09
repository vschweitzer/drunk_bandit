const wheels = 4;
let run_anim = 0;

async function sleeb(mil) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('resolved');
      }, mil);
    });
  }

async function _main() {
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
            "display": [0x2663, 0xFE0F],
            "quantity": 15,
        }],
        ["♦️", {
            "name": "Tequila",
            "display": [0x2666, 0xFE0F],
            "quantity": 15,
        }],
        ["♠️", {
            "name": "Vodka",
            "display": [0x2660, 0xFE0F],
            "quantity": 15,
        }],
        ["♥️", {
            "name": "Whiskey",
            "quantity": 15,
            "display": [0x2665, 0xFE0F],
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
        if(dict.get(key)["display"] !== undefined) {
            return String.fromCharCode(...dict.get(key)["display"]);
        } else {
            return key;
        }
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
            slot.id = get_slot_id(i);
            slot_div.appendChild(slot);
            for (let j = 0; j < height; j++) {
                const field = document.createElement("div");
                field.classList.add("field");
                field.id = get_field_id(i, j);
                const text = get_display_version(SYMBOLS, mat[i][j]);

                field.innerText = text;
                field.setAttribute("value", mat[i][j]);
                slot.appendChild(field);
            }
        }

        return mat;
    }

    function shift_wheel(mat, wheel_index, height = 5, index = 0) {
        const sym_len = mat[wheel_index].length;
        
        for(let i = 0; i < height; i++) {
            const sym_index = ((sym_len - (index % sym_len)) + i + 1) % sym_len;
            const field_index = i;        
            const field = document.getElementById(get_field_id(wheel_index, field_index));
            const key = mat[wheel_index][sym_index];
            field.innerText = get_display_version(SYMBOLS, key);
            field.setAttribute("value", key);
        }
    }

    
      
    
    const mat = create_slots(wheels);
    let index = 0;
    const iw_delay = 200;
    
    let first_run = true;
    await sleeb(1000);
    const round_delay = 20;
    while(true) {
        for(let i = run_anim; i < wheels; i++) {
            shift_wheel(mat, i, 5, index);
            if(first_run) {
                first_run = false;
                await sleeb(round_delay * Math.random() * Math.random() * 6);
            }

            await sleeb(round_delay);
        }
        await sleeb(100);
        index += 1;
    }
}

(async() => {
    
    sleeb(5);
    document.addEventListener('keyup', (e) => {
        run_anim = (run_anim + 1) % (wheels + 1);
    });
    await _main();

  })();