// Add Event Listeners
// Updates the text styling within the font div.
document.querySelector('#style-select').addEventListener('change', updateStyle);

// Functions
/**
 * Update the text styling within the font div
 *  based on the select input value.
 */
function updateStyle() {
    // Get style and Font div
    let style = document.querySelector('#style-select').value;
    let div = document.querySelector("#font-div");

    // Update style
    switch(style) {
        case 'b':
            div.style.fontWeight = 'bold';
            div.style.fontStyle = 'normal';
            break;
        case 'i':
            div.style.fontWeight = 'normal';
            div.style.fontStyle = 'italic';
            break;
        case 'bi':
            div.style.fontWeight = 'bold';
            div.style.fontStyle = 'italic';
            break;
        default:
            div.style.fontWeight = 'normal';
            div.style.fontStyle = 'normal';
            break;
    }
}