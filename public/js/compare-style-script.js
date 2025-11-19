// Add Event Listeners
// Updates the text styling on the left side.
document.querySelector('#style-select').addEventListener('change', function() {
    // Get Style and Div
    let style = document.querySelector('#style-select').value;
    let div = document.querySelector("#font-div");

    // Call updateStyle
    updateStyle(style, div);
});

// Updates the text styling on the right side.
document.querySelector('#style-select2').addEventListener('change', function() {
    // Get Style and Div
    let style = document.querySelector('#style-select2').value;
    let div = document.querySelector("#font-div2");

    // Call updateStyle
    updateStyle(style, div);
});

// Functions
/**
 * Updates the styling of one of the font-divs on the page.
 * @param {String} style The style to apply.
 * @param {DOM Element} div The div to apply the style to.
 */
function updateStyle(style, div) {
    // Get style and Font div
    

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