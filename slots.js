function _main() {
    const SYMBOLS = [
        {
            "name": "Lemon Juice",
            "symbol": "🍋",
            "quantity": 15, // ml
        },
        {
            "name": "Orange Juice",
            "symbol": "🍊",
            "quantity": 30,
        },
        {
            "name": "Pineapple Juice",
            "symbol": "🍍",
            "quanitity": 30,
        }, {
            "name": "Rum",
            "symbol": "♣️",
            "quantity": 15,
        },
        {
            "name": "Tequila",
            "symbol": "♦️",
            "quantity": 15,
        },
        {
            "name": "Vodka",
            "symbol": "♠️",
            "quantity": 15,
        },
        {
            "name": "Whiskey",
            "symbol": "♥️",
            "quantity": 15,
        },
        {
            "name": "Tonic",
            "symbol": "💀",
            "quantity": 30,
        },
        {
            "name": "Baileys",
            "symbol": "💩",
            "quantity": 15,
        }
    ]
    
    function get_slot_div() {
        return document.getElementById("slots");
    }

    function create_slots(width = 4, height = 5) {
        const slot_div = get_slot_div();
        for(let i = 0; i < width; i++) {
            const slot = document.createElement("div");
            slot.classList.add("slot");
            slot.id = "slot_" + String(i);
            slot_div.appendChild(slot);
            for(let j = 0; j < width; j++) {
                const field = document.createElement("div");
                field.classList.add("field");
                field.innerText = "🍍";
                slot.appendChild(field);
            }
        }
    }

    create_slots();
}

_main();