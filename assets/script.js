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
