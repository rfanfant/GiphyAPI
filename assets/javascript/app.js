
jQuery(document).ready(function () {

  // Created an object containing topics
  var topics = [" Amateur Radio", "Cycling", "Archery", "Racing", "Skeet Shooting", "Motorcycles"];

  // Function for displaying topic button
  function renderButtons() {


    // clear the buttons view div
    $("#buttons-view").empty();

    // YOUR CODE GOES HERE
    for (let i = 0; i < topics.length; i++) {
      const topic = topics[i];

      // dynamically create movie button using jquery
      var button = "<button class='btn'>" + topic + "</button>"
      console.log(button);

      //$("#buttons-view").append("<button  class='btn'>" + topic + "</button>");
      $("#buttons-view").append(button);

    }
  }

  // This function handles events where one button is clicked
  $("#add-topic").on("click", function () {
    e.preventDefault();
    // YOUR CODE GOES HERE

    // grab the name of the button from the button clicked
    // how do we grab the value of the button clicked using jquery
    // javascript 
    // var topicInput = document.getElementById("movie-input").value;

    // jquery
    var topicInput = $("<button class='btn'>").val();
    console.log("Topic INPUT: ", topicInput);


    // push movieInput into the movies array
    topics.push(topicInput);
    renderButtons();
  });

  // Calling the renderButtons function to display the initial list of movies
  renderButtons();



  function renderPage() {

    // In this case, the "this" keyword refers to the button that was clicked

    var topic = $(this).text();
    console.log(topic);

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
            personImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(personImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#image-view").prepend(gifDiv);
          }
        }
      });




  }
  // Event listener for all button elements
  $(document).on("click", ".btn", renderPage)
  // {
  //   renderPage();
  // }

});


// <body>
// {/* 
// //   <img src="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-still="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-animate="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" data-state="still" class="gif">
// //   <img src="https://media2.giphy.com/media/8rFQp4kHXJ0gU/200_s.gif" data-still="https://media2.giphy.com/media/8rFQp4kHXJ0gU/200_s.gif" data-animate="https://media2.giphy.com/media/8rFQp4kHXJ0gU/200.gif" data-state="still" class="gif">
// //   <img src="https://media3.giphy.com/media/W6LbnBigDe4ZG/200_s.gif" data-still="https://media3.giphy.com/media/W6LbnBigDe4ZG/200_s.gif" data-animate="https://media3.giphy.com/media/W6LbnBigDe4ZG/200.gif" data-state="still" class="gif">
// //   <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
// //   <script type="text/javascript">
// //     {/* $(".gif").on("click", function() {
// //       // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
// //       var state = $(this).attr("data-state");
// //       // If the clicked image's state is still, update its src attribute to what its data-animate value is.
// //       // Then, set the image's data-state to animate
// //       // Else set src to the data-still value
// //       if (state === "still") {
// //         $(this).attr("src", $(this).attr("data-animate"));
// //         $(this).attr("data-state", "animate");
// //       } else {
// //         $(this).attr("src", $(this).attr("data-still"));
// //         $(this).attr("data-state", "still");
// //       }
// //     });


// // $(".gif").on("click", function() {
// //         // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
// //         var state = $(this).attr("data-state");
// //         // If the clicked image's state is still, update its src attribute to what its data-animate value is.
// //         // Then, set the image's data-state to animate
// //         // Else set src to the data-still value
// //         if (state === "still") {
// //           $(this).attr("src", $(this).attr("data-animate"));
// //           $(this).attr("data-state", "animate");
// //         } else {
// //           $(this).attr("src", $(this).attr("data-still"));
// //           $(this).attr("data-state", "still");
// //         }
// //       }); */}
// //   </script> */}
// </body>
 //</html>
