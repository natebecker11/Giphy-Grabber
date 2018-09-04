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
      gifArray.forEach(element => popGifs(element.images.downsized_still.url, element.rating));
    })
  }
  
  

  // Function to create and attach a div containing an image and rating
  var popGifs = function(image, rating) {
    // create an empty div
    var gifBox = $('<div>').addClass('gif-box');
    // append the supplied rating and image
    $('<label> Rating: ' + rating + '</>').addClass('gif-box-label').appendTo(gifBox);
    $('<img>').attr('src', image).addClass('gif-box-img').appendTo(gifBox);
    // append that div to the gif area
    gifBox.appendTo($('.content-container'));
  };



// Call the function to populate the initial buttons
renderButtons();