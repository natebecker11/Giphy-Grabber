// Global Variables

  // API URL
  var giphyURL = 'https://api.giphy.com/v1/gifs/search?api_key=7hJ5lkwBZeB2hPC155fMmCXmVoMgsylI&limit=10&q=';

  // Array for buttons
  var btnArray = ['lions', 'tigers', 'bears', 'cheetahs', 'buffalo', 'panthers', 'donkeys',
'dogs', 'cats', 'hamsters', 'wolves', 'foxes', 'velociraptors','snuffleupagus']

// Global Functions



  // Function to make a button for every item in an array
  var renderButtons = function() {
    btnArray.forEach(function(element) {
      $('<button>')
        .addClass('button animal-btn')
        .attr('data-name', element)
        .text(element)
        .appendTo($('.button-container'))
    })
  }

  // Function to make an API call when a button is pressed
  var grabGifs = function(topic) {
    $.get({
      url: giphyURL + topic
    }).then(function(response) {
      var gifArray = response.data;
      gifArray.forEach(element => console.log(element));
    })
  }
  
  

  // Function to create and attach a div containing an image and information
  var popGifs = function() {};



// Call the function to populate the initial buttons
renderButtons();