// Global Variables
let validChars = 'abcdefghijklmnopqrstuvwxyz ABCDEFJHIJKLMNOPQRSTUVWXYZ';

// Event Listeners
/**
 * Checks if the input text fields have valid text.
 * Prevents the form from completing if any input is invalid.
 * Invalid input includes:
 *  Empty input fields
 *  Characters that aren't letters or spaces.
 */
document.querySelector('#form').addEventListener('submit', function(event) {
    let isValid = true;

    // Check if Font 1 is Valid
    let fontInput = document.querySelector("#font1").value;
    isValid = checkFont(fontInput);

    // Check if Font 2 is valid (if it exists)
    if(isValid && document.querySelector("#font2") != null) {
        let fontInput2 = document.querySelector("#font2").value;
        isValid = checkFont(fontInput2);
    }
    
    // Check if font(s) are valid
    if (!isValid) {
        document.querySelector("#formError").style.display = "inline";
        event.preventDefault();
    }
});

// Functions
/**
 * Checks if the given string is empty
 *  or contains characters that aren't lettes or spaces.
 * @param {String} str The string to check.
 * @returns True = is valid, False = is not valid
 */
function checkFont(str) {
    // Get error span
    let fontErr = document.querySelector('#formError');

    // Check font
    if (str == null || str == '') {
        fontErr.innerHTML = 'Please input a font in each form(s).';
        return false;
    } else if (containsInvalidChars(str)) {
        fontErr.innerHTML = 'Fonts must contain only letters and spaces.';
        return false
    }

    // Font is valid
    return true;
} // checkFont

/**
 * Checks if the given string contains invalid characters
 *  (characters that aren't letters or spaces).
 * @param {String} str The string to be checked
 * @returns True = contains invalid charcters, False = does not contain invalid characters.
 */
function containsInvalidChars(str) {
    // Loop through string
    for (let i = 0; i < str.length; i++) {
        if (!validChars.includes(str.charAt(i))) {
            // Return true if invalid character is found.
            return true;
        }
    } 

    // No invalid characters were found
    return false;
} // containsInvalidChars