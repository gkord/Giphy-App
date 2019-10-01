const app = {};

app.key = "qDc1DemYaBVwORoaa5zyODoEnhE4DDk7";
//Spit data back out on page
app.displayGifs = gifs => {
  // console.log("In display gifs: ", gifs)
  // Loop over an array
  gifs.forEach(function(gif) {
    // console.log("Gif title: ", gif.title);
    // console.log("Gif image: ", gif.images.original_still.url);

    const gifHTML = `<div class="gif-box">
                            <div class="img-box">
                                <img src="${gif.images.original_still.url}" alt="">
                            </div>
                            <p class="gif-title">${gif.title}</p>
                        </div>
                        `;
    $(".results").append(gifHTML);
  });
};
//Make an API call
app.getGifs = query => {
  console.log("Getting gifs...");
  console.log("Query in getGifs: ", query);
  $.ajax({
    url: `https://api.giphy.com/v1/gifs/search`,
    method: "GET",
    dataType: "json",
    data: {
      api_key: app.key,
      q: query
    }
  }).then(res => {
    console.log("Result of getGifs", res.data[0].images.original_still.url);
    const gifArray = res.data;
    // Once we have gifs, display gifs to page
    app.displayGifs(gifArray);
    console.log("Result of: getGifs: ", gifArray);
  });
};

app.init = () => {
  console.log("App initialized...");
  //Get input value from User
  //add form event listener
  $("form").on("submit", function(e) {
    e.preventDefault();
    //Empty out results container with each search
    $(".results").empty();
    console.log("Form submitted...");

    const userInput = $('input[type="text"]').val();
    app.getGifs(userInput);
  });
};

// Document ready
$(() => {
  console.log("Document ready...");
  // Initialize app
  app.init();
});
