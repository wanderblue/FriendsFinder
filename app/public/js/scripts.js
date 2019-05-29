function appendQuestions() {
	let q1 = "I enjoy riding a dragan.";
	let q2 = "I am not a lady.";
	let q3 = "I want to be a queen/king.";
	let q4 = "I can see the past.";
	let q5 = "I like the north.";
	let q6 = "I have dark hair .";
	let q7 = "I have seen a white walker.";
	let q8 = "I was sold by my brother.";
	let q9 = "I like the ending of Game of Throne.";
	let q10 = "I like the song of Ice and Fire.";
	let questionArray = [ q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 ];
	return questionArray;
}

var questions = appendQuestions();

$( "#questionDiv" ).append( '<div class="row"><div class="col-lg-12">' );
for ( var i = 0; i < questions.length; i++ ) {
	$( "#questionDiv" ).append( '<h3>Question ' + ( i + 1 ) + '</h3>' + '<p>' + questions[ i ] + '</p>' + '<select class="chosen-select dropList" id="q' + i + '">' + '<option value=""></option>' + '<option value="1">1 (Strongly Disagree)</option>' + '<option value="2">2</option>' + '<option value="3">3</option>' + '<option value="4">4</option>' + '<option value="5">5 (Strongly Agree)</option>' + '</select>' );
}

$( "#questionDiv" ).append( '<button type="submit" class="btn btn-primary" id="submitButton">Submit</button>' + '</div></div>' );
// Chosen Dropdown Setup
var config = {
	".chosen-select": {},
	".chosen-select-deselect": {
		allow_single_deselect: true
	},
	".chosen-select-no-single": {
		disable_search_threshold: 10
	},
	".chosen-select-no-results": {
		no_results_text: "Oops, nothing found!"
	},
	".chosen-select-width": {
		width: "95%"
	}
};


for ( var selector in config ) {
	$( selector ).chosen( config[ selector ] );
}


// User clicks the submit button
$( "#submitButton" ).on( "click", function( event ) {
	// Don't reload the page
	event.preventDefault();
	// Make sure all form elements were selected
	function userValidation() {
		// Start with correct validation
		let valid = true;
		if ( $( "#name" ).val() === "" ) {
			valid = false;
		}
		if ( $( "#image" ).val() === "" ) {
			valid = false;
		}
		// Check if yourImg begins with "http://" or "https://"
		if ( $( "#image" ).val().charAt( 4 ) !== ":" && $( "#image" ).val().charAt( 5 ) !== ":" ) {
			// If yourImg isn't "http://" or "https://", validation is incorrect
			valid = false;
		}
		// Check dropdown boxes for empty values (top values are always empty)
		$( ".chosen-select" ).each( function() {
    	if ( $( this ).val() === "" ) {
			// If a valid option has not been selected, validation is incorrect
	   		valid = false;
			}
			} );
		// This function will return true if validation is correct, false if not
		return valid;
	}
	// Move forward if validation is correct
	if ( userValidation() ) {
		
		// Store the user's scores
		var formscores = {
			"name": $( "#name" ).val().trim(),
			"photo": $( "#image" ).val().trim(),
			"scores":[
			// [2,2,2,2,2,2,2,2,2,2]
				parseInt( $( "#q0" ).val() ),
				parseInt( $( "#q1" ).val() ),
				parseInt( $( "#q2" ).val() ),
				parseInt( $( "#q3" ).val() ),
				parseInt( $( "#q4" ).val() ),
				parseInt( $( "#q5" ).val() ),
				parseInt( $( "#q6" ).val() ),
				parseInt( $( "#q7" ).val() ),
				parseInt( $( "#q8" ).val() ),
				parseInt( $( "#q9" ).val() )
			]
		};
		// POST to api/friends.
		fetch("/api/friends", {
			method: "POST",
			body: JSON.stringify(formscores),
			headers: {
			  'Content-Type': 'application/json'
	
		}
		  })
			.then(response => response.json())
			.then(data => {
	
			// Update the match modal with the correct name & image
			$( "#friendName" ).html( "<h2>" + data.name + "</h2>" );
			$( "#friendImg" ).attr( "src", data.photo );
			// Show the match modal
			$( "#matchModal" ).modal( "toggle" );
			})


         // Clear the form when submitting
		 $("#name").val('');
		 $("#image").val('');
	     
		  
    	// If the user validation failed
		}else {
		alert( "please finish all questions" );
        }

});
