// Dependencies
// =============================================================
//require the basic npm packages: express and path
//npm install --save path

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');


// Sets up the Express App
// =============================================================
// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//````````````````````
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Static files
app.use(express.static('app/public'));
//````````````````

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

//require("./routes/apiRoutes")(app);
//require("./routes/htmlRoutes")(app);

require('./app/routing/apiRoutes.js')(app, path);
require('./app/routing/htmlRoutes.js')(app, path);


// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
    console.log("I\'m listening... on port " + PORT);
})