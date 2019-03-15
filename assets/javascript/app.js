

// topics contains our initla set of search strings
var topics = [" Amateur Radio", "Cycling", "Archery", "Racing", "Skeet Shooting", "Motorcycles"];


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// On document Load()
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
jQuery(document).ready(function () {


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // renderButtons() - function to update search string buttons
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function renderButtons() {



    // clear the buttons view div
    $("#buttons-view").empty();

    // Iterate through all the topics
    for (let i = 0; i < topics.length; i++) {
      const topic = topics[i];

      // dynamically create search query button using jquery
      var button = "<button class='btn'>" + topic + "</button>"

      //$("#buttons-view").append("<button  class='btn'>" + topic + "</button>");
      $("#buttons-view").append(button);
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // renderPage() - function to update images on the page with our search results
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function renderPage() {

    // "this" keyword refers to the button that was clicked
    var topic = $(this).text();

    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      topic + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function (response) {
        // Storing an array of results in the results variable
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div for the gif
            var gifDiv = $("<div>");


            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var personImage = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item

            personImage.attr("data-animate", results[i].images.fixed_height.url);
            personImage.attr("data-still", results[i].images.fixed_height_still.url);
            personImage.attr("data-state", "animate");
            personImage.attr("src", results[i].images.fixed_height.url);
            personImage.attr("id", i);


            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(personImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#image-view").prepend(gifDiv);
          }
        }
      });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // $(document)- onClick event handler - calls render page to update UI
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $(document).on("click", ".btn", renderPage);



  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //$(add-topic) - onClick handler () creates new buttons with a new query string 
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $("#add-topic").on("click", function (e) {

    e.preventDefault();

    //  retrieve the search string(i.e. "topic")
    var topicInput = $("#topic-input").val();

    // push the topic into the topics array
    topics.push(topicInput);
    renderButtons();
    $(this).unbind(e);
  });

  // Calling the renderButtons function to display the initial list of movies
  renderButtons();

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // image-view() - onClick event handler which is used to stop/start the individual gifs
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $("#image-view").on("click" , function (event) {




    // // look at the event to determine which gif generated the event
    var animate = event.target.dataset.animate;
    var still = event.target.dataset.still;
    var state = event.target.dataset.state;

    var index = event.target.id;

    console.log(animate);
    console.log(still);
    console.log(index);

    if (state === "still") {
      $(`#${index}`).attr("src", animate);
      $(`#${index}`).attr("data-state", "animate");
    } else {
      $(`#${index}`).attr("src", still);
      $(`#${index}`).attr("data-state", "still");
    }
});
});