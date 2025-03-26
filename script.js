// Cookies

/**
 * We don't want to store more cookies than are necessary, for longer than necessary
 * Privacy: the more data we store, the greater the chance something is compromised, or if something is compromised, the more data is stolen.
 * 
 * Performance: the more cookies we store, the more are sent with every http request made to the server that issued them.
 * 
 * Consent: We should get consent from the user for storing cookies.
 * 
 * Cookies are very often "scrambled" or stored in a way unreadable to the outside.
 */

/**
 * Sets a cookie for client-side storage
 * @param {string} name - the cookie key 
 * @param {any} value - the data that will be stored in the cookie 
 * @param {Number} days - the number of days that the cookie will be stored for 
 */
function setCookie(name, value, days) {
    // set the cookie
    // a cookie set without an expiration is a "session" cookie
    // a session lasts as long as a browser tab is open
    let expiration = "";

    // variables that are undefined evaluate to "false"
    // if days is undefined, do not add to the expiration string
    if(days) {
        const date = new Date();
        // get the current time, and add a number of milliseconds to it
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

        expiration = `; expires=${date.toUTCString()}`;
    }

    // either create a new cookie (if the name is not taken) or replace it if it is
    document.cookie = `${name}=${value}${expiration}`;
}

/**
 * Gets the value assigned to a browser cookie
 * @param {string} name - the key of the cookie
 */
// name=zach; cat=tuna; day=tues; . . .
function getCookie(name) {
    // how can we get a specific value from the cookie string?
    //return document.cookie
    return document.cookie.split("; ") // ["name=zach", "cat=tuna", "day=tues"]
        .find(str => { return str.startsWith(`${name}=`) }) //"cat=tuna" 
        ?.split("=")[1]; //"tuna"

    // ?.split: "optional chain": runs only if received value != null, undefined
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
}

/**
 * Remove a cookie with a given name. This will not produce any kind of message or error if the cookie does not exist
 * @param {string} name = key of cookie 
 */
function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
}

// LocalStorage and SessionStorage
// Cookies are usually treated as a small, short-term solution
// LocalStorage is usually for storing larger pieces of persistent data, and are not sent with HTTP requests
localStorage.setItem("username", "Zach M");

const terminatorFilms = [{title: "Terminator", year: 1984},
    {title: "Terminator 2", year: 1991}
];

// localStorage, like cookies, can only store strings
localStorage.setItem("terminatorFilms", JSON.stringify(terminatorFilms));

let retrievedFilms = JSON.parse(localStorage.getItem("terminatorFilms"));

localStorage.removeItem("terminatorFilms");
    
// sessionStorage is like localStorage but lasts until a session ends
sessionStorage.setItem("favouriteColour", "blue");
console.log(sessionStorage.getItem("favouriteColour"));
sessionStorage.removeItem("favouriteColour");