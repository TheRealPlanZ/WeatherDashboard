$(document).ready(function () {
  var apiKey = "60387482dc88d417518e4cbaed47f09e";
  var cityInputEl = $("#city");
  var searchBtnEl = $(".btn-primary");
  var listGroupEl = $(".list-group");
  var weeklyForecastEl = $("#weeklyForecast");

  // Helper function to create a list group item with a button
  function createListGroupItem(city) {
    var listItemEl = $("<button>")
      .attr("type", "button")
      .addClass("list-group-item list-group-item-action")
      .text(city);
    return listItemEl;
  }

  // Helper function to fetch current weather data for a given city
  function getCurrentWeatherData(city) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      apiKey +
      "&units=metric";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      // Get relevant weather data
      var cityName = response.name;
      var temperature = response.main.temp;
      var humidity = response.main.humidity;
      var windSpeed = response.wind.speed;
      var iconCode = response.weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

      // Update the HTML with the weather data
      $(".card-body").empty();
      $(".card-body").append($("<h2>").text(cityName));
      $(".card-body").append(
        $("<p>").text("Temperature: " + temperature + " °C")
      );
      $(".card-body").append($("<p>").text("Humidity: " + humidity + "%"));
      $(".card-body").append($("<p>").text("Wind Speed: " + windSpeed + " m/s"));
      $(".card-body").append($("<img>").attr("src", iconUrl));
      getWeeklyWeatherData(city); // call function to fetch weekly weather data
    });
  }

  // Helper function to fetch weekly weather data for a given city
  function getWeeklyWeatherData(city) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      apiKey +
      "&units=metric";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      // Group weather data by date
      var weatherDataByDate = {};
      response.list.forEach(function (forecast) {
        var date = moment(forecast.dt_txt).format("dddd, MMM Do");
        if (!weatherDataByDate[date]) {
          weatherDataByDate[date] = [];
        }
        weatherDataByDate[date].push(forecast);
      });

      // Generate HTML for each date's forecast
      weeklyForecastEl.empty();
      for (var date in weatherDataByDate) {
        var dailyWeatherData = weatherDataByDate[date];

        // Get relevant weather data for the first forecast in the day
        var temperature = dailyWeatherData[0].main.temp;
        var humidity = dailyWeatherData[0].main.humidity;
        var iconCode = dailyWeatherData[0].weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

        // Generate HTML for the forecast card
        var forecastCardEl = $("<div>").addClass("card col-md-2 mx-2");
        var cardBodyEl = $("<div>").addClass("card-body p-2");
      }
    });
  }

  // Helper function to fetch weekly weather data for a given city
  function getWeeklyWeatherData(city) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      apiKey +
      "&units=metric";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      // Group weather data by date
      var weatherDataByDate = {};
      response.list.forEach(function (forecast) {
        var date = moment(forecast.dt_txt).format("dddd, MMM Do");
        if (!weatherDataByDate[date]) {
          weatherDataByDate[date] = [];
        }
        weatherDataByDate[date].push(forecast);
      });

      // Generate HTML for each date's forecast
      weeklyForecastEl.empty();
      for (var date in weatherDataByDate) {
        var dailyWeatherData = weatherDataByDate[date];

        // Get relevant weather data for the first forecast in the day
        var temperature = dailyWeatherData[0].main.temp;
        var humidity = dailyWeatherData[0].main.humidity;
        var iconCode = dailyWeatherData[0].weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

        // Generate HTML for the forecast card
        var forecastCardEl = $("<div>").addClass("card col-md-2 mx-2");
        var cardBodyEl = $("<div>").addClass("card-body p-2");
        var dateEl = $("<h5>").addClass("card-title").text(date);
        var tempEl = $("<p>").addClass("card-text").text("Temp: " + temperature + " °C");
        var humidityEl = $("<p>").addClass("card-text").text("Humidity: " + humidity + "%");
        var iconEl = $("<img>").attr("src", iconUrl);

        cardBodyEl.append(dateEl, tempEl, humidityEl, iconEl);
        forecastCardEl.append(cardBodyEl);
        weeklyForecastEl.append(forecastCardEl);
      }
    });
  }

  // Event listener for the search button
  searchBtnEl.on("click", function (event) {
    event.preventDefault();
    var city = cityInputEl.val().trim();
    if (city !== "") {
      // Create a new list group item for the city and add it to the list
      var listItemEl = createListGroupItem(city);
      listGroupEl.append(listItemEl);

      // Set the input field to an empty string
      cityInputEl.val("");

      // Fetch the current weather data for the city
      getCurrentWeatherData(city);
    }
  });

  // Event listener for list group items
  listGroupEl.on("click", ".list-group-item", function () {
    var city = $(this).text();
    getCurrentWeatherData(city);
  });
});