// Open Weather Map's API key
var APIKey = "4be13387fd02fce39ad986e3b6696f11";
// I set the default city to Saint Paul when the page is loaded,
var city = "Saint Paul";
// this variable will hold the converted temp from the weather api data
var fahrenheit;
// fonts from font awesome
var iconWeather;
var iconAdd;
var fahForecast;
var searchFormEl = document.querySelector("#search-input");
var cityInputEl = document.querySelector("#city-input");
var searchCity;
var newCity;
var citiesArr = [];
var citiesListEl = document.querySelector(".cities");
var buttonCity;

var today = dayjs();
// I used jquery here, since that is what we used with dayjs in class
$("#today-date").text("(" + today.format("MMM D, YYYY") + ")");

// I had to do this way to break it down for me to understand how things are working.

var d0 = new Date(today);
d0.setDate(d0.getDate() + 1);
var dateFormat0 = new Date(d0);
var day0 = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
}).format(dateFormat0);

var d1 = new Date(today);
d1.setDate(d1.getDate() + 2);
var dateFormat1 = new Date(d1);
var day1 = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
}).format(dateFormat1);

var d2 = new Date(today);
d2.setDate(d2.getDate() + 3);
var dateFormat2 = new Date(d2);
var day2 = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
}).format(dateFormat2);

var d3 = new Date(today);
d3.setDate(d3.getDate() + 4);
var dateFormat3 = new Date(d3);
var day3 = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
}).format(dateFormat3);

var d4 = new Date(today);
d4.setDate(d4.getDate() + 5);
var dateFormat4 = new Date(d4);
var day4 = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
}).format(dateFormat4);

var nextDayArr = [day0, day1, day2, day3, day4];

for (i = 0; i < nextDayArr.length; i++) {
  document.getElementById("day" + [i] + "D").innerHTML = nextDayArr[i];
}

setWeather();

function setWeather() {
  // This first url fetches the current weather and puts it in the header
  var defaultQueryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;

  fetch(defaultQueryURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        // console log
        console.log(data);

        fahrenheit = Math.round(
          (parseFloat(data.main.temp) - 273.15) * 1.8 + 32
        );
        document.getElementById("city-select").innerHTML = data.name;
        document.getElementById("temp-select").innerHTML =
          "Temp: " + fahrenheit + "\u00B0" + " F";
        document.getElementById("wind-select").innerHTML =
          "Wind: " + data.wind.speed + " mph";
        document.getElementById("humid-select").innerHTML =
          "Humidity: " + data.main.humidity + "%";

        addIcon();

        //use font awesome
        function addIcon() {
          iconWeather = data.weather[0].main;

          iconAdd = document.getElementById("curr-icon");

          if (iconWeather == "Clouds") {
            console.log("The weather is Clouds.");
            iconAdd.classList = "fa-solid fa-cloud";
          } else if (iconWeather == "Clear") {
            console.log("The weather is Clear.");
            iconAdd.classList = "fa-solid fa-sun";
          } else if (iconWeather == "Snow") {
            console.log("The weather is Snow.");
            iconAdd.classList = "fa-solid fa-snowflake";
          } else if (iconWeather == "Rain" || iconWeather == "Drizzle") {
            console.log("The weather is Rain or Drizzle.");
            iconAdd.classList = "fa-solid fa-cloud-showers-heavy";
          } else if (iconWeather == "Thunderstorm") {
            console.log("The weather is Thunderstorm.");
            iconAdd.classList = "fa-solid fa-cloud-bolt";
          } else if (iconWeather == "Tornado") {
            console.log("The weather is Tornado.");
            iconAdd.classList = "fa-solid fa-tornado";
          } else {
            console.log("the weather is some sort of fog or smoke or haze");
            iconAdd.classList = "fa-solid fa-smog";
          }
        }
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });

  // this is a different url from Open Weather that is just a five day forecast
  // I was able to figure out loops to get all the weather info in the day blocks
  var defaultForecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIKey;

  fetch(defaultForecastURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        // The forecast data included eight hours for each day. I chose the eighth hour, since it had the highest temp of the day
        var dayOne = data.list[7];
        var dayTwo = data.list[15];
        var dayThree = data.list[23];
        var dayFour = data.list[31];
        var dayFive = data.list[39];
        var dayArray = [dayOne, dayTwo, dayThree, dayFour, dayFive];

        for (i = 0; i < dayArray.length; i++) {
          fahForecast = Math.round(
            (parseFloat(dayArray[i].main.temp) - 273.15) * 1.8 + 32
          );
          document.getElementById("day" + [i] + "T").innerHTML =
            "Temp: " + fahForecast + "\u00B0" + " F";
        }

        for (i = 0; i < dayArray.length; i++) {
          document.getElementById("day" + [i] + "W").innerHTML =
            "Wind: " + dayArray[i].wind.speed + " mph";
        }

        for (i = 0; i < dayArray.length; i++) {
          document.getElementById("day" + [i] + "H").innerHTML =
            "Humidity: " + dayArray[i].main.humidity + "%";
        }

        for (i = 0; i < dayArray.length; i++) {
          if (dayArray[i].weather[0].main == "Clouds") {
            console.log("The weather is Clouds.");
            document.getElementById("day" + [i] + "I").classList =
              "fa-solid fa-cloud";
          } else if (dayArray[i].weather[0].main == "Clear") {
            console.log("The weather is Clear.");
            document.getElementById("day" + [i] + "I").classList =
              "fa-solid fa-sun";
          } else if (dayArray[i].weather[0].main == "Snow") {
            console.log("The weather is Snow.");
            document.getElementById("day" + [i] + "I").classList =
              "fa-solid fa-snowflake";
          } else if (
            dayArray[i].weather[0].main == "Rain" ||
            dayArray[i].weather[0].main == "Drizzle"
          ) {
            console.log("The weather is Rain or Drizzle.");
            document.getElementById("day" + [i] + "I").classList =
              "fa-solid fa-cloud-showers-heavy";
          } else if (dayArray[i].weather[0].main == "Thunderstorm") {
            console.log("The weather is Thunderstorm.");
            document.getElementById("day" + [i] + "I").classList =
              "fa-solid fa-cloud-bolt";
          } else if (dayArray[i].weather[0].main == "Tornado") {
            console.log("The weather is Tornado.");
            document.getElementById("day" + [i] + "I").classList =
              "fa-solid fa-tornado";
          } else {
            console.log("the weather is some sort of fog or smoke or haze");
            document.getElementById("day" + [i] + "I").classList =
              "fa-solid fa-smog";
          }
        }
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
}

//  event listener for the search button
searchFormEl.addEventListener("submit", formSubmitCity);

function formSubmitCity(event) {
  event.preventDefault();

  searchCity = cityInputEl.value.trim();
  console.log(searchCity);

  // this saves the search input into local storage
  if (searchCity) {
    cityInputEl.value = "";
    localStorage.setItem("savedCity", searchCity);
    newCity = localStorage.getItem("savedCity");

    citiesArr.push(newCity);

    localStorage.setItem("allCities", JSON.stringify(citiesArr));
    var newCityArr = JSON.parse(localStorage.getItem("allCities"));

    var cityButton = document.createElement("button");
    var cityBtnText = document.createTextNode(newCity);
    cityButton.setAttribute("class", "new-city-button");

    for (i = 0; i < newCityArr.length; i++) {
      cityButton.setAttribute("id", newCityArr[i]);
    }

    cityButton.appendChild(cityBtnText);
    citiesListEl.appendChild(cityButton);

    var newCityButtonEl = $(".new-city-button");
    newCityButtonEl.on("click", renderButtonWeather);

    // the cities in the search history needed to be buttons that could render their weather again when clicked;
    function renderButtonWeather() {
      buttonCity = $(this).attr("id");
      console.log(buttonCity);
      console.log(typeof buttonCity);

      city = buttonCity;
      setWeather();
    }
  }

  // this takes the initial search input and sets the weather for that city
  city = searchCity;
  setWeather();
}
