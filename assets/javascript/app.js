var bandsArray = ["Fall Out Boy", "Neck Deep", "Bring Me The Horizon", "Beartooth", "Sleeping With Sirens"];

function displayBandsInfo() {

  var bands = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + bands + "&apikey=xdsTMTiOnCsW4sxISXAaZY794sQiqnIN";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    console.log(response);

    var results = response.data;

    for (var i = 0; i < results.length; i++) {

      var bandsDiv = $('<div>');
      var p = $('<p>');
      p.text(results[i].rating);
      var bandsImage = $('<img>');
      bandsImage.attr('src', results[i].images.fixed_height.url);
      bandsDiv.append(p);
      bandsDiv.append(bandsImage);
      bandsDiv.prependTo('#bands-view');
    }
  });

}

function renderButtons() {

  $("#buttons-view").empty();

  for (var i = 0; i < bandsArray.length; i++) {

    var a = $("<button>");
    a.addClass("band");
    a.attr("data-name", bandsArray[i]);
    a.text(bandsArray[i]);
    $("#buttons-view").append(a);
  }
}

$("#add-bands").on("click", function (event) {
  event.preventDefault();
  var band = $("#bands-input").val().trim();

  bandsArray.push(band);

  $('#bands-input').val('');

  renderButtons();

});

$(document).on("click", ".band", displayBandsInfo);

renderButtons();