
var app = function(){

  var mainMap = new MapWrapper();

  var container = document.getElementById('main-map');
  container.style.height = document.body.scrollHeight +"px";

  var displayWeatherByCity = function(city){
    var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + ",uk&cnt=7&appid=8d45e814885786cd7adbc48c1754c9cb"
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', function(){
      var weatherData = JSON.parse(request.responseText);
      updateTable(weatherData);

      var latlng = new google.maps.LatLng(weatherData.city.coord.lat, weatherData.city.coord.lon - 0.09);
      mainMap.googleMap.panTo(latlng)
    })
    request.send();
  };

// onload = use local data to store last
  displayWeatherByCity("London");

  var updateTable = function(weatherData){
    var table = document.getElementById("weather-data");
    table.innerHTML = "";
    createHeaderRow(weatherData.city.name);
    createWeatherRows(weatherData.list);
  }

  var createHeaderRow = function(cityName){
    var table = document.getElementById("weather-data");
    var tableRow = document.createElement("tr");
    var tableHeader = document.createElement("th");
    // tableRow.appendChild(tableHeader);
    // tableRow.appendChild(tableHeader);
    tableHeader.innerText = cityName;
    tableHeader.colSpan = "3";
    tableRow.appendChild(tableHeader);
    var blankCell1 = document.createElement("th");
    var blankCell2 = document.createElement("th");
    tableRow.appendChild(blankCell1);
    tableRow.appendChild(blankCell2);
    table.appendChild(tableRow);
  }

  var createWeatherRows = function(weatherArray){
    var dayStrings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    var table = document.getElementById("weather-data");
    for ( i = 0; i < weatherArray.length; i++ ){
      var row = document.createElement("tr");
      var dateCell = document.createElement("td");
      var day = timeStampToDay(weatherArray[i].dt);
      dateCell.innerText = dayStrings[day];
      row.appendChild(dateCell);
      var iconCell = document.createElement("td");
      //tb created
      row.appendChild(iconCell);
      var weatherCell = document.createElement("td");
      weatherCell.innerText = kToC(weatherArray[i].temp.min) + "/" + kToC(weatherArray[i].temp.max);
      row.appendChild(weatherCell);
      table.appendChild(row);
    }
  }

  var timeStampToDay = function(timestamp){
    var date = new Date(timestamp * 1000);
    var day = date.getDay();
    return day;
  }

  var kToC = function(kelvins) {
    return Math.round( kelvins - 273.15 )
  }

  // set to grab default city from local storage
  // var city = "London"
  // getWeatherByCity(city)

  var button = document.getElementById("city-button")
  button.addEventListener('click', function(){
    var userInput = document.getElementById("city-input")
    city = userInput.value;

    console.log(mainMap.googleMap)
    // this.googleMap.setStyle({invert_lightness: true});
    displayWeatherByCity(city)
  });


}

window.addEventListener('load', app);
