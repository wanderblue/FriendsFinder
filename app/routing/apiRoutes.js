// =============================================================
// API Routes
// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. 
// This route will also be used to handle the compatibility logic.

// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends")

module.exports = function(app, path) {


  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data
  // of all friends available)
  // ---------------------------------------------------------------------------
  app.get('/api/friends', function(req, res) {
    res.json(friendsData)
  })

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Our "server" will respond to requests and let users know if they have a match.
    // It will do this by sending out the value "true" 
    // req.body is available since we're using the body parsing middleware
    	// closest match object.
    var matchResult = []

    // string of JSON info
    // var postResponse = JSON.stringify(req.body);

	
    var friendsLib = friendsData
			
		    // Store the difference in values
		    var closestMatch = 0
		    var matchScore = 9999

    // Loop through the file to find the closest match
    var N = friendsLib.length
		    for (var i = 0; i < N; i++) {
      var totalDifference = 0


      // console.log('Saved!!!!!!!!!' + friendsLib[i].name);

      for (var j = 0; j < 10; j++) {
        var aa = req.body.scores[j]
	
        var bb = friendsLib[i].scores[j]

        // absolute value of the differences.
        totalDifference += Math.abs((parseInt(aa) - parseInt(bb)))
      }

      // If the space between the current listing is the closest to the user, 
      // update the closestMatch
      // The closest match will be the user with the least amount of difference.
      if(totalDifference <= matchScore) {
        matchScore = totalDifference
        closestMatch = i
		    	}
		    }

  			// Add new user
    friendsData.push(req.body)

    // Send appropriate response
		    matchResult.push(friendsLib[closestMatch])
   	    res.json(matchResult[0])
	
  })

}
