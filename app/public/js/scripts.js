/* eslint-disable no-undef */
function appendQuestions () {
  let q1 = 'I enjoy riding a dragan.'
  let q2 = 'I am not a lady.'
  let q3 = 'I want to be a queen/king.'
  let q4 = 'I can see the past.'
  let q5 = 'I like the north.'
  let q6 = 'I have dark hair .'
  let q7 = 'I have seen a white walker.'
  let q8 = 'I was sold by my brother.'
  let q9 = 'I like the ending of Game of Throne.'
  let q10 = 'I like the song of Ice and Fire.'
  let questionArray = [ q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 ]
  return questionArray
}

var questions = appendQuestions()

for (var i = 0; i < questions.length; i++) {
//  $( '#questionDiv' ).append( '<h3>Question ' + ( i + 1 ) + '</h3>' + '<p>' + questions[ i ] + '</p>' + '<select class="chosen-select dropList" id="q' + i + '">' + '<option value=""></option>' + '<option value="1">1 (Strongly Disagree)</option>' + '<option value="2">2</option>' + '<option value="3">3</option>' + '<option value="4">4</option>' + '<option value="5">5 (Strongly Agree)</option>' + '</select>' )
  var dlist = document.createElement('div')
  dlist.innerHTML = ('<h3>Question ' + (i + 1) + '</h3>' + '<p>' + questions[ i ] + '</p>' + '<select class="chosen-select dropList" id="q' + i + '">' + '<option value=""></option>' + '<option value="1">1 (Strongly Disagree)</option>' + '<option value="2">2</option>' + '<option value="3">3</option>' + '<option value="4">4</option>' + '<option value="5">5 (Strongly Agree)</option>' + '</select>')
  questionDiv.appendChild(dlist)
}
var button1 = document.createElement('div')
button1.innerHTML = ('<button type="submit" class="btn btn-primary" id="submitButton" >Submit</button>')
questionDiv.appendChild(button1)

// Chosen Dropdown Setup
var config = {
  '.chosen-select': {},
  '.chosen-select-deselect': {
    allow_single_deselect: true
  },
  '.chosen-select-no-single': {
    disable_search_threshold: 10
  },
  '.chosen-select-no-results': {
    no_results_text: 'Oops, nothing found!'
  },
  '.chosen-select-width': {
    width: '95%'
  }
}

for (var selector in config) {
  $(selector).chosen(config[ selector ])
}
// User clicks the submit button
// $( '#submitButton' ).on( 'click', function ( event ) {

document.getElementById('submitButton').addEventListener('click', function (event) {
  // Don't reload the page
  event.preventDefault()
  // Make sure all form elements were selected
  // Move forward if validation is correct
  // Store the user's scores
  var formscores = {
    'name': document.getElementById('name').value.trim(),
    'photo': document.getElementById('image').value.trim(),
    'scores': [
      // [2,2,2,2,2,2,2,2,2,2]
      parseInt(document.getElementById('q1').value),
      parseInt(document.getElementById('q2').value),
      parseInt(document.getElementById('q3').value),
      parseInt(document.getElementById('q4').value),
      parseInt(document.getElementById('q5').value),
      parseInt(document.getElementById('q6').value),
      parseInt(document.getElementById('q7').value),
      parseInt(document.getElementById('q8').value),
      parseInt(document.getElementById('q9').value),
      parseInt(document.getElementById('q0').value)
    ]
  }
  // POST to api/friends.
  fetch('/api/friends', {
    method: 'POST',
    body: JSON.stringify(formscores),
    headers: {
      'Content-Type': 'application/json'

    }
  })
    .then(response => response.json())
    .then(data => {
      // Update the match modal with the correct name & image

      document.getElementById('friendName').innerHTML = ('<h2>' + data.name + '</h2>')
      document.getElementById('friendImg').setAttribute('src', data.photo)
      // Show the match modal
      $('#matchModal').modal('toggle')
    })
  // Clear the form when submitting
  document.getElementById('name').value = ''
  document.getElementById('image').value = ''
})
/* eslint-enable no-undef */
