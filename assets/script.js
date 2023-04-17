// Open Weather Map's API key
var APIKey = "4be13387fd02fce39ad986e3b6696f11";

$(function () {
  showSearchedCities();
  // Function is called when search button is clicked
  $("#search").click(function (e) {
    e.preventDefault();
    showMainPage();
    removeAppend();
    // Variable to hold name of city on search box
    var city = $("#citySearch").val();
    // When blank it shows the current weather
    if (city) {
      showCurrentWeather(city);
    }
    // When blank search it gets an error
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
  // Function is called  created a list for the searched cities
  $(document).on("click", "li", function (e) {
    e.preventDefault;
    showMainPage();
    removeAppend();
    var city = $(this).text();
    showCurrentWeather(city);
  });
});

// Function to show the current weather
function showCurrentWeather(city) {
  // hold the API link - link changes according to city name
  var queryURLcurrent =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial" +
    "&appid=" +
    APIKey;
  fetch(queryURLcurrent);
  console
    .log(queryURLcurrent)
    // Fetch URL's response
    .then(function (response) {
      // error log
      if (response.status !== 200) {
        $("#mainPage").hide();
        showSearchedCities();
        $.alert({
          title: "City not recognized",
          content: "Please try again",
        });
      }
      // If status code is 200 (OK), returns response in JSON format
      return response.json();
    })
    // Using JSON response to fetch data
    .then(function (data) {
      // Variable to get all searched cities if any from local storage
      var searchedCities =
        JSON.parse(localStorage.getItem("searchedCities")) || [];
      // Only adds name of searched city to variable if the name is not yet saved - this avoids duplicates
      if (!searchedCities.includes(data.name)) {
        searchedCities.push(data.name);
      }
      // Variable to hold coordinates of searched cities
      var coord = {
        lat: data.coord.lat,
        lon: data.coord.lon,
      };
      // Saving searcher cities and coordinates in local storage
      localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
      showSearchedCities();
      localStorage.setItem("coordinates", JSON.stringify(coord));
      // Variable to hold the code for the weather icon
      var icon = data.weather[0].icon;
      // Variable to hold link to access png of weather icon
      var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      // adding text and appending city's name with current day, icon that represents the weather, temperature,
      $("#currentInfo").append(
        "<h2>" +
          data.name +
          " " +
          dayjs.unix(data.dt).format("MM/DD/YY") +
          "</h2>"
      );
      $("#currentInfo").append("<img src='" + iconURL + "'></img>");
      $("#currentInfo").append(
        "<p>" + "Temperature: " + data.main.temp + "°F" + "</p>"
      );
      $("#currentInfo").append(
        "<p>" + "Wind: " + data.wind.speed + " MPH" + "</p>"
      );
      $("#currentInfo").append(
        "<p>" + "Humidity: " + data.main.humidity + " %" + "</p>"
      );
      showForecastWeather();
    });
}

// Function to show forecast weather
function showForecastWeather() {
  // Variable to get coordinates of searched city from local storage
  var coord = JSON.parse(localStorage.getItem("coordinates"));
  // Variable to hold the API link
  var oneCallURL =
    "https://api.openweathermap.org/data/3.0/onecall?lat=" +
    coord.lat +
    "&lon=" +
    coord.lon +
    "&exclude=current,minutely,hourly,alerts&units=imperial" +
    "&appid=" +
    APIKey;
  // Fetch URL's response
  fetch(oneCallURL)
    // Returns response in JSON format to extract data
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Loop to do appendForecastInfo for data objects from index 1 to 5 (representing five future days)
      for (let i = 1; i <= 5; i++) {
        appendForecastInfo(i, i);
      }
      // add text and append future days, icon that represents the weather, temperature,
      function appendForecastInfo(id, index) {
        var icon = data.daily[index].weather[0].icon;
        var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        $("#day-" + id).append(
          "<h3>" + dayjs.unix(data.daily[index].dt).format("MM/DD/YY") + "</h3>"
        );
        $("#day-" + id).append("<img src='" + iconURL + "'></img>");
        $("#day-" + id).append(
          "<p>" + "Temp: " + data.daily[index].temp.day + "°F" + "</p>"
        );
        $("#day-" + id).append(
          "<p>" + "Wind: " + data.daily[index].wind_speed + " MPH" + "</p>"
        );
        $("#day-" + id).append(
          "<p>" + "Humidity: " + data.daily[index].humidity + " %" + "</p>"
        );
      }
    });
}

// Shows searched cities on initial page if there are any
function showSearchedCities() {
  var searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];
  // Adds citie's names on page (new ones go on top)
  for (let i = 0; i < searchedCities.length; i++) {
    $("#citiesList").prepend("<li>" + searchedCities[i] + "</li>");
  }
}

// emove JS created elements
function removeAppend() {
  $("#currentInfo").empty();
  for (let id = 1; id <= 5; id++) {
    $("#day-" + id).empty();
  }
  $("#citiesList").empty();
}

// Shows main page with searched city
function showMainPage() {
  $("#mainPage").show();
}
