class Wheel {
    wheel_index = 0;
    fields = 0;
    field_height = 0; // height per field in pixels
    container_id = "";
    wheel_id = "";
    animation = null;
    animation_iteration = 0;

    constructor(
        wheel_index = 0,
        fields = 5,
        field_height = 120,
        container_id = "slots"
    ) {
        wheel_index = wheel_index;
        this.fields = fields;
        this.field_height = field_height;
        this.container_id = container_id;
        this.wheel_id = "wheel_" + this.wheel_index;
        this.animation_iteration = 0;
    }

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

    get_field_id(i) {
        return this.wheel_id + "_" + i;
    }

    create_html(create_container = true) {
        let container = document.getElementById(this.container_id);
        if (typeof container === "undefined" || !container) {
            if (create_container) {
                container = document.createElement("div");
                container.setAttribute("id", this.wheel_id);
            } else {
                throw new Error(
                    'Wheel container (id: "' +
                        this.container_id +
                        '") does not exist'
                );
            }
        }

        for (let i = 0; i < this.fields; i++) {
            const field = document.createElement("div");
            container.appendChild(field);
            field.setAttribute("id", this.get_field_id(i));
            field.classList.add("pink"); // DEBUG
            field.innerText = i;
        }
        document.body.appendChild(container);
    }

    create_roll_animation(time_ms = 200, distance = "120px") {
        const wheel = document.getElementById(this.wheel_id);
        const shift_transform = [
            { transform: "translateY(0)" },
            { transform: "translateY(" + distance + ")" },
        ];
        const shift_timing = {
            duration: time_ms,
            iterations: 1,
        };

        const keyframes = new KeyframeEffect(wheel, shift_transform, shift_timing);
        this.animation = new Animation(keyframes);
    }

    start_animation() {
        this.animation.play();
    }

    animation_callback() {
        this.animation_iteration += 1;
        console.log(this.animation_iteration);
        if(this.animation_iteration < 100) {
            
            this.animation.play();
        }
    }
}

w = new Wheel(0, 3);
w.create_html();
w.create_roll_animation();

wheel_el = document.getElementById(w.wheel_id);
wheel_el.addEventListener('animationend', (e) => {
  console.log('Animation ended');
});

w.start_animation()
/*
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
*/
