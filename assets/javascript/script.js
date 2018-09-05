// Global Variables

  // API URL
  var giphyURL = 'https://api.giphy.com/v1/gifs/search?api_key=7hJ5lkwBZeB2hPC155fMmCXmVoMgsylI&limit=10&q=';

  // Array for buttons
  var btnArray = ['lions', 'tigers', 'bears', 'cheetahs', 'buffalo', 'panthers', 'donkeys',
'dogs', 'cats', 'hamsters', 'wolves', 'foxes', 'velociraptors','snuffleupagus']

// Global Functions

$(document).ready(function() {

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
      console.log(response.data);
      gifArray.forEach(element => popGifs(element.images.downsized_still.url, element.images.downsized_medium.url, element.rating));
      // gifArray.forEach(element => console.log(element.images.downsized_small.url));

    })
  }
  
  

  // Function to create and attach a div containing an image and rating
  var popGifs = function(image1, image2, rating) {
    // create an empty div
    var gifBox = $('<div>')
      .addClass('gif-box');
    // append the supplied rating and image
    $('<label> Rating: ' + rating + '</>')
      .addClass('gif-box-label')
      .appendTo(gifBox);
    $('<img>')
      .attr({
        'src': image1,
        'still-src' : image1,
        'move-src': image2
      })
      .addClass('gif-box-img gif-box-still')
      .appendTo(gifBox);
    // append that div to the gif area
    gifBox.appendTo($('.content-container'));
  };

  // event listener for content buttons
  $(document).on('click', '.animal-btn', function() {
    $('.gif-box').remove();
    grabGifs($(this).attr('data-name'));
  })

  // event listener to play gifs on click
  $(document).on('click', '.gif-box-still', function() {
    $(this)
      .removeClass('gif-box-still')
      .addClass('gif-box-moving')
      .attr('src', $(this).attr('move-src'))
  })

  // event listener to pause playing gifs on click
  $(document).on('click', '.gif-box-moving', function() {
    $(this)
      .removeClass('gif-box-moving')
      .addClass('gif-box-still')
      .attr('src', $(this).attr('still-src'))
  })

  // event listener for the submit button
  $(document).on('click', '#submitButton', function() {
    var search = $('#animalInput').val().trim();
    if (search && !btnArray.includes(search.toLowerCase())) {      
      btnArray.push(search.toLowerCase());
      $('.button-container').empty();
      renderButtons();
    }
  })

  // Call the function to populate the initial buttons
  renderButtons();
})