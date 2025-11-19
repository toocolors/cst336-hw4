// Imports
import express from 'express';
import fetch from 'node-fetch';
const quote = await import('inspirational-quotes');

// Global Variables
const fontsUrl = 'https://fonts.googleapis.com/css?';
const loremUrl = 'https://lorem-api.com/api/lorem?paragraphs='

// Setup App
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
// Home
app.get('/', (req, res) => {
    res.render('index', {
        fontUrl: "",
        fontName: ""
    });
});

// Pick a Font
app.get('/font', (req, res) => {
    renderQuery(res, 'font');
});

// Weight and Styles
app.get('/styles', (req, res) => {
    // Get font url
    let fontUrl = fontsUrl + 'family=Open+Sans';

    renderSubmit(res, 'styles', 'Open Sans', fontUrl);
});

// Search
app.get('/search', (req, res) => {
    renderQuery(res, 'search');
});

// Compare
app.get('/compare', (req, res) => {
    renderQuery(res, 'compare');
});

// Submit Routes
// Submit
app.get('/submit-font', async(req, res) => {
    // Get parameters
    let fontName = req.query.font;

    // Reformat Parameters if needed
    let fontArg = replaceChar(fontName, '-', '+');
    fontName = replaceChar(fontName, '-', ' ');
    

    // Get Font URL
    let fontUrl = fontsUrl + 'family=' + fontArg;

    // Render Submit page
    renderSubmit(res, 'font', fontName, fontUrl);
});

app.get('/submit-search', async(req, res) => {
    // Get parameters
    let fontName = req.query.font;

    // Format parameters for font url
    let font = replaceChar(fontName, ' ', '+');

    // Get Font Url
    let fontUrl = fontsUrl + 'family=' + font;

    // Render Submit Page
    renderSubmit(res, 'search', fontName, fontUrl);
})

// Submit Comparison
app.get('/submit-compare', async(req, res) => {
    // get parameters
    let fontName1 = req.query.font1;
    let fontName2 = req.query.font2;

    // Reformat parameters for url
    let font1 = replaceChar(fontName1, ' ', '+');
    let font2 = replaceChar(fontName2, ' ', '+');

    // Get font url
    let fontUrl = fontsUrl + 'family=' + font1 + '|' + font2;

    // Get lorem
    let lorem = await getRandomText();

    // Render page
    res.render('compare', {
        fontName : fontName1,
        fontName2,
        fontUrl,
        quote: quote.getQuote(),
        lorem,
        displayClass: ''
    });
});

// Listen to port
app.listen(3000, () => {
    console.log('server started');
})


// Other Functions
/**
 * Gets random text from Lorem API.
 * @returns Random text.
 */
async function getRandomText() {
    let rand = Math.floor(Math.random() * 10) + 1;
    let response = await fetch(loremUrl + rand);
    return await response.text();
}

/**
 * Replaces all instances of char in a string with replaceChar.
 * @param {String} str The string to have characters replaced.
 * @param {Character} char The character to be replaced.
 * @param {Character} replaceChar The character to be replacing.
 * @returns The String will all instances of char replaced with replaceChar.
 */
function replaceChar(str, char, replaceChar) {
    // Replace Dashes
    while(str.includes(char)) {
        let index = str.indexOf(char);
        str = str.substring(0, index) + replaceChar + str.substring(index + 1, str.length);
    }

    // Return str
    return str;
} // replaceChar

/**
 * Displays a page that hasn't submitted a font.
 * Parts of the page that are related to the submitted font are hidden.
 * @param {*} res The variable used to render the page.
 * @param {*} dest The page to render.
 */
function renderQuery(res, dest) {
    // Render Page
    res.render(dest, {
        fontName: '',
        fontName2: '',
        fontUrl: '',
        quote: '',
        lorem: '',
        displayClass: 'hidden'
    })
} // renderQuery

/**
 * Displays a page after a font has been submitted.
 * @param {*} res The variable used to render the page.
 * @param {*} dest The page to render.
 * @param {*} fontName The name of the font submitted.
 * @param {*} fontUrl The Google Fonts url for the submitted font.
 */
async function renderSubmit(res, dest, fontName, fontUrl) {
    // Get random text
    let lorem = await getRandomText();

    // Render page
    res.render(dest, {
        fontName,
        fontUrl,
        quote: quote.getQuote(),
        lorem,
        displayClass: ''
    });
} // renderSubmit