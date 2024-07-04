// https://familytraditionsserver.vercel.app/api/recipeBooks


const https = require('https');

let urlRecipeBooks = "https://familytraditionsserver.vercel.app/api/recipeBooks";


/* OPTION 1: */

// This is the function to get JSON data from a URL - the URL is the api call (route) to the server that returns the JSON data of what you're trying to get
function getJSON(url) {
    https.get(url,(res) => {
        let body = "";

        res.on("data", (chunk) => {
            body += chunk;
        });

        res.on("end", () => {
            try {
                let json = JSON.parse(body);
                // do something with JSON like rendering (can't use outside of this function)
                console.log("data saved\n");
            } catch (error) {
                console.error(error.message);
            };
        });

    }).on("error", (error) => {
        console.error(error.message);
    });
}

getJSON(urlRecipeBooks);


/* OPTION 2: */
https.get(url,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let json = JSON.parse(body);
            // do something with JSON like rendering (can't use outside of this function)
            console.log("data saved\n");
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});


/* OPTION 3: */

let options = {
    headers: {
        'User-Agent': 'Mozilla/5.0'
    }
};

// This is the function to get JSON data from a URL - the URL is the api call (route) to the server that returns the JSON data of what you're trying to get
function getJSON(url, options) {
    return new Promise((resolve, reject) => {
        https.get(url, options, (res) => {
            let body = "";

            res.on("data", (chunk) => {
                body += chunk;
            });

            res.on("end", () => {
                try {
                    let json = JSON.parse(body);
                    resolve(json);
                } catch (error) {
                    reject(error);
                };
            });

        }).on("error", (error) => {
            reject(error);
        });
    });
}

// This is the function template that you will use to call the getJSON function and store the data in a variable to use - you must use the data within this function - you can't use the data outside of this function. 
async function fetchAndLogData() {
    try {
        let recipeBooks = await getJSON(url, options);
        // do something with JSON like rendering - can use the data in only here this function, but at least it's not done in the actual http request function
        console.log("data saved in variable\n");
        console.log(recipeBooks);
        
    } catch (error) {
        console.error(error);
    }
}

fetchAndLogData();



/* basic get request code: */
// https.get(url, options, (res) => {
//     let body = "";

//     res.on("data", (chunk) => {
//         body += chunk;
//     });

//     res.on("end", () => {
//         try {
//             let json = JSON.parse(body);
//             // do something with JSON
//             console.log(("%j", json));
//         } catch (error) {
//             console.error(error.message);
//         };
//     });

// }).on("error", (error) => {
//     console.error(error.message);
// });

