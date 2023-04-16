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

// Variable to hold name of city on search box
var city = $("#citySearch").val();
// If the city is not blank, function showCurrentWeather is called using the city name as a parameter
if (city) {
  showCurrentWeather(city);
}

// Shows searched cities on initial page if there are any
function showSearchedCities() {
  var searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];
  // Adds citie's names on page (new ones go on top)
  for (let i = 0; i < searchedCities.length; i++) {
    $("#citiesList").prepend("<li>" + searchedCities[i] + "</li>");
  }
}
