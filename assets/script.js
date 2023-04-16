// Open Weather Map's API key
var APIKey = "4be13387fd02fce39ad986e3b6696f11";

// Fetch info from openweather
var queryURLcurrent =
  "http://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&units=imperial" +
  "&appid=" +
  APIKey;
fetch(queryURLcurrent);
console.log(queryURLcurrent);

$(function () {
  showSearchedCities();
  // search button is clicked function is called
  $("#search").click(function (e) {
    e.preventDefault();
    showMainPage();
    removeAppend();
    // Variable to hold name of city on search box
    var city = $("#citySearch").val();
    // If the city is not blank,
    if (city) {
      showCurrentWeather(city);
    }
    // If the city name is blank,
    else {
      showSearchedCities();
      $("#mainPage").hide();
      // jquery-confirm alert
      $.alert({
        title: "City cannot be blank",
        content: "Please try again",
      });
    }
  });
  // Function is called when any of the created lis for the searched cities is clicked
  $(document).on("click", "li", function (e) {
    e.preventDefault;
    showMainPage();
    removeAppend();
    // Variable to hold name of city in the li that is clicked
    var city = $(this).text();
    // Function showCurrentWeather is called using the city name on li as a parameter
    showCurrentWeather(city);
  });
});

// Shows searched cities on initial page if there are any
function showSearchedCities() {
  var searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];
  // Adds citie's names on page (new ones go on top)
  for (let i = 0; i < searchedCities.length; i++) {
    $("#citiesList").prepend("<li>" + searchedCities[i] + "</li>");
  }
}

//  adding text and appending city's name with current day, icon that represents the weather, temperature,
$("#currentInfo").append(
  "<h2>" + data.name + " " + dayjs.unix(data.dt).format("MM/DD/YY") + "</h2>"
);
$("#currentInfo").append("<img src='" + iconURL + "'></img>");
$("#currentInfo").append(
  "<p>" + "Temperature: " + data.main.temp + "°F" + "</p>"
);
$("#currentInfo").append("<p>" + "Wind: " + data.wind.speed + " MPH" + "</p>");
$("#currentInfo").append(
  "<p>" + "Humidity: " + data.main.humidity + " %" + "</p>"
);
// ShowForecastWeather function is only called after showCurrentWeather because it needs coordinates fetched from queryURLcurrent
showForecastWeather();
