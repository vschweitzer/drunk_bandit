class Wheel {
    wheel_index = 0;
    fields = 0; 
    field_height = 0; // height per field in pixels

    constructor(wheel_index = 0, fields = 5, field_height = 120) {
        wheel_index = wheel_index;
        this.fields = fields;
        this.field_height = field_height;


    };

    animate() {
        /*
        Create list of cells/divs
        For each movement of a field, use .animate()
        Animate downward with time >0 (async)
        Wait until animation finishes or is interrupted by user
        
        If finished:
        > Swap symbol with field below
        > .animate() back up with time =0

        If interrupted:
        > Animate to snap into position
        > Stop

        */
    }
}













function create_slots(
    width = wheels,
    height = wheel_height,
    negative_fields = 1
) {
    const slot_div = get_slot_div();
    const mat = get_symbols(width);

    const arrows_left = get_arrow_column(false);
    const arrows_right = get_arrow_column(true);

    for (let a = 0; a < height; ++a) {
        arrows_left.appendChild(create_arrow_node(false, a));
        arrows_right.appendChild(create_arrow_node(true, a));
    }

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