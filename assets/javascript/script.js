// Global Variables

  // API URL
  var giphyURL = 'https://api.giphy.com/v1/gifs/search?api_key=7hJ5lkwBZeB2hPC155fMmCXmVoMgsylI&limit=10&q=';

  // Array for buttons
  var btnArray = ['javier baez', 'kris bryant', 'anthony rizzo', 'ernie banks', 'david ross', 'bill murray', 'jon lester', 'sammy sosa', 'kyle schwarber', 'jason heyward', 'ben zobrist', 'willson contreras', 'addison russell', 'kyle hendricks']

// Global Functions

$(document).ready(function() {

  // Function to make a button for every item in an array
  var renderButtons = function() {
    btnArray.forEach(function(element) {
      $('<button>')
        .addClass('button content-btn')
        .attr('data-name', element)
        .text(element)
        .appendTo($('.button-container'))
    })
  }

  // Function to make an API call when a button is pressed
  var grabGifs = function(topic) {
    $.get({
      url: giphyURL + topic + ' cubs'
    }).then(function(response) {
      var gifArray = response.data;
      console.log(response.data);
      gifArray.forEach(element => popGifs(element.images.fixed_width_still.url, element.images.fixed_width.url, element.rating, element.title));
    })
  }
  // Function to create and attach a div containing an image and rating
  var popGifs = function(image1, image2, rating, title) {
    // create an empty div
    var gifBox = $('<div>')
      .addClass('gif-box');
    // append the supplied rating 
    $('<label> Rating: ' + rating.toUpperCase() + ' </>')
      .addClass('gif-box-label')      
      .appendTo(gifBox);
    // append the supplied image
    $('<img>')
      .attr({
        'src': image1,
        'still-src' : image1,
        'move-src': image2
      })
      .addClass('gif-box-img gif-box-still')
      .appendTo(gifBox);
    // create a favorite icon
    var icon = $('<i class="fa-heart fa-lg gif-box-fav"> </i>')
      // store relevant info to be stored on icon click 
      // TODO: to reduce redundancy, store all this on the img element 
      // TODO: and point corresponding functions there
      .attr({
        'move-src': image2,
        'still-src': image1,
        'rating': rating.toUpperCase(),
        'data-title': title,
        'title': 'Add To Favorites'
      });
    // check whether the gif is already favorited
    if (localStorage[title]) {
      // if it is, render a solid heart and add the correct class
      icon.addClass('yes-selected fas');
    }
    else {
      // render an empty heart and add the correct class
      icon.addClass('not-selected far')
    }
    icon.appendTo(gifBox);
    // append that div to the gif area
    gifBox.appendTo($('.content-container'));
  };

  // event listener for content buttons
  $(document).on('click', '.content-btn', function() {
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
    var search = $('#contentInput').val().trim();
    // // control for extra-long inputs REMOVED no longer needed
    // if (search.length > 12) {
    //   $('#contentInput').val('').attr('placeholder', '12 Characters! For Real!');
    // } else
    // make sure a search term is entered and that it's not already a button
     
    if (search && !btnArray.includes(search.toLowerCase())) {      
      btnArray.push(search.toLowerCase());
      $('#contentInput').val('');
      $('.button-container').empty();
      renderButtons();
    }
  })

  // event listener to replace placeholder on click
  $(document).on('click', '#contentInput', function() {
    $(this).attr('placeholder', '');
  })

  // event listener to change the look of fav icons on hover
  $(document).on('mouseenter', '.gif-box-fav', function() {
    if ($(this).hasClass('not-selected')) {
      $(this).addClass('fas').removeClass('far');
    }
  })
  $(document).on('mouseleave', '.gif-box-fav', function() {
    if ($(this).hasClass('not-selected')) {
      $(this).addClass('far').removeClass('fas');
    }    
  })

  // event listener to store a favorite gif
  $(document).on('click', '.gif-box-fav', function() {
    // grab the title from the html
    var title = $(this).attr('data-title');
    // check ensure its not already a favorite
    if ($(this).hasClass('not-selected')) {
      // create a JSON string to describe the image      
      var storedImage = JSON.stringify({
        stillURL: $(this).attr('still-src'),
        moveURL: $(this).attr('move-src'),
        rating: $(this).attr('rating'),
        desc: title
      });
      // add that string to local storage with the title as the key
      localStorage.setItem(title, storedImage);
      // change the icon to indicate the item is a favorite
      $(this)
        .addClass('yes-selected')
        .removeClass('not-selected')
        .attr('title', 'Remove From Favorites');
    // if it IS already a favorite
    } else {
      // delete it from local storage     
      localStorage.removeItem(title)
      // change the icon back to default
      $(this)
        .addClass('not-selected')
        .removeClass('yes-selected')
        .attr('title', 'Add To Favorites');
    }
  })

  // event listener to display favorite gifs
  $(document).on('click', '#favoritesButton', function() {
    // clear displayed gifs
    $('.gif-box').remove();
    // get the titles of the favorited gifs, which are also their keys
    var storageKeys = Object.keys(localStorage);
    // use the keys to build a button for each
    storageKeys.forEach(function(element) {
      var gifInfo = JSON.parse(localStorage[element]);      
      popGifs(gifInfo['stillURL'], gifInfo['moveURL'], gifInfo['rating'], gifInfo['desc'])
    })    
  })

  // Call the function to populate the initial buttons
  renderButtons();
})